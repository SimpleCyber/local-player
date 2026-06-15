import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melodia — Local Music & Video Player",
  description: "Play your local audio and video files in a beautiful, modern interface. Organize folders, create playlists, and enjoy your media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
