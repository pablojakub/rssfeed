import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "@/lib/themeProviderWrapper";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "RSS Feed",
  description: "Your personal RSS feed reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
