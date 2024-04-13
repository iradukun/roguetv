import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import AuthContext from "@/context/auth-context";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { EventEmitter } from "events";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import ReactQueryProvider from "@/context/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

EventEmitter.defaultMaxListeners = 15;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/spooky.svg",
      href: "/spooky.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ReactQueryProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ThemeProvider
              attribute="class"
              forcedTheme="dark"
              storageKey="roguetv-theme"
              enableColorScheme
            >
              <Toaster theme="light" position="bottom-right" />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthContext>
      </body>
    </html>
  );
}
