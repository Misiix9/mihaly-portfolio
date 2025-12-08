import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, setRequestLocale } from 'next-intl/server';
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

// ... (existing imports)

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();

  // Structured Data (JSON-LD) for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
     // ... rest of jsonLd

    "name": "Mihály Győri",
    "alternateName": "Selora",
    "url": "https://selora.dev",
    "image": "https://selora.dev/images/image.jpg",
    "sameAs": [
      "https://github.com/Misiix9",
      "https://instagram.com/misiix9",
      "https://linkedin.com/in/mihalygyori"
    ],
    "jobTitle": "Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Professional Web Developer specializing in Next.js, React, and 3D interactions.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Budapest",
      "addressCountry": "Hungary"
    }
  };

  return (
    <html lang={locale} className={`${lexend.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground selection:bg-accent selection:text-white" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
           <SoundProvider>
             <SmoothScrollProvider>
               <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
               />
               <ParticlesBackground />
               <NeuralCursor />
               {children}
               <MuteButton />
               <GameWrapper />
               <StoryLine />
             </SmoothScrollProvider>
           </SoundProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
