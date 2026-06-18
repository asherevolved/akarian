import type { Metadata } from "next";
import { Cormorant_Garamond, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akarian®, The Sensory Haven | Early Sensory Nourishment for Children 2–6",
  description:
    "A structured sensory nourishment programme for children aged 2–6, built on strong scientific foundations. EISE™, Early Immersive Sensory Engagement. Whitefield, Bengaluru.",
  keywords: [
    "Akarian",
    "sensory nourishment",
    "early childhood",
    "EISE",
    "Bengaluru",
    "Whitefield",
    "child development",
    "sensory engagement",
  ],
  openGraph: {
    title: "Akarian®, The Sensory Haven",
    description:
      "A Gift for the Young Ones. Structured sensory nourishment for children aged 2–6.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bricolage.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
