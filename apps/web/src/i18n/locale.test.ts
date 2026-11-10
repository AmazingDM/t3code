import { afterEach, describe, expect, it, vi } from "vite-plus/test";

async function loadLocaleWithPreference(pref: "zh-Hans" | "en") {
  vi.resetModules();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => (key === "t3code:locale" ? pref : null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    location: { reload: vi.fn() },
  });
  return import("./locale");
}

describe("i18n runtime translator tr()", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("translates exact provider, trait, and status strings in zh-Hans mode", async () => {
    const { tr } = await loadLocaleWithPreference("zh-Hans");
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
    // T3 Code brand and arbitrary user strings remain untouched
    expect(tr("T3 Code")).toBe("T3 Code");
    expect(tr("my-custom-project")).toBe("my-custom-project");
  });

  it("passes strings through unchanged in English mode", async () => {
    const { tr } = await loadLocaleWithPreference("en");
    expect(tr("Extra High")).toBe("Extra High");
    expect(tr("Adaptive · Max")).toBe("Adaptive · Max");
    expect(tr(undefined)).toBeUndefined();
    expect(tr(null)).toBeNull();
  });
});
