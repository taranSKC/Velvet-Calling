import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "VelvetCall — Talk to Your Fantasy Girls Live",
  description: "Live intimate calls, flirty chatrooms, and premium exclusive photo/video collections with hot performers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Load Google Fonts directly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          family-name="VelvetCall Fonts"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <NextTopLoader
          color="hsl(0, 72%, 52%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px hsl(0, 72%, 52%), 0 0 5px hsl(0, 72%, 52%)"
        />
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
