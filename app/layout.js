import "./globals.css";

export const metadata = {
  title: "How LLMs Work Internally",
  description:
    "An interactive visual guide — from raw text to predicted tokens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
