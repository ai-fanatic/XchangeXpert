import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "💸XchangeXpert",
  description:
    "🌍🔄💰 Global Currency Converter 🚀✨ Transform your finances with a click! This intuitive web app allows you to effortlessly swap currencies from around the globe. 🌐 Enter any amount, choose your currencies, and watch as it magically converts to your desired currency. 💸💹 Whether you're planning a trip abroad, doing international business, or just satisfying your curiosity, our app has got you covered. Plus, enjoy a burst of colorful confetti with every conversion! 🎉🎊 Simple, fast, and fun – a must-have tool for every global citizen! 🌟👩‍💼👨‍💼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
