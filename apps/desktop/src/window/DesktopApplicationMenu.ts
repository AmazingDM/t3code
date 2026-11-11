import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Schema from "effect/Schema";

import * as Electron from "electron";

import { makeComponentLogger } from "../app/DesktopObservability.ts";
import * as ElectronApp from "../electron/ElectronApp.ts";
import * as ElectronDialog from "../electron/ElectronDialog.ts";
import * as ElectronMenu from "../electron/ElectronMenu.ts";
import * as DesktopEnvironment from "../app/DesktopEnvironment.ts";
import * as DesktopUpdates from "../updates/DesktopUpdates.ts";
import { setDesktopIsZh } from "./desktopLocaleState.ts";
import * as DesktopWindow from "./DesktopWindow.ts";

export class DesktopApplicationMenuActionError extends Schema.TaggedError<DesktopApplicationMenuActionError>()(
  "DesktopApplicationMenuActionError",
  {
    action: Schema.String,
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return `Desktop menu action "${this.action}" failed.`;
  }
}

export class DesktopApplicationMenu extends Context.Service<
  DesktopApplicationMenu,
  {
    readonly configure: Effect.Effect<void>;
  }
>()("@t3tools/desktop/window/DesktopApplicationMenu") {}

type DesktopApplicationMenuRuntimeServices =
  | DesktopUpdates.DesktopUpdates
  | DesktopWindow.DesktopWindow
  | ElectronDialog.ElectronDialog;

const { logInfo: logUpdaterInfo } = makeComponentLogger("desktop-updater");

const { logError: logMenuError } = makeComponentLogger("desktop-menu");

const dispatchMenuAction = Effect.fn("desktop.menu.dispatchMenuAction")(function* (
  action: string,
): Effect.fn.Return<void, DesktopWindow.DesktopWindowError, DesktopWindow.DesktopWindow> {
  const desktopWindow = yield* DesktopWindow.DesktopWindow;
  yield* desktopWindow.dispatchMenuAction(action, {
    reveal: action !== "paste-as-text",
  });
});

const zoomMainWindow = Effect.fn("desktop.menu.zoomMainWindow")(function* (
  direction: DesktopWindow.MainWindowZoomDirection,
): Effect.fn.Return<void, never, DesktopWindow.DesktopWindow> {
  const desktopWindow = yield* DesktopWindow.DesktopWindow;
  yield* desktopWindow.zoomMain(direction);
});

const runMainContentsCommand = Effect.fn("desktop.menu.runMainContentsCommand")(function* (
  command: DesktopWindow.MainWindowContentsCommand,
): Effect.fn.Return<void, never, DesktopWindow.DesktopWindow> {
  const desktopWindow = yield* DesktopWindow.DesktopWindow;
  yield* desktopWindow.runMainContentsCommand(command);
});

const checkForUpdatesFromMenu = Effect.fn("desktop.menu.checkForUpdates")(function* (
  isZh: boolean,
) {
  const updates = yield* DesktopUpdates.DesktopUpdates;
  const electronDialog = yield* ElectronDialog.ElectronDialog;
  const result = yield* updates.check("menu");
  const updateState = result.state;

  if (updateState.status === "up-to-date") {
    yield* electronDialog.showMessageBox({
      type: "info",
      title: isZh ? "当前已是最新版本" : "You're up to date!",
      message: isZh
        ? `T3 Code ${updateState.currentVersion} 已是当前可用的最新版本。`
        : `T3 Code ${updateState.currentVersion} is currently the newest version available.`,
      buttons: [isZh ? "确定" : "OK"],
    });
  } else if (updateState.status === "error") {
    yield* electronDialog.showMessageBox({
      type: "warning",
      title: isZh ? "检查更新失败" : "Update check failed",
      message: isZh ? "无法检查更新。" : "Could not check for updates.",
      detail:
        updateState.message ??
        (isZh
          ? "发生未知错误，请稍后重试。"
          : "An unknown error occurred. Please try again later."),
      buttons: [isZh ? "确定" : "OK"],
    });
  }
});

const handleCheckForUpdatesMenuClick = Effect.fn("desktop.menu.handleCheckForUpdatesClick")(
  function* (isZh: boolean) {
    const updates = yield* DesktopUpdates.DesktopUpdates;
    const electronDialog = yield* ElectronDialog.ElectronDialog;
    const disabledReason = yield* updates.disabledReason;
    if (Option.isSome(disabledReason)) {
      yield* logUpdaterInfo("manual update check requested, but updates are disabled", {
        disabledReason: disabledReason.value,
      });
      yield* electronDialog.showMessageBox({
        type: "info",
        title: isZh ? "更新不可用" : "Updates unavailable",
        message: isZh ? "当前无法使用自动更新。" : "Automatic updates are not available right now.",
        detail: disabledReason.value,
        buttons: [isZh ? "确定" : "OK"],
      });
      return;
    }

    // Opening a window before backend confirmation can strand it on failed auth bootstrap.
    const desktopWindow = yield* DesktopWindow.DesktopWindow;
    yield* desktopWindow.activate;
    yield* checkForUpdatesFromMenu(isZh);
  },
);

/** @public */
export const make = Effect.gen(function* () {
  const electronApp = yield* ElectronApp.ElectronApp;
  const electronMenu = yield* ElectronMenu.ElectronMenu;
  const environment = yield* DesktopEnvironment.DesktopEnvironment;
  const context = yield* Effect.context<DesktopApplicationMenuRuntimeServices>();
  const runPromise = Effect.runPromiseWith(context);

  const runMenuEffect = <E>(
    action: string,
    effect: Effect.Effect<void, E, DesktopApplicationMenuRuntimeServices>,
  ) => {
    void runPromise(
      effect.pipe(
        Effect.annotateLogs({ action }),
        Effect.withSpan("desktop.menu.action"),
        Effect.catchCause((cause) => {
          const error = new DesktopApplicationMenuActionError({ action, cause });
          return logMenuError(error.message, { error });
        }),
      ),
    );
  };

  let systemIsZh = false;
  let currentIsZh = false;

  const buildTemplate = (isZh: boolean): Electron.MenuItemConstructorOptions[] => {
    const t = (zh: string, en: string) => (isZh ? zh : en);
    const checkForUpdatesClick = () => {
      runMenuEffect("check-for-updates", handleCheckForUpdatesMenuClick(currentIsZh));
    };
    const settingsClick = () => {
      runMenuEffect("open-settings", dispatchMenuAction("open-settings"));
    };
    // Chromium and the renderer already handle this chord; injecting another paste duplicates text.
    const pasteAsTextClick = (
      _item: Electron.MenuItem,
      _window: Electron.BaseWindow | undefined,
      event: Electron.KeyboardEvent,
    ) => {
      if (event.triggeredByAccelerator === true) return;
      runMenuEffect("paste-as-text", dispatchMenuAction("paste-as-text"));
    };
    const zoomClick = (direction: DesktopWindow.MainWindowZoomDirection) => () => {
      runMenuEffect(`zoom-${direction}`, zoomMainWindow(direction));
    };
    const mainContentsClick = (command: DesktopWindow.MainWindowContentsCommand) => () => {
      runMenuEffect(command, runMainContentsCommand(command));
    };
    const template: Electron.MenuItemConstructorOptions[] = [];

    if (environment.platform === "darwin") {
      template.push({
        label: environment.displayName,
        submenu: [
          {
            role: "about",
            label: t(`关于 ${environment.displayName}`, `About ${environment.displayName}`),
          },
          {
            label: t("检查更新...", "Check for Updates..."),
            click: checkForUpdatesClick,
          },
          { type: "separator" },
          {
            label: t("设置...", "Settings..."),
            accelerator: "CmdOrCtrl+,",
            click: settingsClick,
          },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          {
            role: "hide",
            label: t(`隐藏 ${environment.displayName}`, `Hide ${environment.displayName}`),
          },
          { role: "hideOthers" },
          { role: "unhide" },
          { type: "separator" },
          {
            role: "quit",
            label: t(`退出 ${environment.displayName}`, `Quit ${environment.displayName}`),
          },
        ],
      });
    }

    template.push(
      {
        label: t("文件", "File"),
        submenu: [
          ...(environment.platform === "darwin"
            ? []
            : [
                {
                  label: t("设置...", "Settings..."),
                  accelerator: "CmdOrCtrl+,",
                  click: settingsClick,
                },
                { type: "separator" as const },
              ]),
          {
            label: t("关闭开发者工具", "Close Developer Tools"),
            accelerator: "CmdOrCtrl+W",
            visible: false,
            click: () => {
              Electron.webContents
                .getAllWebContents()
                .find((contents) => !contents.isDestroyed() && contents.isDevToolsFocused())
                ?.closeDevTools();
            },
          },
          // Cmd/Ctrl+W belongs to the renderer's tab close; it must never close the window.
          environment.platform === "darwin"
            ? {
                label: t("关闭窗口", "Close Window"),
                click: (_item, window) => window?.close(),
              }
            : { role: "quit", ...(isZh ? { label: "退出" } : {}) },
        ],
      },
      {
        label: t("编辑", "Edit"),
        submenu: [
          { role: "undo", ...(isZh ? { label: "撤销" } : {}) },
          { role: "redo", ...(isZh ? { label: "重做" } : {}) },
          { type: "separator" },
          { role: "cut", ...(isZh ? { label: "剪切" } : {}) },
          { role: "copy", ...(isZh ? { label: "复制" } : {}) },
          { role: "paste", ...(isZh ? { label: "粘贴" } : {}) },
          {
            label: t("粘贴为纯文本", "Paste as Text"),
            accelerator: "CmdOrCtrl+Shift+V",
            click: pasteAsTextClick,
          },
          { role: "delete", ...(isZh ? { label: "删除" } : {}) },
          { type: "separator" },
          { role: "selectAll", ...(isZh ? { label: "全选" } : {}) },
          ...(environment.platform === "darwin"
            ? [
                { type: "separator" as const },
                {
                  label: t("语音", "Speech"),
                  submenu: [{ role: "startSpeaking" as const }, { role: "stopSpeaking" as const }],
                },
              ]
            : []),
        ],
      },
      {
        label: t("视图", "View"),
        submenu: [
          /* Native reload/DevTools/zoom roles target focused guests; these commands must target the app. */
          {
            label: t("重新加载", "Reload"),
            accelerator: "CmdOrCtrl+R",
            click: mainContentsClick("reload"),
          },
          {
            label: t("强制重新加载", "Force Reload"),
            accelerator: "Shift+CmdOrCtrl+R",
            click: mainContentsClick("forceReload"),
          },
          {
            label: t("切换开发者工具", "Toggle Developer Tools"),
            accelerator: environment.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: mainContentsClick("toggleDevTools"),
          },
          { type: "separator" },
          {
            label: t("实际大小", "Actual Size"),
            accelerator: "CmdOrCtrl+0",
            click: zoomClick("reset"),
          },
          {
            label: t("放大", "Zoom In"),
            accelerator: "CmdOrCtrl+=",
            click: zoomClick("in"),
          },
          {
            label: t("放大", "Zoom In"),
            accelerator: "CmdOrCtrl+Plus",
            visible: false,
            click: zoomClick("in"),
          },
          ...(environment.platform === "darwin"
            ? [
                {
                  label: t("放大", "Zoom In"),
                  accelerator: "CmdOrCtrl+Shift+=",
                  visible: false,
                  click: zoomClick("in"),
                },
              ]
            : []),
          {
            label: t("缩小", "Zoom Out"),
            accelerator: "CmdOrCtrl+-",
            click: zoomClick("out"),
          },
          // Keypad codes do not match number-row accelerators.
          {
            label: t("实际大小", "Actual Size"),
            accelerator: "CmdOrCtrl+num0",
            visible: false,
            click: zoomClick("reset"),
          },
          {
            label: t("放大", "Zoom In"),
            accelerator: "CmdOrCtrl+numadd",
            visible: false,
            click: zoomClick("in"),
          },
          {
            label: t("缩小", "Zoom Out"),
            accelerator: "CmdOrCtrl+numsub",
            visible: false,
            click: zoomClick("out"),
          },
          { type: "separator" },
          { role: "togglefullscreen", ...(isZh ? { label: "切换全屏" } : {}) },
        ],
      },
      {
        // Electron's default Window submenu adds a Ctrl+W close role off macOS.
        role: "windowMenu",
        ...(isZh ? { label: "窗口" } : {}),
        submenu: [
          { role: "minimize", ...(isZh ? { label: "最小化" } : {}) },
          { role: "zoom", ...(isZh ? { label: "缩放" } : {}) },
          ...(environment.platform === "darwin"
            ? [{ type: "separator" as const }, { role: "front" as const }]
            : []),
        ],
      },
      {
        role: "help",
        ...(isZh ? { label: "帮助" } : {}),
        submenu: [
          {
            label: t("检查更新...", "Check for Updates..."),
            click: checkForUpdatesClick,
          },
        ],
      },
    );

    return template;
  };

  // Only sync locale from the main T3 Code renderer (preload exposes desktopBridge);
  // ignore splash data: pages and external OAuth popups.
  const READ_RENDERER_LOCALE_SCRIPT =
    '(() => { try { return typeof window.desktopBridge === "object" && window.desktopBridge !== null ? (window.localStorage.getItem("t3code:locale") ?? "system") : null; } catch { return null; } })()';

  yield* electronApp.on(
    "browser-window-created",
    (_event: unknown, window: Electron.BrowserWindow) => {
      window.webContents.on("did-finish-load", () => {
        if (window.isDestroyed() || window.webContents.isDestroyed()) return;
        void window.webContents
          .executeJavaScript(READ_RENDERER_LOCALE_SCRIPT)
          .then((pref: unknown) => {
            if (pref !== "zh-Hans" && pref !== "en" && pref !== "system") return;
            const nextIsZh = pref === "zh-Hans" ? true : pref === "en" ? false : systemIsZh;
            if (nextIsZh === currentIsZh) return;
            currentIsZh = nextIsZh;
            setDesktopIsZh(currentIsZh);
            runMenuEffect(
              "sync-menu-locale",
              electronMenu.setApplicationMenu(buildTemplate(currentIsZh)),
            );
          })
          .catch(() => {});
      });
    },
  );

  const configure = Effect.gen(function* () {
    const preferredLanguages = yield* electronApp.preferredSystemLanguages;
    const systemLocale = yield* electronApp.systemLocale;
    systemIsZh = [...preferredLanguages, systemLocale].some(
      (lang) => typeof lang === "string" && lang.toLowerCase().startsWith("zh"),
    );
    currentIsZh = systemIsZh;
    setDesktopIsZh(currentIsZh);

    yield* electronMenu.setApplicationMenu(buildTemplate(currentIsZh));
  }).pipe(Effect.withSpan("desktop.menu.configure"));

  return DesktopApplicationMenu.of({
    configure,
  });
});

export const layer = Layer.effect(DesktopApplicationMenu, make);
