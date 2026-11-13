import { afterEach, describe, expect, it, vi } from "vite-plus/test";

async function loadLocaleWithLanguage(
  language: string | null,
  options?: { legacy?: string; desktopLanguages?: ReadonlyArray<string>; navLanguages?: string[] },
) {
  vi.resetModules();
  vi.stubGlobal("navigator", {
    languages: options?.navLanguages ?? ["en-US"],
    language: options?.navLanguages?.[0] ?? "en-US",
  });
  vi.stubGlobal("window", {
    desktopBridge: options?.desktopLanguages
      ? { getPreferredSystemLanguages: () => options.desktopLanguages }
      : undefined,
    localStorage: {
      getItem: (key: string) => {
        if (key === "t3code:ui-language") return language;
        if (key === "t3code:locale") return options?.legacy ?? null;
        return null;
      },
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    location: { reload: vi.fn() },
  });
  return import("./locale");
}

describe("i18n runtime translator tr() and unified locale resolution", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("translates exact provider, trait, and status strings in zh mode", async () => {
    const { tr, __IS_ZH__ } = await loadLocaleWithLanguage("zh");
    expect(__IS_ZH__).toBe(true);
    expect(tr("Extra High")).toBe("超高");
    expect(tr("Adaptive · Max · 1M Context")).toBe("自适应 · 最高 · 1M 上下文");
    expect(tr("Extra High Fast")).toBe("超高 · 快速");
    expect(tr("Extra High Ultrafast")).toBe("超高 · 极速");
    expect(tr("1M Context On")).toBe("1M 上下文 开启");
    expect(tr("Managed by Acme Corp.")).toBe("由 Acme Corp 统一管理。");
    expect(tr("Acme Corp's policy does not allow webhook tasks.")).toBe(
      "Acme Corp 的管理策略不允许使用 Webhook 任务。",
    );
    expect(tr("Acme Corp's policy does not allow Codex.")).toBe(
      "Acme Corp 的管理策略不允许 Codex。",
    );
    expect(tr("Update available: install v0.2.0.")).toBe("有可用更新：请安装 v0.2.0。");
    expect(tr("In 30 minutes")).toBe("30 分钟后");
    expect(tr("In 1 hour")).toBe("1 小时后");
    expect(tr("Thu 14:00")).toBe("周四 14:00");
    expect(tr("Open on GitHub")).toBe("在 GitHub 中打开");
    expect(tr("Pending Approval")).toBe("待批准");
    expect(tr("Speed")).toBe("速度");
    expect(
      tr(
        "Install update v0.1.9 and restart T3 Code?\n\nAny running tasks will be interrupted. Make sure you're ready before continuing.",
      ),
    ).toBe(
      "确定安装更新 v0.1.9 并重启 T3 Code？\n\n所有正在运行的任务都会被中断，请确认准备就绪后再继续。",
    );
    expect(
      tr('Unpin thread "Refactor auth"?\nThis will move the thread out of your pinned section.'),
    ).toBe("确定取消置顶线程“Refactor auth”？\n这会将该线程移出置顶区域。");
    // T3 Code brand and arbitrary user strings remain untouched
    expect(tr("T3 Code")).toBe("T3 Code");
    expect(tr("my-custom-project")).toBe("my-custom-project");
  });

  it("prefers Electron desktopBridge.getPreferredSystemLanguages() over pinned navigator.languages", async () => {
    const { __IS_ZH__ } = await loadLocaleWithLanguage("system", {
      desktopLanguages: ["zh-CN", "en-US"],
      navLanguages: ["en-US"],
    });
    expect(__IS_ZH__).toBe(true);
  });

  it("respects legacy t3code:locale fallback before first hydration migration", async () => {
    const { __IS_ZH__ } = await loadLocaleWithLanguage(null, {
      legacy: "zh-Hans",
      navLanguages: ["en-US"],
    });
    expect(__IS_ZH__).toBe(true);
  });

  it("passes strings through unchanged in non-zh modes", async () => {
    const { tr, __IS_ZH__ } = await loadLocaleWithLanguage("en");
    expect(__IS_ZH__).toBe(false);
    expect(tr("Extra High")).toBe("Extra High");
    expect(tr("Adaptive · Max")).toBe("Adaptive · Max");
    expect(tr(undefined)).toBeUndefined();
    expect(tr(null)).toBeNull();
  });
});
