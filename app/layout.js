import "./globals.css";

export const metadata = {
  title: "Em Construção | TabNews",
  description:
    "Estamos reconstruindo o TabNews, um lugar na internet para quem trabalha com tecnologia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
