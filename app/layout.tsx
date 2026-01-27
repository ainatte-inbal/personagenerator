import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Persona Generator",
  description: "Configure inputs to generate a contextual user profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
