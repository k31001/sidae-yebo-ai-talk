import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "시대예보 — 취업 안 되는 시대, 이력서보다 중요한 한 가지",
  description:
    "송길영 『시대예보』 기반 · AI 전선이 바꾸는 일의 미래. OKR Party 세미나 발표 자료.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#38bdf8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
