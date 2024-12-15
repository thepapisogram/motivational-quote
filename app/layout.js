import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: "400", subsets: ['latin']});

export const metadata = {
  title: "Motivational Quote",
  description: "Developed by Group 5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
