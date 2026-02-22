import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const common = (await import(`../../i18n/${locale}/common.json`)).default;
  const nav = (await import(`../../i18n/${locale}/nav.json`)).default;
  const dashboard = (await import(`../../i18n/${locale}/dashboard.json`))
    .default;
  const courses = (await import(`../../i18n/${locale}/courses.json`)).default;
  const notifications = (
    await import(`../../i18n/${locale}/notifications.json`)
  ).default;
  const profile = (await import(`../../i18n/${locale}/profile.json`)).default;
  const search = (await import(`../../i18n/${locale}/search.json`)).default;
  const achievements = (await import(`../../i18n/${locale}/achievements.json`))
    .default;
  const saved = (await import(`../../i18n/${locale}/saved.json`)).default;

  return {
    locale,
    messages: {
      common,
      nav,
      dashboard,
      courses,
      notifications,
      profile,
      search,
      achievements,
      saved,
    },
  };
});
