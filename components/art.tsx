import React from "react";

/* =========================================================================
 *  시대예보 — SVG 일러스트 & 인포그래픽 라이브러리
 *  모든 컴포넌트는 className 으로 크기를 받고, viewBox 로 반응형 스케일.
 *  팔레트: sky / amber / slate / emerald / rose / violet
 * ========================================================================= */

type P = { className?: string };

// 삼각함수 좌표 반올림 — 서버/클라이언트 부동소수점 차이로 인한 hydration 불일치 방지
const r = (n: number) => Math.round(n * 100) / 100;

/* ---------- 공용 작은 조각 ---------- */

export function Sparkles({ className = "" }: P) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      {[
        [20, 30, 7],
        [95, 22, 5],
        [60, 12, 4],
        [102, 70, 6],
        [16, 84, 5],
      ].map(([x, y, r], i) => (
        <path
          key={i}
          d={`M${x} ${y - r} L${x + r * 0.35} ${y - r * 0.35} L${x + r} ${y} L${x + r * 0.35} ${y + r * 0.35} L${x} ${y + r} L${x - r * 0.35} ${y + r * 0.35} L${x - r} ${y} L${x - r * 0.35} ${y - r * 0.35} Z`}
          fill="#fcd34d"
          opacity={0.9}
        />
      ))}
    </svg>
  );
}

/* ---------- 날씨 글리프 세트 (agenda 타일 / 액센트) ---------- */

export function Wx({ type, className = "" }: P & { type: string }) {
  const common = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "sun":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={r(50 + Math.cos(a) * 30)}
                y1={r(50 + Math.sin(a) * 30)}
                x2={r(50 + Math.cos(a) * 42)}
                y2={r(50 + Math.sin(a) * 42)}
                stroke="#fbbf24"
                strokeWidth={6}
                {...common}
              />
            );
          })}
          <circle cx="50" cy="50" r="22" fill="#fcd34d" />
          <circle cx="50" cy="50" r="22" fill="#fbbf24" opacity="0.35" />
        </svg>
      );
    case "cloudsun":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <circle cx="38" cy="38" r="16" fill="#fbbf24" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line key={i} x1={r(38 + Math.cos(a) * 20)} y1={r(38 + Math.sin(a) * 20)} x2={r(38 + Math.cos(a) * 27)} y2={r(38 + Math.sin(a) * 27)} stroke="#fbbf24" strokeWidth={5} {...common} />
            );
          })}
          <path d="M32 70 a14 14 0 0 1 4 -27 a18 18 0 0 1 34 4 a12 12 0 0 1 -2 23 Z" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth={3} {...common} />
        </svg>
      );
    case "storm":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <path d="M24 58 a16 16 0 0 1 5 -31 a20 20 0 0 1 39 5 a14 14 0 0 1 -3 26 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth={3} {...common} />
          <path d="M52 52 L40 74 H52 L44 92 L70 64 H56 L64 52 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} {...common} />
        </svg>
      );
    case "tornado":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          {[18, 30, 42, 54].map((y, i) => (
            <rect key={i} x={20 + i * 6} y={y} width={60 - i * 14} height={7} rx={3.5} fill={["#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7"][i]} />
          ))}
          <path d="M47 61 q-6 14 -10 28" stroke="#0284c7" strokeWidth={6} fill="none" {...common} />
        </svg>
      );
    case "rainbow":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          {[
            ["#fb7185", 34],
            ["#fbbf24", 28],
            ["#34d399", 22],
            ["#38bdf8", 16],
          ].map(([c, r], i) => (
            <path key={i} d={`M${50 - (r as number)} 70 a${r} ${r} 0 0 1 ${(r as number) * 2} 0`} stroke={c as string} strokeWidth={6} fill="none" {...common} />
          ))}
          <circle cx="30" cy="72" r="8" fill="#e0f2fe" />
          <circle cx="70" cy="72" r="8" fill="#e0f2fe" />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <circle cx="50" cy="50" r="34" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={4} />
          <path d="M50 24 L60 50 L50 76 L40 50 Z" fill="#fb7185" />
          <path d="M50 24 L60 50 L50 50 Z" fill="#f43f5e" />
          <circle cx="50" cy="50" r="5" fill="#0f172a" />
        </svg>
      );
    case "front": // 기압골/전선
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <path d="M10 50 q20 -26 40 0 t40 0" stroke="#0ea5e9" strokeWidth={5} fill="none" {...common} />
          {[22, 50, 78].map((x, i) => (
            <path key={i} d={`M${x - 8} 50 a8 8 0 0 1 16 0Z`} fill="#f43f5e" />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- 1. 표지 하늘 장면 ---------- */
export function CoverScene({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden>
      <defs>
        <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="110" r="120" fill="#fbbf24" opacity="0.12" />
      <circle cx="210" cy="110" r="78" fill="#fbbf24" opacity="0.18" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={i} x1={r(210 + Math.cos(a) * 62)} y1={r(110 + Math.sin(a) * 62)} x2={r(210 + Math.cos(a) * 82)} y2={r(110 + Math.sin(a) * 82)} stroke="#fbbf24" strokeWidth={7} strokeLinecap="round" />;
      })}
      <circle cx="210" cy="110" r="52" fill="url(#cs-sun)" />
      {/* 구름 */}
      <path d="M60 210 a26 26 0 0 1 8 -50 a34 34 0 0 1 64 8 a22 22 0 0 1 -4 42 Z" fill="#fff" opacity="0.92" />
      <path d="M150 250 a20 20 0 0 1 6 -38 a26 26 0 0 1 50 6 a17 17 0 0 1 -3 32 Z" fill="#e0f2fe" />
      {/* 종이비행기 (경량문명 상징) */}
      <g transform="translate(196 196) rotate(8)">
        <path d="M0 22 L60 0 L24 56 L18 34 Z" fill="#0ea5e9" />
        <path d="M0 22 L60 0 L18 34 Z" fill="#38bdf8" />
        <path d="M24 56 L18 34 L36 28 Z" fill="#0284c7" />
        <path d="M-26 50 q14 -8 44 -16" stroke="#7dd3fc" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      </g>
    </svg>
  );
}

/* ---------- 4. 변곡점: 전선 통과 타임라인 ---------- */
export function FrontDiagram({ className = "" }: P) {
  return (
    <svg viewBox="0 0 480 200" className={className} aria-hidden>
      <defs>
        <linearGradient id="fd-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="48%" stopColor="#cbd5e1" />
          <stop offset="52%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* before sky */}
      <rect x="0" y="0" width="240" height="200" rx="20" fill="#f1f5f9" />
      <rect x="240" y="0" width="240" height="200" rx="20" fill="#e0f2fe" />
      {/* 타임라인 */}
      <line x1="20" y1="150" x2="460" y2="150" stroke="url(#fd-line)" strokeWidth={6} strokeLinecap="round" />
      {/* before: 사람 지능 공급 */}
      <circle cx="80" cy="100" r="20" fill="#94a3b8" />
      <rect x="64" y="120" width="32" height="26" rx="10" fill="#94a3b8" />
      {/* 번개(전환점) */}
      <path d="M240 40 L224 96 H244 L228 150 L268 86 H246 L262 40 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3} strokeLinejoin="round" />
      {/* after: 로봇 지능 구독 */}
      <rect x="380" y="74" width="48" height="42" rx="12" fill="#0ea5e9" />
      <circle cx="394" cy="95" r="5" fill="#fff" />
      <circle cx="414" cy="95" r="5" fill="#fff" />
      <line x1="404" y1="60" x2="404" y2="74" stroke="#0284c7" strokeWidth={4} strokeLinecap="round" />
      <circle cx="404" cy="56" r="5" fill="#fbbf24" />
      {/* 라벨 점 */}
      <circle cx="80" cy="150" r="8" fill="#94a3b8" />
      <circle cx="254" cy="150" r="9" fill="#f59e0b" />
      <circle cx="404" cy="150" r="8" fill="#0ea5e9" />
    </svg>
  );
}

/* ---------- 5. 중량 vs 경량: 저울 ---------- */
export function BalanceHeavyLight({ className = "" }: P) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden>
      {/* 받침 */}
      <rect x="232" y="70" width="16" height="150" rx="6" fill="#cbd5e1" />
      <path d="M180 230 H300 L288 244 H192 Z" fill="#94a3b8" />
      {/* 빔 (왼쪽 무거워 기울어짐) */}
      <g transform="rotate(-9 240 78)">
        <rect x="70" y="72" width="340" height="12" rx="6" fill="#64748b" />
        <line x1="120" y1="84" x2="120" y2="118" stroke="#94a3b8" strokeWidth={4} />
        <line x1="360" y1="84" x2="360" y2="118" stroke="#94a3b8" strokeWidth={4} />
        {/* 왼쪽: 공장(중량) */}
        <g transform="translate(78 118)">
          <rect x="0" y="20" width="84" height="46" rx="6" fill="#94a3b8" />
          <rect x="10" y="2" width="16" height="24" fill="#64748b" />
          <rect x="30" y="-8" width="16" height="34" fill="#64748b" />
          <rect x="12" y="34" width="14" height="14" fill="#e2e8f0" />
          <rect x="36" y="34" width="14" height="14" fill="#e2e8f0" />
          <rect x="60" y="34" width="14" height="14" fill="#e2e8f0" />
          <circle cx="22" cy="-4" r="6" fill="#cbd5e1" />
          <circle cx="40" cy="-16" r="7" fill="#cbd5e1" />
        </g>
        {/* 오른쪽: 깃털(경량) */}
        <g transform="translate(330 120)">
          <path d="M30 0 C60 18 50 60 8 70 C2 50 4 18 30 0 Z" fill="#7dd3fc" />
          <path d="M30 0 C40 24 34 52 12 66" stroke="#0284c7" strokeWidth={3} fill="none" strokeLinecap="round" />
          {[14, 26, 38, 50].map((y, i) => (
            <line key={i} x1="24" y1={y} x2={14 - i} y2={y + 6} stroke="#38bdf8" strokeWidth={2.5} strokeLinecap="round" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ---------- 6. 지능의 범용화: IQ 게이지 ---------- */
export function IqGauge({ className = "" }: P) {
  // 반원 게이지 100 -> 140 (범위 60~160)
  const polar = (val: number) => {
    const t = (val - 60) / 100; // 0..1
    const a = Math.PI * (1 - t); // 180deg..0
    return [r(240 + Math.cos(a) * 150), r(200 - Math.sin(a) * 150)];
  };
  const [x1, y1] = polar(100);
  const [x2, y2] = polar(140);
  return (
    <svg viewBox="0 0 480 240" className={className} aria-hidden>
      <defs>
        <linearGradient id="iq-arc" x1="0" x2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M90 200 A150 150 0 0 1 390 200" fill="none" stroke="#ede9fe" strokeWidth={26} strokeLinecap="round" />
      <path d={`M${x1} ${y1} A150 150 0 0 1 ${x2} ${y2}`} fill="none" stroke="url(#iq-arc)" strokeWidth={26} strokeLinecap="round" />
      {/* 작년 바늘 */}
      <line x1="240" y1="200" x2={x1} y2={y1} stroke="#cbd5e1" strokeWidth={6} strokeLinecap="round" />
      {/* 올해 바늘 */}
      <line x1="240" y1="200" x2={x2} y2={y2} stroke="#7c3aed" strokeWidth={8} strokeLinecap="round" />
      <circle cx="240" cy="200" r="12" fill="#7c3aed" />
      {/* 로봇 머리 */}
      <g transform="translate(214 80)">
        <rect x="0" y="0" width="52" height="44" rx="12" fill="#8b5cf6" />
        <circle cx="15" cy="22" r="5.5" fill="#fff" />
        <circle cx="37" cy="22" r="5.5" fill="#fff" />
        <line x1="26" y1="-12" x2="26" y2="0" stroke="#7c3aed" strokeWidth={4} strokeLinecap="round" />
        <circle cx="26" cy="-16" r="5" fill="#fbbf24" />
      </g>
    </svg>
  );
}

/* ---------- 7. 인당 시가총액: 적은 인원 → 거대한 가치 ---------- */
export function PerCapitaBars({ className = "" }: P) {
  const data = [
    { label: "WhatsApp", people: "직원 55명", per: "≈ 4,500억", deal: "인수 약 25조", h: 178, c: "#0ea5e9" },
    { label: "Instagram", people: "직원 13명", per: "≈ 1,000억", deal: "인수 약 1.3조", h: 120, c: "#10b981" },
    { label: "Mojang", people: "직원 40명", per: "≈ 800억", deal: "인수 약 3.3조", h: 102, c: "#8b5cf6" },
  ];
  return (
    <svg viewBox="0 0 500 300" className={className} aria-hidden>
      <text x="26" y="22" fontSize="13" fontWeight="800" fill="#94a3b8">
        인당 시가총액 (1명이 만든 가치, 원)
      </text>
      <line x1="26" y1="236" x2="474" y2="236" stroke="#cbd5e1" strokeWidth={3} />
      {data.map((d, i) => {
        const x = 56 + i * 138;
        return (
          <g key={d.label}>
            <rect x={x} y={236 - d.h} width={96} height={d.h} rx={12} fill={d.c} opacity={0.92} />
            <text x={x + 48} y={236 - d.h - 26} textAnchor="middle" fontSize="11" fontWeight="800" fill="#94a3b8">
              인당
            </text>
            <text x={x + 48} y={236 - d.h - 8} textAnchor="middle" fontSize="18" fontWeight="900" fill={d.c}>
              {d.per}
            </text>
            <text x={x + 48} y={258} textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
              {d.label}
            </text>
            <text x={x + 48} y={276} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
              {d.people}
            </text>
            <text x={x + 48} y={292} textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">
              {d.deal}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- 8. 경쟁 대전환: VS 다이어그램 ---------- */
export function VersusDiagram({ className = "" }: P) {
  const Person = ({ x, c }: { x: number; c: string }) => (
    <g transform={`translate(${x} 0)`}>
      <circle cx="0" cy="0" r="18" fill={c} />
      <rect x="-16" y="22" width="32" height="30" rx="12" fill={c} />
    </g>
  );
  return (
    <svg viewBox="0 0 480 200" className={className} aria-hidden>
      {/* 왼쪽: AI 개인 */}
      <g transform="translate(96 60)">
        <Person x={0} c="#0ea5e9" />
        <g transform="translate(14 -34)">
          <rect x="0" y="0" width="30" height="24" rx="7" fill="#8b5cf6" />
          <circle cx="9" cy="12" r="3" fill="#fff" />
          <circle cx="21" cy="12" r="3" fill="#fff" />
        </g>
        <text x="0" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0369a1">
          AI 개인
        </text>
      </g>
      {/* VS */}
      <circle cx="240" cy="92" r="30" fill="#f43f5e" />
      <text x="240" y="100" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">
        VS
      </text>
      {/* 오른쪽: 법인(빌딩) */}
      <g transform="translate(356 36)">
        <rect x="-2" y="20" width="92" height="96" rx="8" fill="#94a3b8" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={8 + (i % 3) * 26} y={32 + Math.floor(i / 3) * 22} width="16" height="14" rx="3" fill="#e2e8f0" />
        ))}
        <text x="44" y="140" textAnchor="middle" fontSize="15" fontWeight="800" fill="#475569">
          법인
        </text>
      </g>
      {/* 베팅 화살표 */}
      <path d="M150 150 q90 26 150 -2" stroke="#f59e0b" strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray="2 8" />
      <path d="M146 142 l8 10 l-12 2 Z" fill="#f59e0b" />
    </svg>
  );
}

/* ---------- 9. 산업 아이콘 ---------- */
export function IndustryIcon({ type, className = "" }: P & { type: string }) {
  switch (type) {
    case "ad":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <rect x="10" y="18" width="60" height="44" rx="8" fill="#0ea5e9" />
          <rect x="18" y="26" width="44" height="28" rx="4" fill="#e0f2fe" />
          <path d="M34 32 L50 40 L34 48 Z" fill="#0284c7" />
          <circle cx="58" cy="16" r="7" fill="#fbbf24" />
        </svg>
      );
    case "law":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <rect x="38" y="16" width="4" height="48" fill="#475569" />
          <circle cx="40" cy="14" r="5" fill="#475569" />
          <line x1="18" y1="26" x2="62" y2="26" stroke="#475569" strokeWidth={4} strokeLinecap="round" />
          <path d="M10 26 L26 26 L18 44 Z" fill="#94a3b8" />
          <path d="M54 26 L70 26 L62 44 Z" fill="#94a3b8" />
          <rect x="30" y="62" width="20" height="6" rx="3" fill="#475569" />
        </svg>
      );
    case "broker":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <path d="M16 44 c-6 -8 4 -18 10 -10 l6 6" stroke="#0ea5e9" strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M64 36 c6 8 -4 18 -10 10 l-6 -6" stroke="#10b981" strokeWidth={7} fill="none" strokeLinecap="round" />
          <rect x="30" y="30" width="20" height="20" rx="5" fill="#fbbf24" transform="rotate(45 40 40)" />
        </svg>
      );
    case "logistics":
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden>
          <path d="M14 30 L40 18 L66 30 L40 42 Z" fill="#fbbf24" />
          <path d="M14 30 L40 42 L40 64 L14 52 Z" fill="#f59e0b" />
          <path d="M66 30 L40 42 L40 64 L66 52 Z" fill="#d97706" />
          <path d="M27 24 L53 36" stroke="#fff" strokeWidth={2} opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- 10. 검증 파이프라인 (AI 주입) ---------- */
export function VerifyPipeline({ className = "" }: P) {
  const stages = ["스펙", "TC 생성", "실행", "로그 분석", "리포트"];
  return (
    <svg viewBox="0 0 560 150" className={className} aria-hidden>
      <defs>
        <linearGradient id="vp-flow" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <line x1="40" y1="70" x2="520" y2="70" stroke="url(#vp-flow)" strokeWidth={6} strokeLinecap="round" />
      {stages.map((s, i) => {
        const x = 56 + i * 112;
        return (
          <g key={s}>
            <circle cx={x} cy="70" r="22" fill="#fff" stroke="#0ea5e9" strokeWidth={4} />
            <circle cx={x} cy="70" r="9" fill="#0ea5e9" opacity={0.25} />
            <text x={x} y="112" textAnchor="middle" fontSize="14" fontWeight="800" fill="#334155">
              {s}
            </text>
            {/* AI 스파크 주입 */}
            <g transform={`translate(${x + 10} 36)`}>
              <circle cx="0" cy="0" r="11" fill="#8b5cf6" />
              <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">
                AI
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- 11. 폭풍 속 우산 든 사람 ---------- */
export function UmbrellaPerson({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 300" className={className} aria-hidden>
      {/* 비구름 */}
      <path d="M70 70 a30 30 0 0 1 10 -56 a40 40 0 0 1 74 8 a26 26 0 0 1 -4 48 Z" fill="#cbd5e1" />
      <path d="M180 60 a22 22 0 0 1 8 -40 a30 30 0 0 1 56 6 a20 20 0 0 1 -3 36 Z" fill="#94a3b8" />
      {/* 빗줄기 */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={60 + i * 24} y1={86 + (i % 3) * 8} x2={54 + i * 24} y2={104 + (i % 3) * 8} stroke="#7dd3fc" strokeWidth={4} strokeLinecap="round" />
      ))}
      {/* 우산 */}
      <path d="M96 150 a64 64 0 0 1 128 0 Z" fill="#0ea5e9" />
      <path d="M96 150 a64 64 0 0 1 128 0" fill="none" stroke="#0284c7" strokeWidth={3} />
      {[120, 160, 200].map((x, i) => (
        <path key={i} d={`M${x} 150 q${i === 1 ? 0 : (x - 160) / 4} 8 ${0} 8`} fill="none" />
      ))}
      <line x1="160" y1="150" x2="160" y2="232" stroke="#475569" strokeWidth={6} strokeLinecap="round" />
      <path d="M160 232 q-12 2 -10 -10" stroke="#475569" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* 사람 */}
      <circle cx="160" cy="206" r="16" fill="#f59e0b" />
      <rect x="144" y="226" width="32" height="44" rx="14" fill="#fbbf24" />
    </svg>
  );
}

/* ---------- 12. 이력서 vs 증거(포트폴리오+AI) ---------- */
export function ResumeVsProof({ className = "" }: P) {
  return (
    <svg viewBox="0 0 460 240" className={className} aria-hidden>
      {/* 이력서 (흐릿/취소) */}
      <g transform="rotate(-6 110 120)" opacity="0.65">
        <rect x="60" y="40" width="110" height="150" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={3} />
        <circle cx="88" cy="70" r="12" fill="#cbd5e1" />
        {[96, 112, 128, 144, 160].map((y, i) => (
          <rect key={i} x="74" y={y} width={i === 0 ? 60 : 84} height="7" rx="3.5" fill="#e2e8f0" />
        ))}
        <line x1="56" y1="48" x2="176" y2="182" stroke="#fb7185" strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* 화살표 */}
      <path d="M188 120 H236" stroke="#94a3b8" strokeWidth={5} strokeLinecap="round" />
      <path d="M232 110 l14 10 l-14 10 Z" fill="#94a3b8" />
      {/* 증거: 빛나는 포트폴리오 + AI */}
      <g transform="rotate(5 350 116)">
        <rect x="268" y="36" width="120" height="158" rx="12" fill="#fff" stroke="#0ea5e9" strokeWidth={4} />
        <rect x="284" y="56" width="88" height="40" rx="8" fill="#e0f2fe" />
        <path d="M300 84 L316 70 L330 82 L350 62 L356 78" stroke="#0ea5e9" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {[112, 128, 144].map((y, i) => (
          <rect key={i} x="284" y={y} width={i === 2 ? 50 : 76} height="8" rx="4" fill="#bae6fd" />
        ))}
        <rect x="284" y="166" width="60" height="16" rx="8" fill="#fbbf24" />
      </g>
      <g transform="translate(360 40)">
        <circle cx="0" cy="0" r="18" fill="#8b5cf6" />
        <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">
          AI
        </text>
      </g>
      <Sparkles className="" />
    </svg>
  );
}

/* ---------- 13. 로드맵: 주/월/분기 ---------- */
export function Roadmap({ className = "" }: P) {
  const steps = [
    { t: "이번 주", c: "#0ea5e9", icon: "🗓️" },
    { t: "한 달", c: "#10b981", icon: "🛠️" },
    { t: "이번 분기", c: "#f59e0b", icon: "🎯" },
  ];
  return (
    <svg viewBox="0 0 480 160" className={className} aria-hidden>
      <path d="M40 110 H440" stroke="#e2e8f0" strokeWidth={8} strokeLinecap="round" />
      <path d="M40 110 H440" stroke="#7dd3fc" strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
      {steps.map((s, i) => {
        const x = 80 + i * 160;
        return (
          <g key={s.t}>
            <line x1={x} y1="110" x2={x} y2="74" stroke={s.c} strokeWidth={4} />
            <circle cx={x} cy="110" r="12" fill={s.c} />
            <circle cx={x} cy="110" r="5" fill="#fff" />
            <text x={x} y="60" textAnchor="middle" fontSize="26">
              {s.icon}
            </text>
            <text x={x} y="140" textAnchor="middle" fontSize="16" fontWeight="800" fill="#334155">
              {s.t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- 14. 무지개 장면 ---------- */
export function RainbowScene({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden>
      {[
        ["#fb7185", 120],
        ["#fbbf24", 104],
        ["#34d399", 88],
        ["#38bdf8", 72],
        ["#a78bfa", 56],
      ].map(([c, r], i) => (
        <path key={i} d={`M${160 - (r as number)} 170 a${r} ${r} 0 0 1 ${(r as number) * 2} 0`} stroke={c as string} strokeWidth={13} fill="none" strokeLinecap="round" />
      ))}
      <circle cx="60" cy="120" r="40" fill="#fbbf24" opacity="0.9" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i * Math.PI) / 5;
        return <line key={i} x1={r(60 + Math.cos(a) * 46)} y1={r(120 + Math.sin(a) * 46)} x2={r(60 + Math.cos(a) * 58)} y2={r(120 + Math.sin(a) * 58)} stroke="#fbbf24" strokeWidth={5} strokeLinecap="round" />;
      })}
      <path d="M40 174 a22 22 0 0 1 6 -42 a30 30 0 0 1 56 6 a18 18 0 0 1 -3 34 Z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/* ---------- 15. 출처: 재생 + 책 ---------- */
export function SourcesArt({ className = "" }: P) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <rect x="10" y="20" width="100" height="64" rx="12" fill="#0ea5e9" />
      <path d="M48 38 L72 52 L48 66 Z" fill="#fff" />
      <g transform="translate(118 24)">
        <rect x="0" y="0" width="64" height="76" rx="8" fill="#fbbf24" />
        <rect x="0" y="0" width="14" height="76" rx="4" fill="#f59e0b" />
        <rect x="26" y="16" width="30" height="6" rx="3" fill="#fff" opacity="0.9" />
        <rect x="26" y="28" width="22" height="6" rx="3" fill="#fff" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ---------- 축복 vs 재앙: 갈림길 ---------- */
export function BlessingOrDisaster({ className = "" }: P) {
  return (
    <svg viewBox="0 0 460 240" className={className} aria-hidden>
      {/* 축복: 맑음 */}
      <rect x="8" y="20" width="200" height="200" rx="20" fill="#e0f2fe" />
      <circle cx="62" cy="78" r="24" fill="#fbbf24" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return <line key={i} x1={r(62 + Math.cos(a) * 30)} y1={r(78 + Math.sin(a) * 30)} x2={r(62 + Math.cos(a) * 38)} y2={r(78 + Math.sin(a) * 38)} stroke="#fbbf24" strokeWidth={4} strokeLinecap="round" />;
      })}
      {[
        ["#fb7185", 46],
        ["#fbbf24", 38],
        ["#34d399", 30],
      ].map(([c, rr], i) => (
        <path key={i} d={`M${150 - (rr as number)} 150 a${rr} ${rr} 0 0 1 ${(rr as number) * 2} 0`} stroke={c as string} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      <text x="108" y="206" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0284c7">축복</text>
      {/* 재앙: 폭풍 */}
      <rect x="252" y="20" width="200" height="200" rx="20" fill="#e2e8f0" />
      <path d="M300 72 a18 18 0 0 1 6 -34 a24 24 0 0 1 46 5 a16 16 0 0 1 -3 29 Z" fill="#94a3b8" />
      <path d="M346 80 L333 102 H347 L339 126 L363 94 H350 L357 80 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} strokeLinejoin="round" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1={300 + i * 16} y1={106 + (i % 2) * 6} x2={296 + i * 16} y2={120 + (i % 2) * 6} stroke="#7dd3fc" strokeWidth={3} strokeLinecap="round" />
      ))}
      <text x="352" y="206" textAnchor="middle" fontSize="18" fontWeight="900" fill="#64748b">재앙</text>
      {/* 가운데 사람 + 갈림 화살표 */}
      <path d="M214 150 q-28 -4 -52 -28" stroke="#0284c7" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      <path d="M246 150 q28 -4 52 -28" stroke="#94a3b8" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      <circle cx="230" cy="150" r="16" fill="#0ea5e9" />
      <rect x="214" y="170" width="32" height="34" rx="13" fill="#0ea5e9" />
    </svg>
  );
}

/* ---------- 사무실에 갇힌 사람 + 열린 문(기회) ---------- */
export function StuckAtDesk({ className = "" }: P) {
  return (
    <svg viewBox="0 0 320 210" className={className} aria-hidden>
      {/* 사무실 박스 */}
      <rect x="18" y="26" width="196" height="160" rx="16" fill="#eef2f6" stroke="#cbd5e1" strokeWidth={3} />
      {/* 야근 시계 */}
      <circle cx="58" cy="58" r="13" fill="#fff" stroke="#94a3b8" strokeWidth={3} />
      <line x1="58" y1="58" x2="58" y2="50" stroke="#475569" strokeWidth={2.5} strokeLinecap="round" />
      <line x1="58" y1="58" x2="64" y2="58" stroke="#475569" strokeWidth={2.5} strokeLinecap="round" />
      {/* 책상 + 사람 */}
      <circle cx="116" cy="112" r="19" fill="#0ea5e9" />
      <rect x="96" y="133" width="40" height="26" rx="10" fill="#0ea5e9" />
      <rect x="70" y="156" width="118" height="12" rx="4" fill="#94a3b8" />
      <rect x="100" y="140" width="32" height="17" rx="3" fill="#334155" />
      {/* 열린 문 (기회) */}
      <rect x="236" y="54" width="66" height="132" rx="8" fill="#fde68a" stroke="#fbbf24" strokeWidth={3} />
      <circle cx="290" cy="124" r="4" fill="#f59e0b" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={246} y1={r(86 + i * 22)} x2={224} y2={r(80 + i * 22)} stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ---------- 경량문명의 등장 흐름 (중량 → ChatGPT → 경량) ---------- */
export function LightCivFlow({ className = "" }: P) {
  return (
    <svg viewBox="0 0 580 190" className={className} aria-hidden>
      {/* 중량문명: 공장 */}
      <rect x="10" y="38" width="156" height="116" rx="16" fill="#e2e8f0" />
      <rect x="50" y="80" width="78" height="52" rx="6" fill="#94a3b8" />
      <rect x="62" y="60" width="15" height="24" fill="#64748b" />
      <rect x="88" y="48" width="15" height="36" fill="#64748b" />
      <circle cx="72" cy="54" r="6" fill="#cbd5e1" />
      <circle cx="98" cy="40" r="7" fill="#cbd5e1" />
      <text x="88" y="146" textAnchor="middle" fontSize="15" fontWeight="900" fill="#475569">중량문명</text>
      {/* 화살표 1 */}
      <line x1="176" y1="96" x2="232" y2="96" stroke="#0ea5e9" strokeWidth={5} strokeLinecap="round" />
      <path d="M228 87 l14 9 l-14 9 Z" fill="#0ea5e9" />
      {/* 트리거: 번개 + 날짜 */}
      <g transform="translate(256 56)">
        <path d="M30 0 L14 42 H31 L21 78 L54 30 H35 L47 0 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} strokeLinejoin="round" />
      </g>
      <text x="288" y="150" textAnchor="middle" fontSize="12" fontWeight="900" fill="#f59e0b">2022.11.30</text>
      <text x="288" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8">지능의 범용화</text>
      {/* 화살표 2 */}
      <line x1="348" y1="96" x2="404" y2="96" stroke="#0ea5e9" strokeWidth={5} strokeLinecap="round" />
      <path d="M400 87 l14 9 l-14 9 Z" fill="#0ea5e9" />
      {/* 경량문명: 개인 + AI */}
      <rect x="414" y="38" width="156" height="116" rx="16" fill="#e0f2fe" />
      <circle cx="470" cy="86" r="17" fill="#0ea5e9" />
      <rect x="455" y="107" width="30" height="26" rx="11" fill="#0ea5e9" />
      <g transform="translate(500 70)">
        <rect width="32" height="25" rx="7" fill="#8b5cf6" />
        <circle cx="10" cy="12" r="3.2" fill="#fff" />
        <circle cx="22" cy="12" r="3.2" fill="#fff" />
      </g>
      <text x="492" y="146" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0369a1">경량문명</text>
    </svg>
  );
}

/* ---------- 부장 → 차장 → 대리 (오버헤드) vs 1인 + AI ---------- */
export function OrgRelay({ className = "" }: P) {
  const fig = (x: number, name: string) => (
    <g key={name} transform={`translate(${x} 52)`}>
      <circle cx="0" cy="0" r="15" fill="#94a3b8" />
      <rect x="-14" y="20" width="28" height="26" rx="11" fill="#94a3b8" />
      <text x="0" y="64" textAnchor="middle" fontSize="14" fontWeight="900" fill="#475569">{name}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 580 215" className={className} aria-hidden>
      {/* 보고: 역방향 긴 곡선 */}
      <path d="M428 40 q-140 -46 -312 0" stroke="#fb7185" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      <path d="M124 30 l-13 9 l3 -15 Z" fill="#fb7185" />
      <text x="272" y="8" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fb7185">↩ 보고 · 결재</text>
      {/* 전방 화살표 */}
      <g stroke="#cbd5e1" strokeWidth={4} strokeLinecap="round">
        <line x1="140" y1="52" x2="246" y2="52" />
        <line x1="300" y1="52" x2="406" y2="52" />
      </g>
      <text x="193" y="44" textAnchor="middle" fontSize="12" fontWeight="800" fill="#94a3b8">지시</text>
      <text x="353" y="44" textAnchor="middle" fontSize="12" fontWeight="800" fill="#94a3b8">배분</text>
      {fig(116, "부장")}
      {fig(272, "차장")}
      {fig(428, "대리")}
      <text x="500" y="56" fontSize="13" fontWeight="900" fill="#fb7185">= 오버헤드</text>
      {/* 구분선 */}
      <line x1="40" y1="140" x2="540" y2="140" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="4 6" />
      {/* 1인 + AI */}
      <g transform="translate(206 158)">
        <circle cx="0" cy="0" r="16" fill="#0ea5e9" />
        <rect x="-15" y="21" width="30" height="28" rx="12" fill="#0ea5e9" />
        <g transform="translate(20 -15)">
          <rect width="30" height="23" rx="7" fill="#8b5cf6" />
          <circle cx="9" cy="11" r="3" fill="#fff" />
          <circle cx="21" cy="11" r="3" fill="#fff" />
        </g>
      </g>
      <text x="292" y="186" fontSize="16" fontWeight="900" fill="#0369a1">1인 + AI = 통째로 완결</text>
    </svg>
  );
}

/* ---------- 거대 조직의 몰락 vs 작고 빠른 부상 (大馬必死) ---------- */
export function GiantFalls({ className = "" }: P) {
  return (
    <svg viewBox="0 0 460 220" className={className} aria-hidden>
      <line x1="20" y1="184" x2="440" y2="184" stroke="#cbd5e1" strokeWidth={3} />
      {/* 거대 조직: 기울어 균열 가는 빌딩 */}
      <g transform="rotate(-11 150 150)">
        <rect x="86" y="58" width="128" height="126" rx="6" fill="#94a3b8" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={100 + (i % 3) * 36} y={72 + Math.floor(i / 3) * 28} width="22" height="18" rx="3" fill="#cbd5e1" />
        ))}
        <path d="M150 58 L139 98 L159 122 L145 162" stroke="#475569" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="150" y="208" textAnchor="middle" fontSize="14" fontWeight="900" fill="#64748b">거대 ▼</text>
      {/* 작고 빠른: 로켓 상승 */}
      <g transform="translate(326 56)">
        <path d="M28 0 C45 15 45 46 28 66 C11 46 11 15 28 0 Z" fill="#0ea5e9" />
        <circle cx="28" cy="26" r="8" fill="#e0f2fe" />
        <path d="M14 58 L8 78 L24 66 Z" fill="#fbbf24" />
        <path d="M42 58 L48 78 L32 66 Z" fill="#fbbf24" />
        <path d="M24 66 L28 90 L32 66 Z" fill="#f59e0b" />
      </g>
      <text x="354" y="208" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0284c7">작고 빠르게 ▲</text>
    </svg>
  );
}

/* ---------- 단속적 협력: 만나고 → 흩어지고 → 다시 만난다 ---------- */
export function Cluster({ className = "" }: P) {
  const dot = (x: number, y: number, c: string) => <circle cx={x} cy={y} r="9" fill={c} />;
  return (
    <svg viewBox="0 0 500 170" className={className} aria-hidden>
      {/* 만나고 */}
      <rect x="40" y="62" width="62" height="46" rx="10" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth={2} />
      <text x="71" y="90" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0369a1">프로젝트</text>
      {dot(47, 46, "#0ea5e9")}
      {dot(95, 46, "#0ea5e9")}
      {dot(47, 124, "#0ea5e9")}
      {dot(95, 124, "#0ea5e9")}
      <text x="71" y="152" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">만나고</text>
      <path d="M120 85 H164" stroke="#94a3b8" strokeWidth={3} strokeLinecap="round" strokeDasharray="2 6" />
      {/* 흩어지고 */}
      {dot(196, 52, "#cbd5e1")}
      {dot(258, 42, "#cbd5e1")}
      {dot(224, 122, "#cbd5e1")}
      {dot(280, 110, "#cbd5e1")}
      <text x="238" y="152" textAnchor="middle" fontSize="13" fontWeight="900" fill="#94a3b8">흩어지고</text>
      <path d="M312 85 H356" stroke="#94a3b8" strokeWidth={3} strokeLinecap="round" strokeDasharray="2 6" />
      {/* 다시 만난다 */}
      <rect x="392" y="62" width="68" height="46" rx="10" fill="#fef3c7" stroke="#fbbf24" strokeWidth={2} />
      <text x="426" y="90" textAnchor="middle" fontSize="11" fontWeight="800" fill="#b45309">새 프로젝트</text>
      {dot(398, 46, "#f59e0b")}
      {dot(454, 46, "#f59e0b")}
      {dot(398, 124, "#f59e0b")}
      {dot(454, 124, "#f59e0b")}
      <text x="426" y="152" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">다시 만난다</text>
    </svg>
  );
}
