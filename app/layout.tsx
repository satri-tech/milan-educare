import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/lib/session-provider";
import { Toaster } from "@/components/ui/sonner"
import Image from '@/public/favicon.ico'
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: "Milaan EduCare",
  description: "Entrance Preparation Classes",
  icons: {
    icon: Image.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
      >
        <SessionProviderWrapper>
          {children}
          <Toaster richColors />
        </SessionProviderWrapper>
      </body>
    </html >
  );
}
