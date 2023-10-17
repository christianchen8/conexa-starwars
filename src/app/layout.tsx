import "./globals.css";
import type { Metadata } from "next";
import { RootContainer } from "./root-container";
import { Saira_Extra_Condensed, Poppins } from "next/font/google";

const saira = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-saira-extra-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Star Wars Challenge",
  description: "Generated by Christian Chen",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Star Wars Challenge</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body className={`${saira.variable} ${poppins.variable}`}>
        <RootContainer>{children}</RootContainer>
      </body>
    </html>
  );
}
