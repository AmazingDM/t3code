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
    expect(transformed.code).toContain(
      "(__IS_ZH__ ? `将 ${page} 重置为默认值` : `Reset ${page} to default`)",
    );
    expect(transformed.code).toContain("((_i0, _i1) => `共 ${_i1} 页，第 ${_i0} 页`)(page, total)");
  });

  it("rejects translations with mismatched placeholders", () => {
    expect(isValidTranslation("Delete {0} items", "删除项目")).toBe(false);
    expect(isValidTranslation("Delete {0} items", "删除 {0} 个项目")).toBe(true);
    expect(isValidTranslation("Plain text", "带 {0} 错误占位符")).toBe(false);
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
    expect(transformed.code).toContain('system: (__IS_ZH__ ? "跟随系统" : "System default")');
    expect(transformed.code).toContain('en: "English"');
    expect(transformed.code).toContain('"zh-Hans": "简体中文"');

    expect(shouldProcessModuleId(`${WEB_SRC}/routes/_chat.tsx?tsr-split=component`, WEB_SRC)).toBe(
      true,
    );
    expect(shouldProcessModuleId(`${WEB_SRC}/i18n/locale.ts`, WEB_SRC)).toBe(false);
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
    // Lowercase d:/ vs uppercase D:/ still resolves cleanly to "../i18n/locale"
    expect(transformed.code).toContain('import { __IS_ZH__ } from "../i18n/locale";');
    // Identical brand translation does not emit redundant ternary
    expect(transformed.code).toContain("<span>Google</span>");
    // Plural suffix ternary collapses to empty string in Chinese
    expect(transformed.code).toContain('(__IS_ZH__ ? "" : (n === 1 ? "" : "s"))');
  });
});
