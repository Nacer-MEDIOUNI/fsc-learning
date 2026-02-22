import type { FooterProps } from './Footer.interfaces';

export default function Footer({
  copyrightText = '\u00A9 2026 Forest Stewardship Council',
  privacyLabel = 'Privacy',
  termsLabel = 'Terms',
  helpLabel = 'Help',
}: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 dark:border-gold/25 bg-white dark:bg-neutral-900 rounded-xl mt-6 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="flex items-center gap-3">
        <img
          src="/images/logo_footer.png"
          alt="FSC - Forests For All Forever"
          className="h-10 w-auto dark:brightness-200"
        />
        <p>{copyrightText}</p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          {privacyLabel}
        </a>
        <a
          href="#"
          className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          {termsLabel}
        </a>
        <a
          href="#"
          className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          {helpLabel}
        </a>
      </div>
    </footer>
  );
}
