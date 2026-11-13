import { describe, expect, it } from "vite-plus/test";

import {
  analyzeModule,
  cleanJSXText,
  isValidTranslation,
  shouldProcessModuleId,
} from "./transform.mjs";

const WEB_SRC = "D:/WorkSpace/Tools/t3code/apps/web/src";
const LOCALE_MOD = "D:/WorkSpace/Tools/t3code/apps/web/src/i18n/locale";

describe("i18n/transform", () => {
  it("cleans JSXText whitespace and HTML entities while preserving inline spacing", () => {
    expect(cleanJSXText("\n    Save\n    changes &amp; exit\n  ")).toBe("Save changes & exit");
    expect(cleanJSXText("Click ")).toBe("Click ");
    expect(cleanJSXText(" items")).toBe(" items");
  });

  it("wraps JSXText, bare JSXAttribute strings, and expression containers accurately", () => {
    const code = `export function Demo({ count }: { count: number }) {
  return (
    <div title="Save changes" aria-label={"Close panel"} data-slot="panel">
      Click {count} items
    </div>
  );
}
`;
    const dict = {
      "Save changes": "保存更改",
      "Close panel": "关闭面板",
      Click: "点击",
      items: "项",
    };
    const { transformed } = analyzeModule(code, `${WEB_SRC}/components/Demo.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain('import { __IS_ZH__ } from "../i18n/locale";');
    expect(transformed.code).toContain('title={__IS_ZH__ ? "保存更改" : "Save changes"}');
    expect(transformed.code).toContain('aria-label={(__IS_ZH__ ? "关闭面板" : "Close panel")}');
    expect(transformed.code).toContain('data-slot="panel"');
    expect(transformed.code).toContain(
      '{__IS_ZH__ ? "点击 " : "Click "}{count}{__IS_ZH__ ? " 项" : " items"}',
    );
    expect(transformed.map.version).toBe(3);
    expect(transformed.map.mappings.length).toBeGreaterThan(0);
  });

  it("handles TemplateLiteral placeholders in order and reordered", () => {
    const code = `export function Pager({ page, total }: { page: number; total: number }) {
  return <span aria-label={\`Reset \${page} to default\`}>{\`Page \${page} of \${total}\`}</span>;
}
`;
    const dict = {
      "Reset {0} to default": "将 {0} 重置为默认值",
      "Page {0} of {1}": "共 {1} 页，第 {0} 页",
    };
    const { transformed } = analyzeModule(code, `${WEB_SRC}/Pager.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain(
      "(__IS_ZH__ ? `将 ${page} 重置为默认值` : `Reset ${page} to default`)",
    );
    expect(transformed.code).toContain("((_i0, _i1) => `共 ${_i1} 页，第 ${_i0} 页`)(page, total)");
  });

  it("rejects translations with mismatched placeholders", () => {
    expect(isValidTranslation("Delete {0} items", "删除项目")).toBe(false);
    expect(isValidTranslation("Delete {0} items", "删除 {0} 个项目")).toBe(true);
    expect(isValidTranslation("Plain text", "带 {0} 错误占位符")).toBe(false);
    expect(isValidTranslation("Delete {0} thread{1}?", "确定删除这 {0} 个线程？")).toBe(true);
  });

  it("injects original English title into SETTINGS_SEARCH_ITEMS searchTerms for bilingual search", () => {
    const code = `export const SETTINGS_SEARCH_ITEMS = [
  {
    id: "in-app-notifications",
    title: "In-app notifications",
    to: "/settings/general",
    searchTerms: ["toast popup"],
  },
  {
    id: "plain-item",
    title: "Automatic updates",
    to: "/settings/general",
  },
] as const;
`;
    const dict = {
      "In-app notifications": "应用内通知",
      "Automatic updates": "自动更新",
    };
    const { transformed } = analyzeModule(
      code,
      `${WEB_SRC}/components/settings/settingsSearch.ts`,
      {
        dict,
        webSrcDir: WEB_SRC,
        localeModulePath: LOCALE_MOD,
      },
    );
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain(
      'title: (__IS_ZH__ ? "应用内通知" : "In-app notifications")',
    );
    expect(transformed.code).toContain('searchTerms: ["In-app notifications", "toast popup"]');
    expect(transformed.code).toContain('searchTerms: ["Automatic updates"]');
  });

  it("preserves native language names in DISPLAY_LOCALE_LABELS and filters module IDs properly", () => {
    const code = `const DISPLAY_LOCALE_LABELS = {
  system: "System default",
  "zh-Hans": "简体中文",
  en: "English",
};
export function Lang() { return <div>{DISPLAY_LOCALE_LABELS.system}</div>; }
`;
    const dict = {
      "System default": "跟随系统",
      English: "英语",
    };
    const { transformed } = analyzeModule(code, `${WEB_SRC}/Lang.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain('system: (__IS_ZH__ ? "跟随系统" : "System default")');
    expect(transformed.code).toContain('en: "English"');
    expect(transformed.code).toContain('"zh-Hans": "简体中文"');

    expect(shouldProcessModuleId(`${WEB_SRC}/routes/_chat.tsx?tsr-split=component`, WEB_SRC)).toBe(
      true,
    );
    expect(shouldProcessModuleId(`${WEB_SRC}/i18n/locale.ts`, WEB_SRC)).toBe(false);
    expect(shouldProcessModuleId(`${WEB_SRC}/i18n/runtimeDict.ts`, WEB_SRC)).toBe(false);
    expect(shouldProcessModuleId(`${WEB_SRC}/foo.test.tsx`, WEB_SRC)).toBe(false);
    expect(shouldProcessModuleId(`${WEB_SRC}/diffWorker.ts?worker`, WEB_SRC)).toBe(false);
  });

  it("strips English plural -s/-es suffixes in Chinese mode and skips no-op identical translations", () => {
    const code = `export function Count({ n }: { n: number }) {
  return (
    <div>
      <span>Google</span>
      <p>Removed {n} hidden character{n === 1 ? "" : "s"}.</p>
    </div>
  );
}
`;
    const dict = {
      Google: "Google",
      Removed: "已移除",
      "hidden character": "个隐藏字符",
    };
    const { transformed } = analyzeModule(
      code,
      "d:/WorkSpace/Tools/t3code/apps/web/src/components/Count.tsx",
      {
        dict,
        webSrcDir: WEB_SRC,
        localeModulePath: LOCALE_MOD,
      },
    );
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain('import { __IS_ZH__ } from "../i18n/locale";');
    expect(transformed.code).toContain("<span>Google</span>");
    expect(transformed.code).toContain('(__IS_ZH__ ? "" : (n === 1 ? "" : "s"))');
  });

  it("extracts and translates SelectValue render-prop arrow functions, contextMenu.show, scalar tooltip vars, and nested tooltips inside <code>", () => {
    const code = `export function Controls({ api, disabled }: { api: any; disabled: boolean }) {
  const sendTooltip = disabled ? "Environment disconnected" : "Send message";
  const openMenu = () => api.contextMenu.show([{ id: "copy", label: "Copy full path" }]);
  return (
    <div>
      <code>
        v0.1.8
        <TooltipPopup>Copy version</TooltipPopup>
      </code>
      <SelectValue>
        {(value: string | null) => (value === "prefer" ? "Prefer" : "Manual only")}
      </SelectValue>
      <TooltipPopup>{sendTooltip}</TooltipPopup>
    </div>
  );
}
`;
    const dict = {
      "Environment disconnected": "环境已断开连接",
      "Send message": "发送消息",
      "Copy full path": "复制完整路径",
      "Copy version": "复制版本号",
      Prefer: "优先使用",
      "Manual only": "仅手动选择",
    };
    const { extracted, transformed } = analyzeModule(code, `${WEB_SRC}/components/Controls.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(extracted.has("v0.1.8")).toBe(false);
    expect(extracted.has("Copy version")).toBe(true);
    expect(extracted.has("Prefer")).toBe(true);
    expect(extracted.has("Copy full path")).toBe(true);
    expect(extracted.has("Environment disconnected")).toBe(true);
    expect(transformed).not.toBeNull();
    expect(transformed.code).toContain('{__IS_ZH__ ? "复制版本号" : "Copy version"}');
    expect(transformed.code).toContain('(__IS_ZH__ ? "优先使用" : "Prefer")');
    expect(transformed.code).toContain('label: (__IS_ZH__ ? "复制完整路径" : "Copy full path")');
    expect(transformed.code).toContain(
      '(__IS_ZH__ ? "环境已断开连接" : "Environment disconnected")',
    );
  });

  it("preserves native language names in DISPLAY_LOCALE_LABELS while translating system", () => {
    const code = `const DISPLAY_LOCALE_LABELS = {
  system: "Follow system",
  en: "English",
  "zh-Hans": "简体中文",
} as const;
export function LocaleSelect() {
  return <span>{DISPLAY_LOCALE_LABELS.en}</span>;
}
`;
    const dict = {
      "Follow system": "跟随系统",
      English: "英语",
    };
    const { extracted, transformed } = analyzeModule(
      code,
      `${WEB_SRC}/components/LocaleSelect.tsx`,
      {
        dict,
        webSrcDir: WEB_SRC,
        localeModulePath: LOCALE_MOD,
      },
    );
    expect(extracted.has("Follow system")).toBe(true);
    expect(extracted.has("English")).toBe(false);
    expect(transformed.code).toContain('system: (__IS_ZH__ ? "跟随系统" : "Follow system")');
    expect(transformed.code).toContain('en: "English"');
  });

  it("preserves T3 Code brand lockup via file-scoped override while translating Code elsewhere", () => {
    const brandCode = `export function Brand() {
  return (
    <span>
      <T3Wordmark />
      <span>Code</span>
      <Badge>Beta</Badge>
    </span>
  );
}
`;
    const dict = {
      Code: "代码",
      "components/sidebar/SidebarChrome.tsx::Code": "Code",
    };
    const brandResult = analyzeModule(
      brandCode,
      `${WEB_SRC}/components/sidebar/SidebarChrome.tsx`,
      {
        dict,
        webSrcDir: WEB_SRC,
        localeModulePath: LOCALE_MOD,
      },
    );
    // Neither "Code" (overridden to "Code") nor "Beta" (stage badge) should be mutated!
    expect(brandResult.transformed).toBeNull();

    const otherResult = analyzeModule(
      `export function Tab() { return <span>Code</span>; }`,
      `${WEB_SRC}/components/Tab.tsx`,
      {
        dict,
        webSrcDir: WEB_SRC,
        localeModulePath: LOCALE_MOD,
      },
    );
    expect(otherResult.transformed).not.toBeNull();
    expect(otherResult.transformed.code).toContain('{__IS_ZH__ ? "代码" : "Code"}');
  });
  it("transforms toastManager.add and toastManager.update in .ts modules and preserves <pre> children while localizing aria-label", () => {
    const tsCode = `export function notify(toastManager: any, toastId: string) {
  toastManager.add({ type: "error", title: "Could not start thread" });
  toastManager.update(toastId, { title: "Stack rebased", description: "That snooze time has passed. Choose another time." });
}
`;
    const dict = {
      "Could not start thread": "无法启动线程",
      "Stack rebased": "堆栈已完成变基",
      "That snooze time has passed. Choose another time.": "所选延后时间已过，请另选时间。",
      "Captured terminal output": "已捕获的终端输出",
      "Read/s": "读取/秒",
    };
    const tsRes = analyzeModule(tsCode, `${WEB_SRC}/hooks/useNotify.ts`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(tsRes.extracted.has("Could not start thread")).toBe(true);
    expect(tsRes.extracted.has("Stack rebased")).toBe(true);
    expect(tsRes.transformed).not.toBeNull();
    expect(tsRes.transformed.code).toContain(
      `title: (__IS_ZH__ ? "无法启动线程" : "Could not start thread")`,
    );
    expect(tsRes.transformed.code).toContain(
      `toastManager.update(toastId, { title: (__IS_ZH__ ? "堆栈已完成变基" : "Stack rebased")`,
    );

    const jsxCode = `export function Term() {
  return (
    <div>
      <th>Read/s</th>
      <pre aria-label="Captured terminal output">Keep raw English inside pre</pre>
    </div>
  );
}
`;
    const jsxRes = analyzeModule(jsxCode, `${WEB_SRC}/components/Term.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(jsxRes.extracted.has("Read/s")).toBe(true);
    expect(jsxRes.extracted.has("Captured terminal output")).toBe(true);
    expect(jsxRes.extracted.has("Keep raw English inside pre")).toBe(false);
    expect(jsxRes.transformed.code).toContain(
      `aria-label={__IS_ZH__ ? "已捕获的终端输出" : "Captured terminal output"}`,
    );
    expect(jsxRes.transformed.code).toContain(">Keep raw English inside pre</pre>");

    const confirmTsCode = `export async function ask(localApi: any, labels: string[]) {
  return localApi.dialogs.confirm(
    labels.length === 1
      ? [\`Close terminal "\${labels[0]}"?\`, "This stops the running process and clears its history."].join("\\n")
      : [\`Close \${labels.length} terminals?\`].join("\\n"),
  );
}
`;
    const confirmRes = analyzeModule(confirmTsCode, `${WEB_SRC}/lib/terminalCloseConfirm.ts`, {
      dict: {
        'Close terminal "{0}"?': "确定关闭终端“{0}”？",
        "This stops the running process and clears its history.":
          "这会停止正在运行的进程并清空终端历史记录。",
        "Close {0} terminals?": "确定关闭这 {0} 个终端？",
      },
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(confirmRes.extracted.has('Close terminal "{0}"?')).toBe(true);
    expect(confirmRes.extracted.has("Close {0} terminals?")).toBe(true);
    expect(confirmRes.transformed).not.toBeNull();
    expect(confirmRes.transformed.code).toContain("确定关闭终端");
  });

  it("leaves gt-react <T> and <Tx> untouched while localizing spread arrays, nested choices, and toast .join() arrays", () => {
    const gtCode = `import { T, Tx } from "gt-react";
export function SettingsHeader({ theme }: { theme: boolean }) {
  const changedSettingLabels = [
    ...(theme ? ["Theme"] : []),
    "Font size",
  ];
  const EFFORT_OPTIONS = [
    {
      label: "Thinking",
      choices: [{ value: "high", label: "High" }],
    },
  ];
  return (
    <div>
      <T>Display</T>
      <Tx>Preferences</Tx>
      <span>{changedSettingLabels.join(", ")}{EFFORT_OPTIONS[0].label}</span>
    </div>
  );
}
`;
    const dict = {
      Display: "显示",
      Preferences: "偏好设置",
      Theme: "主题",
      "Font size": "字号",
      Thinking: "思考强度",
      High: "高",
    };
    const res = analyzeModule(gtCode, `${WEB_SRC}/components/SettingsHeader.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(res.extracted.has("Display")).toBe(false);
    expect(res.extracted.has("Preferences")).toBe(false);
    expect(res.extracted.has("Theme")).toBe(true);
    expect(res.extracted.has("Font size")).toBe(true);
    expect(res.extracted.has("Thinking")).toBe(true);
    expect(res.extracted.has("High")).toBe(true);
    expect(res.transformed).not.toBeNull();
    expect(res.transformed.code).toContain("<T>Display</T>");
    expect(res.transformed.code).toContain("<Tx>Preferences</Tx>");
    expect(res.transformed.code).toContain('(__IS_ZH__ ? "主题" : "Theme")');
    expect(res.transformed.code).toContain('label: (__IS_ZH__ ? "高" : "High")');

    const toastJoinCode = `export function notifyReset(toastManager: any, scope: string) {
  toastManager.add({
    type: "warning",
    title: "Project settings error",
    description: [scope, "Using personal defaults until it is fixed."].filter(Boolean).join(" — "),
  });
}
`;
    const toastJoinRes = analyzeModule(toastJoinCode, `${WEB_SRC}/hooks/useScopedSettings.ts`, {
      dict: {
        "Project settings error": "项目设置错误",
        "Using personal defaults until it is fixed.": "修复前将暂用个人默认设置。",
      },
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(toastJoinRes.extracted.has("Using personal defaults until it is fixed.")).toBe(true);
    expect(toastJoinRes.transformed?.code).toContain("修复前将暂用个人默认设置。");
  });

  it("translates JSXSpreadAttribute display props, JSX array attributes, and source control terminology", () => {
    const jsxCode = `export function PickerDemo({ mixed }: { mixed: boolean }) {
  return (
    <div>
      <ModelPicker {...(mixed ? { triggerLabel: "Automatic (mixed)" } : {})} />
      <PermissionChecklist
        permissions={[
          { id: "screenRecording", title: "Screen Recording", description: "Capture the window you're using." },
        ]}
      />
    </div>
  );
}
`;
    const dict = {
      "Automatic (mixed)": "自动（不一致）",
      "Screen Recording": "屏幕录制",
      "Capture the window you're using.": "截取您当前正在使用的窗口。",
    };
    const res = analyzeModule(jsxCode, `${WEB_SRC}/components/PickerDemo.tsx`, {
      dict,
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(res.extracted.has("Automatic (mixed)")).toBe(true);
    expect(res.extracted.has("Screen Recording")).toBe(true);
    expect(res.transformed?.code).toContain(
      'triggerLabel: (__IS_ZH__ ? "自动（不一致）" : "Automatic (mixed)")',
    );
    expect(res.transformed?.code).toContain('title: (__IS_ZH__ ? "屏幕录制" : "Screen Recording")');

    const scCode = `function presentDefinition(definition: any, providerName: string) {
  return {
    definition,
    providerName,
    terminology: definition.changeRequest,
  };
}
`;
    const scRes = analyzeModule(scCode, `${WEB_SRC}/sourceControlPresentation.tsx`, {
      dict: {},
      webSrcDir: WEB_SRC,
      localeModulePath: LOCALE_MOD,
    });
    expect(scRes.transformed?.code).toContain(
      'definition.changeRequest.shortLabel === "MR" ? "合并请求"',
    );
  });
});
