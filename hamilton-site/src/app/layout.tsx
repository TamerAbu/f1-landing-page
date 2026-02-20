import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const karantina = localFont({
  src: [
    { path: "../../public/Karantina,Open_Sans/Karantina/Karantina-Light.ttf", weight: "300" },
    { path: "../../public/Karantina,Open_Sans/Karantina/Karantina-Regular.ttf", weight: "400" },
    { path: "../../public/Karantina,Open_Sans/Karantina/Karantina-Bold.ttf", weight: "700" },
  ],
  variable: "--font-display",
});

const openSans = localFont({
  src: "../../public/Karantina,Open_Sans/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Grid Pass | חוויות נסיעה פרימיום לפורמולה 1",
  description:
    "טסים למרוצי פורמולה 1 ברחבי העולם. גישת VIP לפדוק, סיורי אוכל, חוויות אחרי שעות המירוץ, ונסיעות קבוצתיות יוקרתיות לחובבי F1 אמיתיים.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${karantina.variable} ${openSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
