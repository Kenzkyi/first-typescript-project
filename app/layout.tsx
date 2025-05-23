import { Public_Sans } from "next/font/google";
import "./globals.scss";
import FinanceContext from "./context/FinanceContext";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* <meta charSet="UTF-8" /> */}
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>Personal Finance app</title>
      </head>
      <body className={`${publicSans.className} antialiased`}>
        <FinanceContext>{children}</FinanceContext>
      </body>
    </html>
  );
}
