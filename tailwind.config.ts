import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#1a0b4b", violet: { 50:"#f6f2ff",100:"#ece4ff",200:"#d9c9ff",500:"#7c4dff",600:"#6a35f0",700:"#5524c9",900:"#1a0b4b" }, pink: { 400:"#ff6fd8", 500:"#f046c2", 600:"#d62fa9" } },
    fontFamily: { display: ["var(--font-display)","sans-serif"], sans: ["var(--font-sans)","system-ui","sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
