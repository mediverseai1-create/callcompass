import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
const display = Archivo({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "900"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "CallCompass — Revenue intelligence from your sales calls", description: "Turn recorded sales conversations into call metrics, deal health, forecasts and coaching." };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body className="font-sans">{children}</body></html>;
}
