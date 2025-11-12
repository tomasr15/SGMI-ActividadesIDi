import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rendilo",
  description: "Plataforma de exámenes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
     {children}
      </body>
    </html>
  );
}