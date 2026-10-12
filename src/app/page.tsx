import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-navy">
            JASTECH
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/ja" className="text-sm font-medium hover:text-primary">
              日本語
            </Link>
            <Link href="/en" className="text-sm font-medium hover:text-primary">
              English
            </Link>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
            Jastech
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vietnam&apos;s trusted software development partner for Japanese
            companies
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/ja"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              日本語で進む
            </Link>
            <Link
              href="/en"
              className="px-6 py-3 border border-navy text-navy rounded-lg font-medium hover:bg-navy hover:text-white transition"
            >
              Continue in English
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jastech. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
