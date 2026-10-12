import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-navy">
            JASTECH
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/ja"
              className={`text-sm font-medium ${
                locale === 'ja' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              日本語
            </Link>
            <Link
              href="/en"
              className={`text-sm font-medium ${
                locale === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              English
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        <section className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
              {locale === 'ja' ? 'Jastechへようこそ' : 'Welcome to Jastech'}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'ja'
                ? 'ベトナムで最も信頼される、日本企業向けソフトウェア開発パートナー'
                : "Vietnam's most trusted software development partner for Japanese companies"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/services`}
                className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
              >
                {locale === 'ja' ? 'サービスを見る' : 'View Services'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-4 border-2 border-navy text-navy rounded-lg font-medium hover:bg-navy hover:text-white transition"
              >
                {locale === 'ja' ? 'お問い合わせ' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Jastech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
