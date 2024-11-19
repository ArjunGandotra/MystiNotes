import { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar";

export const metadata: Metadata = {
  title: "MystiNotes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
