import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/lib/session-provider";
import { Toaster } from "@/components/ui/sonner"
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Milan Educare",
  description: "Entrance Preparation Classes",
  icons: {
    icon: 'https://milan-educare.satritech.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.0eed7250.jpg&w=256&q=75'
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
