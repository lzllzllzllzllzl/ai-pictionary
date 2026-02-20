import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pictionary - 你画我猜",
  description: "Draw and let AI guess what you're drawing!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
