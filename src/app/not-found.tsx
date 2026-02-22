import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          404
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Page not found
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
