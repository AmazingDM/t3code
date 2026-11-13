import { resolveLocale } from "@t3tools/client-runtime/locales";
import { getTranslationsSnapshot } from "gt-react";

import {
  getClientSettings,
  getClientSettingsHydratedSnapshot,
  subscribeClientSettings,
  subscribeClientSettingsHydration,
  updateClientSettings,
  whenClientSettingsPersisted,
} from "../hooks/useSettings";
import { initializeI18n } from "./initializeI18n";
import { __IS_ZH__ } from "./locale";
import {
  DEFAULT_LOCALE,
  getSystemLocales,
  LANGUAGE_MIGRATED_STORAGE_KEY,
  LEGACY_LOCALE_STORAGE_KEY,
  readCachedLanguageSetting,
  SUPPORTED_LOCALES,
  writeCachedLanguageSetting,
} from "./locales";

type LocaleTranslations = Awaited<ReturnType<typeof getTranslationsSnapshot>>;

export interface I18nSnapshot {
  readonly locale: string;
  readonly translations: LocaleTranslations;
}

const loadedTranslations: LocaleTranslations = { [DEFAULT_LOCALE]: {} };
const pendingLoads = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();
let snapshot: I18nSnapshot = { locale: DEFAULT_LOCALE, translations: { ...loadedTranslations } };
let requestedLocale = DEFAULT_LOCALE;
let reloadPending = false;

function loadLocale(locale: string): Promise<void> {
  if (locale in loadedTranslations) return Promise.resolve();
  let load = pendingLoads.get(locale);
  if (!load) {
    // GT resolves a failed load to an empty catalog. Leave it uncached: English renders now
    // and the next request retries.
    load = getTranslationsSnapshot(locale).then((loaded) => {
      pendingLoads.delete(locale);
      const translations = loaded[locale];
      if (translations && Object.keys(translations).length > 0) {
        loadedTranslations[locale] = translations;
      }
    });
    pendingLoads.set(locale, load);
  }
  return load;
}

function activateLocale(locale: string): void {
  if (requestedLocale !== locale) return;
  if (snapshot.locale === locale && snapshot.translations[locale] === loadedTranslations[locale]) {
    return;
  }
  snapshot = { locale, translations: { ...loadedTranslations } };
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
  for (const listener of listeners) listener();
}

function migrateHydratedLanguageOnce(hydratedLanguage: string): string {
  if (typeof window === "undefined") return hydratedLanguage;
  try {
    if (window.localStorage.getItem(LANGUAGE_MIGRATED_STORAGE_KEY) === "1") {
      return hydratedLanguage;
    }
    const legacy = window.localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY);
    window.localStorage.setItem(LANGUAGE_MIGRATED_STORAGE_KEY, "1");
    window.localStorage.removeItem(LEGACY_LOCALE_STORAGE_KEY);

    let migratedLanguage = hydratedLanguage;
    if (legacy === "zh-Hans") {
      migratedLanguage = "zh";
    } else if (legacy === "en") {
      migratedLanguage = "en";
    } else if (legacy === "system") {
      migratedLanguage = "system";
    } else if (
      hydratedLanguage === DEFAULT_LOCALE &&
      resolveLocale("system", getSystemLocales(), SUPPORTED_LOCALES, DEFAULT_LOCALE) !==
        DEFAULT_LOCALE
    ) {
      // Upstream previously defaulted `language` to "en", writing "en" into client-settings.json.
      migratedLanguage = "system";
    }

    if (migratedLanguage !== hydratedLanguage) {
      writeCachedLanguageSetting(migratedLanguage);
      void updateClientSettings({ language: migratedLanguage });
    }
    return migratedLanguage;
  } catch {
    return hydratedLanguage;
  }
}

function applyLanguageSetting(): void {
  const hydrated = getClientSettingsHydratedSnapshot();
  const languageSetting = hydrated
    ? migrateHydratedLanguageOnce(getClientSettings().language)
    : readCachedLanguageSetting();
  const cachedOk = hydrated ? writeCachedLanguageSetting(languageSetting) : false;

  // Prefer desktopBridge.getPreferredSystemLanguages() over navigator.languages in packaged Electron.
  const nextLocale = resolveLocale(
    languageSetting,
    getSystemLocales(),
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
  );
  requestedLocale = nextLocale;
  void whenLocaleReady();

  if (
    hydrated &&
    cachedOk &&
    !reloadPending &&
    (nextLocale === "zh") !== __IS_ZH__ &&
    typeof window !== "undefined" &&
    !import.meta.env.VITEST
  ) {
    reloadPending = true;
    void whenClientSettingsPersisted().finally(() => {
      window.location.reload();
    });
  }
}

/** GT's own locale setters write the saved setting, which stays the only source of truth. */
export function persistGTLocale(locale: string): void {
  writeCachedLanguageSetting(locale);
  void updateClientSettings({ language: locale });
}

export function startI18n(): void {
  initializeI18n(persistGTLocale);
  subscribeClientSettings(applyLanguageSetting);
  subscribeClientSettingsHydration(applyLanguageSetting);
  applyLanguageSetting();
}

/** Resolves once the requested locale's translations are ready; immediate for English. */
export function whenLocaleReady(): Promise<void> {
  const locale = requestedLocale;
  return loadLocale(locale).then(() => activateLocale(locale));
}

export function subscribeI18n(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getI18nSnapshot(): I18nSnapshot {
  return snapshot;
}
