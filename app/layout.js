import "./globals.css"; // Optional: Global CSS
import Link from "next/link";

export const metadata = {
  title: "Next.js USERS App Router",
  description: "A sample app using App Router with Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <nav className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
