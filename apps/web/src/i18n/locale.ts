import { ZH_RUNTIME_EXACT } from "./runtimeDict";

export type DisplayLocalePreference = "system" | "zh-Hans" | "en";

const LOCALE_STORAGE_KEY = "t3code:locale";

export function readLocalePreference(): DisplayLocalePreference {
  if (typeof window === "undefined") return "en";
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw === "zh-Hans" || raw === "en" || raw === "system") {
      return raw;
    }
  } catch {
    // Ignore storage errors in restricted contexts.
  }
  return "system";
}

function resolveIsZh(preference: DisplayLocalePreference = readLocalePreference()): boolean {
  if (preference === "zh-Hans") return true;
  if (preference === "en") return false;
  if (typeof navigator === "undefined") return false;
  const candidates =
    Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];
  return candidates.some((lang) => typeof lang === "string" && lang.toLowerCase().startsWith("zh"));
}

export const __IS_ZH__: boolean = resolveIsZh();

function translateSegment(segment: string): string {
  const exact = ZH_RUNTIME_EXACT[segment];
  if (exact !== undefined) return exact;

  const speedMatch = /^(.+) (Fast|Ultrafast)$/.exec(segment);
  if (speedMatch) {
    const [, effortPart, speedPart] = speedMatch;
    if (effortPart && speedPart) {
      return `${translateSegment(effortPart)} · ${ZH_RUNTIME_EXACT[speedPart] ?? speedPart}`;
    }
  }

  const toggleMatch = /^(.+) (On|Off)$/.exec(segment);
  if (toggleMatch) {
    const [, namePart, statePart] = toggleMatch;
    if (namePart && statePart) {
      return `${translateSegment(namePart)} ${statePart === "On" ? "开启" : "关闭"}`;
    }
  }

  const nightlyDenied =
    /^(.+) manages T3 Code updates\. Only stable releases can be installed\.$/.exec(segment);
  if (nightlyDenied?.[1]) {
    return `${nightlyDenied[1]} 统一管理 T3 Code 更新，仅允许安装稳定版。`;
  }

  const updatesManaged = /^(.+) manages T3 Code updates\.$/.exec(segment);
  if (updatesManaged?.[1]) {
    return `${updatesManaged[1]} 统一管理 T3 Code 更新。`;
  }

  const policyDenied = /^(.+)'s policy does not allow (.+)\.$/.exec(segment);
  if (policyDenied?.[1] && policyDenied[2]) {
    const cap = ZH_RUNTIME_EXACT[policyDenied[2]] ?? policyDenied[2];
    return `${policyDenied[1]} 的管理策略不允许${/^[A-Za-z0-9]/.test(cap) ? " " : ""}${cap}。`;
  }

  const ceilingDenied = /^(.+) limits threads to (.+)\.$/.exec(segment);
  if (ceilingDenied?.[1] && ceilingDenied[2]) {
    const mode = ZH_RUNTIME_EXACT[ceilingDenied[2]] ?? ceilingDenied[2];
    return `${ceilingDenied[1]} 将线程权限上限限制为“${mode}”。`;
  }

  const managedBy = /^Managed by (.+)\.$/.exec(segment);
  if (managedBy?.[1]) {
    return `由 ${managedBy[1]} 统一管理。`;
  }

  const useVersion = /^Use (.+) for full support\.$/.exec(segment);
  if (useVersion?.[1]) {
    return `请使用 ${useVersion[1]} 以获得完整支持。`;
  }

  const installVersion = /^Update available: install (.+)\.$/.exec(segment);
  if (installVersion?.[1]) {
    return `有可用更新：请安装 ${installVersion[1]}。`;
  }

  const codexRpc = /^Codex could not read usage \(JSON-RPC (.+)\)\.$/.exec(segment);
  if (codexRpc?.[1]) {
    return `Codex 无法读取用量（JSON-RPC ${codexRpc[1]}）。`;
  }

  const cursorTimeout = /^Cursor SDK catalog request timed out after (\d+)ms\.$/.exec(segment);
  if (cursorTimeout?.[1]) {
    return `Cursor SDK 模型目录请求超时（${cursorTimeout[1]}ms）。`;
  }

  return segment;
}

/**
 * Translates dynamic runtime strings originating from shared contracts, provider
 * schemas, model capability descriptors, or server status payloads when Chinese
 * display locale is active. Returns `text` unchanged in English mode.
 */
export function tr(text: string): string;
export function tr(text: string | undefined): string | undefined;
export function tr(text: string | null): string | null;
export function tr(text: string | null | undefined): string | null | undefined;
export function tr(text: string | null | undefined): string | null | undefined {
  if (!__IS_ZH__ || !text) return text;
  const exact = ZH_RUNTIME_EXACT[text];
  if (exact !== undefined) return exact;
  if (text.includes(" · ")) {
    return text.split(" · ").map(translateSegment).join(" · ");
  }
  return translateSegment(text);
}

export function setLocalePreference(next: DisplayLocalePreference): void {
  if (typeof window === "undefined") return;
  const previousResolved = resolveIsZh();
  try {
    if (next === "system") {
      window.localStorage.removeItem(LOCALE_STORAGE_KEY);
    } else {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    }
  } catch {
    return;
  }
  const nextResolved = resolveIsZh(next);
  if (typeof document !== "undefined") {
    document.documentElement.lang = nextResolved ? "zh-Hans" : "en";
  }
  if (nextResolved !== previousResolved) {
    window.location.reload();
  }
}
