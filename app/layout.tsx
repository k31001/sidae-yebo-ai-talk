import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "컨텐츠 홈 — 시대예보 발표 · 강릉 가족여행",
  description:
    "시대예보(송길영) 발표 웹앱과 강릉 2박 3일 가족여행 가이드를 선택해 볼 수 있는 홈.",
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
