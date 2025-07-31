// src/app/layout.tsx
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Arka Studio",
  description: "Studio Booking App",
  icons: { icon: "/Camera.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} `}>
      <body>{children}</body>
    </html>
  );
}
