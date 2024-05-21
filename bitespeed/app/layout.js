import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatbot flow builder",
  description: "Drag and drop chatbot flow builder app created using React Flow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
        <Toaster/>
      </body>
    </html>
  );
}
