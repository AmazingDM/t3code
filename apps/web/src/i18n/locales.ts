import gtConfig from "../../gt.config.json";

export const DEFAULT_LOCALE = gtConfig.defaultLocale;
export const SUPPORTED_LOCALES: ReadonlyArray<string> = [DEFAULT_LOCALE, ...gtConfig.locales];

const UI_LANGUAGE_STORAGE_KEY = "t3code:ui-language";
export const LEGACY_LOCALE_STORAGE_KEY = "t3code:locale";
export const LANGUAGE_MIGRATED_STORAGE_KEY = "t3code:gt-lang-migrated-v1";

/**
 * Packaged Electron builds pin `navigator.languages` to `["en-US"]`.
 * Prefer `desktopBridge.getPreferredSystemLanguages()` when available and non-empty.
 */
export function getSystemLocales(): ReadonlyArray<string> {
  if (typeof window !== "undefined") {
    const desktopLanguages = window.desktopBridge?.getPreferredSystemLanguages?.();
    if (Array.isArray(desktopLanguages) && desktopLanguages.length > 0) {
      return desktopLanguages;
    }
  }
  if (typeof navigator !== "undefined") {
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      return navigator.languages;
    }
    if (typeof navigator.language === "string" && navigator.language.length > 0) {
      return [navigator.language];
    }
  }
  return [];
}

export function readCachedLanguageSetting(): string {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const cached = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
    if (cached && cached.trim().length > 0) {
      return cached;
    }
    const legacy = window.localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY);
    if (legacy === "zh-Hans") return "zh";
    if (legacy === "en") return "en";
    if (legacy === "system") return "system";
  } catch {
    // Ignore storage errors in restricted contexts.
  }
  return "system";
}

export function writeCachedLanguageSetting(language: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, language);
    return window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY) === language;
  } catch {
    return false;
  }
}
