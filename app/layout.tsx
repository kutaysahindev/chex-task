import { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const cutive = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Chex Task - Kutay",
  description: "Spelling Bee",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cutive.variable} font-sans`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
