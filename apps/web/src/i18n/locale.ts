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
