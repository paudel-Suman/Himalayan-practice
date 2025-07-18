import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/app/(root)/context/store";
import AuthProvider from "@/components/auth/AuthProvider";
import { getCompanyInfo } from "@/actions/fetchcompanydata";
const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-jost",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();

  return {
    title: {
      template: `%s | ${company?.metaTitle ?? "Himalayan Garment"}`,
      default: company?.metaTitle ?? "Himalayan Garment",
    },
    description: company?.metaDescription ?? "Best Garments in Nepal.",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL ?? "https://himalaygarment.com.np"
    ),
    openGraph: {
      title: company?.metaTitle,
      description: company?.metaDescription,
      url: process.env.NEXT_PUBLIC_SERVER_URL,
      siteName: company?.siteName,
      type: "website",
      images: [
        {
          url:
            company?.logoUrl ||
            `${process.env.NEXT_PUBLIC_SERVER_URL}/default-og.png`,
          width: 1200,
          height: 630,
          alt: company?.metaTitle ?? "News Portal",
        },
      ],
    },
    icons: {
      icon: company?.faviconUrl,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body className={jost.variable}>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
