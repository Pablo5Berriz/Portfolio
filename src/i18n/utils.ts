import { ui, defaultLocale, locales, type Locale, type UiKey } from './ui';

export { locales, defaultLocale };
export type { Locale };

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (locales.includes(maybeLocale as Locale)) {
    return maybeLocale as Locale;
  }
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

/** Builds a path prefixed with the given locale, e.g. localizePath('en', '/projects') -> '/en/projects' */
export function localizePath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/** Given the current pathname, returns the equivalent path for the target locale. */
export function swapLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }
  return segments.join('/') || '/';
}
