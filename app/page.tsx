import Link from "next/link";

const contents = [
  {
    href: "/talk",
    icon: "⛅",
    kicker: "PRESENTATION · 15분",
    title: "시대예보",
    subtitle: "직장도 직업도 없어질 때,\n꼭 남겨야 하는 것",
    description:
      "송길영 『시대예보: 경량문명의 탄생』 기반 발표 웹앱. AI 전선이 바꾸는 ‘일’의 미래를 일기예보 컨셉으로 풀어냅니다.",
    chips: ["OKR Party 세미나", "17장 슬라이드", "발표자 노트 · 타이머"],
    gradient: "from-sky-400 via-sky-300 to-amber-200",
    ring: "hover:ring-sky-400/60",
  },
  {
    href: "/gangneung",
    icon: "🌊",
    kicker: "TRAVEL GUIDE · 2박 3일",
    title: "강릉 가족여행",
    subtitle: "여름의 마지막 주말,\n라카이샌드파인 & 바다",
    description:
      "2026년 8월 말 우리 네 식구 강릉 여행 가이드. 일정 타임라인, 동선 지도·예산 플래너, 맛집 선택지까지 한 페이지에.",
    chips: ["8/28 – 8/30", "동선 · 예산 플래너", "맛집 & 제철 회"],
    gradient: "from-cyan-600 via-teal-400 to-orange-200",
    ring: "hover:ring-teal-400/60",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-slate-50 to-amber-50 px-6 py-14">
      <header className="mb-10 text-center">
        <p className="text-sm font-extrabold tracking-[0.2em] text-sky-500">
          CONTENTS
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-800 md:text-4xl">
          무엇을 보시겠어요?
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-500 md:text-base">
          보고 싶은 컨텐츠를 선택하세요.
        </p>
      </header>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {contents.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-2 ${c.ring}`}
          >
            <div
              className={`relative flex h-40 items-end bg-gradient-to-br ${c.gradient} px-6 pb-4`}
            >
              <span className="absolute right-5 top-5 text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                {c.icon}
              </span>
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-white/85">
                  {c.kicker}
                </p>
                <h2 className="mt-1 text-2xl font-black text-white drop-shadow-sm">
                  {c.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-6 py-5">
              <p className="whitespace-pre-line text-lg font-extrabold leading-snug tracking-tight text-slate-800">
                {c.subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                {c.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-sky-600 transition group-hover:gap-2">
                들어가기 <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-xs font-medium text-slate-400">
        ⛅ 시대예보 발표 · 🌊 강릉 여행 가이드
      </footer>
    </main>
  );
}
