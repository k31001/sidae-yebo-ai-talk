/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // 정적 HTML 컨텐츠(public/gangneung/index.html)를 /gangneung 경로로 서빙
    return [{ source: "/gangneung", destination: "/gangneung/index.html" }];
  },
};

export default nextConfig;
