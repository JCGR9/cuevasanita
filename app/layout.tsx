import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Taberna Cuevas Anita La De San Miguel | Restaurante en Alcalá de Guadaíra",
  description: "Taberna Cuevas Anita La De San Miguel - Experiencia gastronómica única en Alcalá de Guadaíra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
