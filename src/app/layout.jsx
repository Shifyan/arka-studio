// src/app/layout.tsx
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Arka Studio",
  description: "Studio Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} `}>
      <body>{children}</body>
    </html>
  );
}
