import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">Page not found</h1>
          <p className="text-lg">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </main>
      </body>
    </html>
  );
}
