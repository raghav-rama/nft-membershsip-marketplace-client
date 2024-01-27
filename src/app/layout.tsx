import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Modal } from "@/context/Web3Modal";
import { NavBarContextProvider } from "@/context/NavBarContext/NavBarContext";
import { AuthContextProvider } from "@/context/AuthContext/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mintpass",
  description: "Your one stop destination to get NFT Memberships",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <NavBarContextProvider>
            <Web3Modal>{children}</Web3Modal>
          </NavBarContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
