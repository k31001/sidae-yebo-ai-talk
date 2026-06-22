import React from "react";

/* =========================================================================
 *  발표 메타 정보 — 여기만 고치면 표지/마무리에 반영됩니다.
 * ========================================================================= */
export const META = {
  brand: "시대예보",
  brandHanja: "時代豫報",
  title: "취업 안 되는 시대,\n이력서보다 중요한 한 가지",
  subtitle: "AI 전선이 바꾸는 ‘일’의 미래",
  event: "OKR Party 세미나",
  team: "SSD Controller 검증팀",
  presenter: "발표자",
  date: "2026",
  oneLiner: "AI를 빠르게 받아들여라.",
  source: "송길영 『시대예보: 경량문명의 탄생』 · 인생질문 307회",
  videoUrl: "https://youtu.be/lVVPmhJjCjA",
};

export type SlideDef = {
  id: string;
  bg: string; // 슬라이드 배경 그라데이션 (tailwind)
  weather: { icon: string; label: string }; // 우상단 ‘예보’ 칩
  pace: string; // 페이싱 가이드 (분:초)
  notes: string; // 발표자 노트
  Content: React.FC;
};

/* ============================== 공용 UI ================================= */

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${className}`}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-white/75 shadow-xl shadow-sky-900/5 ring-1 ring-slate-900/5 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function Kicker({
  no,
  icon,
  children,
}: {
  no?: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-2xl md:text-3xl">{icon}</span>
      {no && (
        <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-extrabold tracking-wide text-sky-700">
          {no}
        </span>
      )}
      <span className="text-base font-bold text-slate-500 md:text-lg">
        {children}
      </span>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(1.8rem,4.6vw,3.4rem)] font-extrabold leading-[1.12] tracking-tight text-slate-900">
      {children}
    </h2>
  );
}

/* ============================== 슬라이드 ================================ */

export const slides: SlideDef[] = [
  /* 1 — 표지 ----------------------------------------------------------- */
  {
    id: "cover",
    bg: "from-sky-300 via-sky-200 to-amber-100",
    weather: { icon: "☀️", label: "맑음 · 특보" },
    pace: "0:30",
    notes:
      "인사. ‘오늘 15분, AI 시대를 일기예보처럼 같이 읽어봅니다.’ 이 발표의 결론을 먼저 던지세요 — “AI를 빠르게 받아들이자.” 키 안내: → / Space 다음, N 노트, T 타이머, ? 도움말.",
    Content: () => (
      <div className="relative w-full max-w-5xl">
        <div className="pointer-events-none absolute -right-6 -top-24 h-44 w-44 animate-float-slow rounded-full bg-gradient-to-br from-amber-300 to-amber-400 opacity-80 blur-[2px] md:h-56 md:w-56" />
        <div className="relative">
          <div className="mb-7 flex items-center gap-3">
            <span className="text-4xl">⛅</span>
            <div className="leading-tight">
              <div className="text-2xl font-black tracking-tight text-slate-900">
                {META.brand}{" "}
                <span className="text-slate-400">{META.brandHanja}</span>
              </div>
              <div className="text-sm font-semibold text-sky-700">
                AI 전선 특보
              </div>
            </div>
          </div>

          <h1 className="whitespace-pre-line text-[clamp(2.2rem,6.4vw,5rem)] font-black leading-[1.08] tracking-tight text-slate-900">
            {META.title}
          </h1>

          <p className="mt-5 text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold text-slate-600">
            {META.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-2 text-sm font-bold">
            <Pill className="bg-sky-500/15 text-sky-800">{META.event}</Pill>
            <Pill className="bg-amber-500/15 text-amber-800">{META.team}</Pill>
            <Pill className="bg-white/70 text-slate-600 ring-1 ring-slate-900/5">
              {META.presenter} · {META.date}
            </Pill>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            <kbd className="rounded bg-white/80 px-1.5 py-0.5 font-mono ring-1 ring-slate-900/10">
              →
            </kbd>{" "}
            또는{" "}
            <kbd className="rounded bg-white/80 px-1.5 py-0.5 font-mono ring-1 ring-slate-900/10">
              Space
            </kbd>{" "}
            로 시작 · <b>N</b> 발표자 노트 · <b>?</b> 도움말
          </p>
        </div>
      </div>
    ),
  },

  /* 2 — 오늘의 예보 (Agenda) ------------------------------------------ */
  {
    id: "agenda",
    bg: "from-sky-100 via-white to-sky-50",
    weather: { icon: "🗓️", label: "주간예보" },
    pace: "0:45",
    notes:
      "오늘의 흐름을 ‘주간예보’처럼 5칸으로 보여줍니다. 길게 설명하지 말고 ‘이 순서로 갑니다’ 정도만. 마지막 칸(우리는?)에서 청중이 자기 일로 가져가게 될 거라고 예고.",
    Content: () => {
      const items = [
        { icon: "🌀", k: "01", t: "변곡점", s: "2022.11.30" },
        { icon: "🌡️", k: "02", t: "문명 교체", s: "중량 → 경량" },
        { icon: "🌤️", k: "03", t: "두 가지 변화", s: "지능·조직" },
        { icon: "🌪️", k: "04", t: "경쟁 대전환", s: "개인 vs 법인" },
        { icon: "🧭", k: "05", t: "우리는?", s: "검증팀의 선택" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="📡" no="오늘의 예보">
            15분간의 시대 날씨
          </Kicker>
          <Title>오늘, 이 순서로 읽습니다</Title>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {items.map((it) => (
              <Card key={it.k} className="p-5 text-center">
                <div className="text-3xl md:text-4xl">{it.icon}</div>
                <div className="mt-3 text-xs font-extrabold tracking-widest text-sky-600">
                  {it.k}
                </div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">
                  {it.t}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-500">
                  {it.s}
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    },
  },

  /* 3 — 충격 질문 (Hook) ---------------------------------------------- */
  {
    id: "hook",
    bg: "from-amber-100 via-rose-50 to-sky-100",
    weather: { icon: "⚡", label: "돌풍주의보" },
    pace: "1:00",
    notes:
      "도발적으로 시작. 천천히 또박또박 읽으세요. 1초 정적. ‘불편한 질문이지만, 이게 지금 시대가 우리에게 던지는 질문’이라고 연결. 청중(검증 엔지니어)에게 ‘남 얘기 같죠? 끝까지 들어보세요.’",
    Content: () => (
      <div className="w-full max-w-5xl">
        <Kicker icon="🎙️" no="HOOK">
          송길영, 강연 오프닝
        </Kicker>
        <blockquote className="relative">
          <span className="absolute -left-2 -top-10 text-8xl font-black text-amber-300/70 select-none">
            “
          </span>
          <p className="text-[clamp(1.7rem,4.4vw,3.2rem)] font-extrabold leading-[1.28] tracking-tight text-slate-900">
            여러분, <span className="text-amber-600">뭐라도 좀 하세요.</span>
            <br />
            지금까지는 취직해서 돈을 벌었지만,
            <br />
            지금은 <span className="text-sky-600">차리면 되는데</span> 왜 아직도
            조직에 있습니까?
          </p>
        </blockquote>
        <p className="mt-8 text-lg font-bold text-slate-500">— 송길영, 마인드 마이너</p>
      </div>
    ),
  },

  /* 4 — 변곡점 2022.11.30 --------------------------------------------- */
  {
    id: "turning-point",
    bg: "from-sky-200 via-indigo-100 to-sky-100",
    weather: { icon: "🌀", label: "전선 통과" },
    pace: "1:00",
    notes:
      "ChatGPT 공개일. ‘날씨로 치면 전선이 통과한 날 — 그 전과 후로 공기가 바뀝니다.’ 핵심: 되돌릴 수 없는 변화이고, 출발선은 모두에게 ‘지금’이라 오히려 공평하다.",
    Content: () => (
      <div className="w-full max-w-5xl">
        <Kicker icon="📅" no="01">
          변곡점
        </Kicker>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <div className="text-[clamp(3rem,9vw,7rem)] font-black leading-none tracking-tight text-slate-900">
            2022.<span className="text-sky-600">11.30</span>
          </div>
          <div className="pb-2 text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold text-slate-700">
            ChatGPT 등장 — <br className="hidden md:block" />
            문명의 기압골이 바뀐 날
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Card className="p-5">
            <div className="text-sm font-extrabold text-slate-400">BEFORE</div>
            <div className="mt-1 text-xl font-bold text-slate-700">
              사람이 지능을 ‘공급’하던 시대
            </div>
          </Card>
          <div className="text-center text-3xl">→</div>
          <Card className="p-5 ring-2 ring-sky-300">
            <div className="text-sm font-extrabold text-sky-500">AFTER</div>
            <div className="mt-1 text-xl font-bold text-slate-900">
              지능을 ‘구독’하는 시대
            </div>
          </Card>
        </div>

        <p className="mt-8 text-[clamp(1.1rem,2.2vw,1.6rem)] font-extrabold text-slate-800">
          🏁 출발선은 모두에게 공평하게 — <span className="text-amber-600">바로 지금.</span>
        </p>
      </div>
    ),
  },

  /* 5 — 중량 vs 경량 문명 --------------------------------------------- */
  {
    id: "civilization",
    bg: "from-slate-100 via-white to-sky-100",
    weather: { icon: "🌡️", label: "기단 교체" },
    pace: "1:30",
    notes:
      "오늘의 핵심 프레임. 중량문명(토지·설비·규모)에서 경량문명(AI·데이터·속도)으로. 경량문명의 정의 한 줄을 또박또박: ‘개인이 AI로 무장하면 큰 조직과 경쟁할 수 있다.’ 중간 단계(지시·보고·협의)가 사라진다는 점을 강조.",
    Content: () => (
      <div className="w-full max-w-6xl">
        <Kicker icon="🌬️" no="02">
          문명의 교체
        </Kicker>
        <Title>
          중량문명 <span className="text-slate-400">→</span>{" "}
          <span className="text-sky-600">경량문명</span>
        </Title>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏭</span>
              <div>
                <div className="text-xl font-extrabold text-slate-800">
                  중량문명
                </div>
                <div className="text-sm font-bold text-slate-400">
                  Heavyweight
                </div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-lg font-semibold text-slate-600">
              <li>· 토지 · 원자재 · 제조설비</li>
              <li>· 규모가 곧 경쟁력</li>
              <li>· 지시 · 배분 · 협의 · 보고</li>
              <li className="text-rose-500">· 성장 동력 상실</li>
            </ul>
          </Card>

          <Card className="border-sky-200 p-6 ring-2 ring-sky-300">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🪶</span>
              <div>
                <div className="text-xl font-extrabold text-sky-700">
                  경량문명
                </div>
                <div className="text-sm font-bold text-sky-400">Lightweight</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-lg font-semibold text-slate-700">
              <li>· AI · 데이터 · 프로토콜</li>
              <li>· 속도 · 밀도가 경쟁력</li>
              <li>· 중간 단계 제거, 각자 일을 완결</li>
              <li className="text-sky-600">· 개인이 조직과 겨룬다</li>
            </ul>
          </Card>
        </div>

        <p className="mt-7 text-[clamp(1.05rem,2.1vw,1.5rem)] font-extrabold text-slate-800">
          💬 “개인이 AI로 무장하면 큰 조직과 경쟁할 수 있다 — 이게 경량문명.”
        </p>
      </div>
    ),
  },

  /* 6 — 변화① 지능의 범용화 ------------------------------------------- */
  {
    id: "intelligence",
    bg: "from-violet-100 via-sky-50 to-sky-100",
    weather: { icon: "🌤️", label: "지능 고기압" },
    pace: "1:20",
    notes:
      "첫 번째 변화. ‘지능이 흔해졌다.’ 작년 AI IQ 100 미만 → 올해 140 수준. 퇴근·점심·휴식 없고, 눈치·감정 부담도 없음. 개인이 월 2만~26만원(₩)으로 똑똑한 조수를 고용하기 시작. 검증팀 비유: ‘24시간 안 자는 주니어 엔지니어가 월 몇 만원.’",
    Content: () => (
      <div className="w-full max-w-6xl">
        <Kicker icon="🧠" no="변화 ①">
          지능의 범용화
        </Kicker>
        <Title>똑똑함이, 흔해졌다</Title>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="text-sm font-extrabold text-slate-400">AI의 IQ</div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-black text-slate-300 line-through decoration-2">
                100
              </span>
              <span className="text-2xl">→</span>
              <span className="text-6xl font-black text-violet-600">140</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-500">
              1년 만의 점프
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-4xl">🌙</div>
            <div className="mt-3 text-xl font-extrabold text-slate-800">
              퇴근 · 점심 · 휴식 없음
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-500">
              눈치도, 감정 노동도 0
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-4xl">💳</div>
            <div className="mt-3 text-xl font-extrabold text-slate-800">
              월 $20 → $200
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-500">
              개인이 지능을 ‘구독’하기 시작
            </div>
          </Card>
        </div>

        <p className="mt-7 text-[clamp(1.05rem,2.1vw,1.5rem)] font-extrabold text-slate-800">
          🛠️ 24시간 안 자는 주니어 한 명을, 월 몇 만 원에 고용하는 셈.
        </p>
      </div>
    ),
  },

  /* 7 — 변화② 조직 규모의 균형화 (인당 시총) -------------------------- */
  {
    id: "per-capita",
    bg: "from-emerald-100 via-sky-50 to-sky-100",
    weather: { icon: "📈", label: "고기압 확장" },
    pace: "1:20",
    notes:
      "두 번째 변화. 과거엔 규모·매출이 경쟁력이었지만, 지금은 인원이 적을수록 높은 평가 — ‘인당 시가총액’. 텔레그램 30명, 미드저니 40명, 커서 20명, 1인 기업이 매출 50억에 1000억 매각. 결론: ‘조직이 생산의 전제였던 시대는 끝났다.’",
    Content: () => {
      const stats = [
        { c: "텔레그램", n: "30명", e: "💬" },
        { c: "미드저니", n: "40명", e: "🎨" },
        { c: "커서 AI", n: "20명", e: "🖱️" },
        { c: "1인 기업", n: "50억 매출 · 1000억 매각", e: "🧍" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="⚖️" no="변화 ②">
            조직 규모의 균형화
          </Kicker>
          <Title>
            이제는 <span className="text-emerald-600">인당 시가총액</span>
          </Title>
          <p className="mt-3 text-lg font-semibold text-slate-500">
            클수록 강한 게 아니라, <b>작고 밀도 높을수록</b> 비싸다.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((s) => (
              <Card key={s.c} className="p-5">
                <div className="text-3xl">{s.e}</div>
                <div className="mt-3 text-base font-bold text-slate-500">
                  {s.c}
                </div>
                <div className="mt-1 text-xl font-black leading-tight text-emerald-700">
                  {s.n}
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-7 text-[clamp(1.05rem,2.1vw,1.5rem)] font-extrabold text-slate-800">
            💬 “조직이 생산의 전제였던 시대는 끝났다.”
          </p>
        </div>
      );
    },
  },

  /* 8 — 경쟁의 대전환 -------------------------------------------------- */
  {
    id: "competition",
    bg: "from-rose-100 via-amber-50 to-sky-100",
    weather: { icon: "🌪️", label: "경쟁 난기류" },
    pace: "1:20",
    notes:
      "경쟁 상대가 바뀐다. 과거: 법인 vs 법인, 개인 vs 개인. 지금: ‘AI 쓰는 개인 vs 못 쓰는 개인.’ 그리고 AI로 무장한 개인이 법인의 몫을 가져온다. 핵심 한 마디: ‘개인 vs 법인이 붙으면 개인에게 건다 — 오버헤드 때문.’ 잠깐 멈춰서 청중이 곱씹게.",
    Content: () => (
      <div className="w-full max-w-6xl">
        <Kicker icon="🥊" no="03">
          경쟁의 대전환
        </Kicker>
        <Title>누구와 싸우는지가, 바뀌었다</Title>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-sm font-extrabold text-slate-400">과거</div>
            <div className="mt-3 space-y-2 text-xl font-bold text-slate-600">
              <div>법인 🏢 vs 🏢 법인</div>
              <div>개인 🧍 vs 🧍 개인</div>
            </div>
          </Card>
          <Card className="p-6 ring-2 ring-rose-300">
            <div className="text-sm font-extrabold text-rose-500">지금</div>
            <div className="mt-3 space-y-2 text-xl font-extrabold text-slate-900">
              <div>
                AI 쓰는 개인 🤖 <span className="text-rose-500">vs</span> 못 쓰는
                개인 🧍
              </div>
              <div>
                AI 개인 🤖 <span className="text-rose-500">vs</span> 법인 🏢
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-5 bg-gradient-to-r from-amber-100 to-rose-100 p-6 ring-1 ring-amber-200">
          <p className="text-[clamp(1.15rem,2.4vw,1.8rem)] font-black text-slate-900">
            🎲 “개인과 법인이 붙으면? <span className="text-rose-600">개인에게 건다.</span>{" "}
            <span className="text-slate-500">— 오버헤드 때문.”</span>
          </p>
        </Card>
      </div>
    ),
  },

  /* 9 — 현장 목격담 --------------------------------------------------- */
  {
    id: "field",
    bg: "from-sky-100 via-white to-amber-50",
    weather: { icon: "🗺️", label: "전국 날씨" },
    pace: "1:50",
    notes:
      "추상론을 현실로. 4개 산업에서 ‘이미’ 벌어지는 일. 광고(촬영 없이 AI로), 법률(작은 로펌 인턴에 SKY 50명, 패럴리걸·어소시에이트 소멸), 중개(8분 만에 앱, 24시간 다국어 무료 상담 → 브랜드 직거래), 물류(쿠팡 채용 ‘소통 담당’ → ‘자동화 담당’). 빠르게 4개 짚고 ‘전 산업 동시다발’ 강조.",
    Content: () => {
      const cases = [
        {
          e: "📺",
          t: "광고",
          w: "🌦️",
          d: "6월엔 1시간 촬영 → 9월엔 촬영 0, AI로만 제작. 메타는 광고주에게 AI 제작 도구를 직접 제공.",
        },
        {
          e: "⚖️",
          t: "법률",
          w: "⛈️",
          d: "작은 로펌 월 300만원 인턴에 SKY 출신 50명 지원. 패럴리걸·어소시에이트 자리가 사라진다.",
        },
        {
          e: "🤝",
          t: "중개",
          w: "🌪️",
          d: "OpenAI는 8분 만에 앱 시연. 24시간·200개국어·거의 무료 AI 상담 → 브랜드 직거래로.",
        },
        {
          e: "📦",
          t: "물류",
          w: "🌧️",
          d: "쿠팡 채용 공고가 ‘3PL 프로세스 소통 담당’ → ‘물류 자동화 담당’으로 바뀌었다.",
        },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="📍" no="현장">
            전 산업, 동시다발
          </Kicker>
          <Title>이미 벌어지고 있는 일</Title>
          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {cases.map((c) => (
              <Card key={c.t} className="flex gap-4 p-5">
                <div className="text-4xl">{c.e}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-slate-900">
                      {c.t}
                    </span>
                    <span className="text-xl">{c.w}</span>
                  </div>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-slate-600">
                    {c.d}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    },
  },

  /* 10 — 우리 부서 (SSD Controller 검증) ⭐ ---------------------------- */
  {
    id: "our-team",
    bg: "from-amber-100 via-sky-100 to-white",
    weather: { icon: "📍", label: "우리 동네 예보" },
    pace: "1:40",
    notes:
      "오늘의 핵심 브릿지 — 우리 일로 가져옵니다. 검증 업무는 반복·패턴·대량 로그·방대한 스펙이라 AI가 가장 잘 먹히는 영역. 5가지 적용 포인트를 우리 팀 언어로. 마지막 줄이 동기부여 펀치라인: ‘검증 엔지니어 vs AI 쓰는 검증 엔지니어 — 내년 평가의 격차는 여기서 갈린다.’ (※ 이 장은 영상 외, 우리 팀 적용)",
    Content: () => {
      const apps = [
        { e: "🧪", t: "테스트케이스 생성", d: "스펙→시퀀스·코너케이스 초안 자동 작성" },
        { e: "📚", t: "스펙 Q&A", d: "JEDEC·펌웨어 문서 요약·근거 검색" },
        { e: "🔍", t: "로그 1차 분석", d: "실패 로그·파형 분류와 의심 구간 추림" },
        { e: "🔁", t: "회귀·리포트 자동화", d: "스크립트·커버리지 리포트 초안화" },
        { e: "💡", t: "디버깅 가설", d: "재현·원인 가설 브레인스토밍 파트너" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="🧭" no="04">
            그래서, 우리 검증팀은?
          </Kicker>
          <Title>
            검증은 AI가 <span className="text-amber-600">가장 잘 먹히는</span> 일
          </Title>
          <p className="mt-3 text-lg font-semibold text-slate-500">
            반복 · 패턴 · 대량 로그 · 방대한 스펙 — 전부 AI의 홈그라운드.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {apps.map((a) => (
              <Card key={a.t} className="p-5">
                <div className="text-3xl">{a.e}</div>
                <div className="mt-2 text-lg font-extrabold text-slate-900">
                  {a.t}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-500">
                  {a.d}
                </div>
              </Card>
            ))}
            <Card className="flex items-center bg-gradient-to-br from-amber-200 to-sky-200 p-5 ring-1 ring-amber-300">
              <p className="text-lg font-black leading-snug text-slate-900">
                검증 엔지니어 vs<br />
                <span className="text-amber-700">AI 쓰는</span> 검증 엔지니어
              </p>
            </Card>
          </div>
        </div>
      );
    },
  },

  /* 11 — 버티지 마세요 ------------------------------------------------- */
  {
    id: "warning",
    bg: "from-slate-200 via-sky-100 to-sky-200",
    weather: { icon: "⛈️", label: "호우경보" },
    pace: "1:00",
    notes:
      "톤 전환. 두려움은 인정하되 ‘버티기(존버)’는 전략이 아니라고. 변화는 좋고 나쁨이 아니라 비·눈·바람처럼 그냥 온다 — 우산을 들지, 비를 맞을지가 선택. 다음 장에서 답을 줄 거라고 예고.",
    Content: () => (
      <div className="w-full max-w-5xl text-center">
        <div className="text-6xl">⛈️</div>
        <h2 className="mt-5 text-[clamp(2.4rem,7vw,5.5rem)] font-black tracking-tight text-slate-900">
          “버티지 마세요”
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-[clamp(1.1rem,2.4vw,1.7rem)] font-bold text-slate-600">
          새로운 도구를 <span className="text-sky-600">축복</span>으로 받아들일지,{" "}
          <span className="text-rose-500">재앙</span>으로 경험할지 — 지금이 갈림길.
        </p>
        <p className="mt-5 text-[clamp(1rem,2vw,1.4rem)] font-semibold text-slate-500">
          변화는 좋고 나쁜 게 아니라, 비·눈·바람처럼 그냥 옵니다. <br />
          <b className="text-slate-700">우산을 들지, 비를 맞을지</b>가 선택일 뿐.
        </p>
      </div>
    ),
  },

  /* 12 — 이력서보다 중요한 한 가지 (제목 회수) ------------------------ */
  {
    id: "answer",
    bg: "from-amber-200 via-sky-100 to-sky-200",
    weather: { icon: "🌈", label: "갬" },
    pace: "1:10",
    notes:
      "영상 제목의 답. 이력서의 빈칸(스펙·연차)을 채우는 게임은 끝났다. 대체 불가능한 ‘결과/증거’를 쌓고, 그 위에 AI 활용력을 얹어라. 한 줄 메시지: ‘AI는 도구, 무기는 당신.’ 그리고 오늘의 결론 ‘AI를 빠르게 받아들여라’를 크게.",
    Content: () => (
      <div className="w-full max-w-5xl">
        <Kicker icon="🔑" no="답">
          이력서보다 중요한 한 가지
        </Kicker>
        <h2 className="text-[clamp(1.9rem,5vw,3.6rem)] font-black leading-[1.16] tracking-tight text-slate-900">
          칸을 채우지 말고,<br />
          <span className="text-amber-600">대체 불가능한 결과</span>를 쌓아라.
        </h2>
        <p className="mt-6 text-[clamp(1.1rem,2.3vw,1.6rem)] font-bold text-slate-600">
          이력서 = 과거의 목록 · 증거 = 미래의 약속.{" "}
          <br className="hidden md:block" />그 위에 <b className="text-sky-700">AI 활용력</b>을 얹어라.
        </p>

        <Card className="mt-8 bg-white/80 p-6">
          <p className="text-[clamp(1.3rem,3vw,2.2rem)] font-black text-slate-900">
            🤖 AI는 도구, <span className="text-sky-600">무기는 당신.</span>
          </p>
          <p className="mt-2 text-[clamp(1.1rem,2.2vw,1.5rem)] font-extrabold text-amber-600">
            → 그러니, AI를 빠르게 받아들여라.
          </p>
        </Card>
      </div>
    ),
  },

  /* 13 — 그래서 나는? (성찰/액션) ------------------------------------- */
  {
    id: "reflection",
    bg: "from-sky-100 via-white to-emerald-50",
    weather: { icon: "🧭", label: "나의 예보" },
    pace: "1:30",
    notes:
      "청중이 직접 자기 일로 가져가는 장. 20~30초 정적을 두고 ‘딱 하나만 정하세요’라고. OKR Party와 연결: 분기 OKR에 ‘AI 활용’ KR 하나 넣기를 권유. 강요보다 초대하는 톤.",
    Content: () => {
      const acts = [
        { e: "🗓️", h: "이번 주", d: "내 업무 한 가지에 AI 붙여보기" },
        { e: "🛠️", h: "한 달 안", d: "검증 task 1개를 AI로 자동화 시도" },
        { e: "🎯", h: "이번 분기", d: "OKR에 ‘AI 활용’ KR 1개 등록" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="✍️" no="05">
            그래서, 나는?
          </Kicker>
          <Title>그래서 나는 무엇을 할 것인가?</Title>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {acts.map((a) => (
              <Card key={a.h} className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-sky-400 text-sky-500">
                    ☐
                  </span>
                  <span className="text-2xl">{a.e}</span>
                  <span className="text-lg font-extrabold text-sky-700">
                    {a.h}
                  </span>
                </div>
                <p className="mt-3 text-lg font-bold text-slate-700">{a.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-[clamp(1.1rem,2.3vw,1.6rem)] font-extrabold text-slate-800">
            ✅ 다 하지 말고, <span className="text-emerald-600">오늘 딱 하나만</span>{" "}
            시작하기.
          </p>
        </div>
      );
    },
  },

  /* 14 — 클로징 ------------------------------------------------------- */
  {
    id: "closing",
    bg: "from-sky-300 via-sky-200 to-amber-100",
    weather: { icon: "☀️", label: "쾌청" },
    pace: "0:40",
    notes:
      "밝게 마무리. 한 줄 메시지 다시 한 번. ‘내일 당장 할 일 1가지’를 머릿속에 정하고 나가자고. 감사 인사. 질문 받기 전 한 박자 미소.",
    Content: () => (
      <div className="relative w-full max-w-5xl text-center">
        <div className="pointer-events-none absolute -right-4 -top-24 h-40 w-40 animate-float-slow rounded-full bg-gradient-to-br from-amber-300 to-amber-400 opacity-80 blur-[2px] md:h-52 md:w-52" />
        <div className="text-6xl">🌈</div>
        <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(1.8rem,4.6vw,3.4rem)] font-black leading-[1.2] tracking-tight text-slate-900">
          이력서를 채우지 말고,<br />
          <span className="text-sky-700">대체 불가능한 나</span>를 증명하라.
        </h2>
        <p className="mt-6 text-[clamp(1.2rem,2.6vw,1.9rem)] font-black text-amber-600">
          AI는 도구, 무기는 당신.
        </p>
        <p className="mt-8 text-lg font-bold text-slate-500">
          내일 당장 할 일 <b className="text-slate-800">1가지</b>를 정하고 나가세요.
        </p>
        <p className="mt-10 text-xl font-extrabold text-slate-700">감사합니다 🙇</p>
      </div>
    ),
  },

  /* 15 — 출처/참고 --------------------------------------------------- */
  {
    id: "sources",
    bg: "from-white via-sky-50 to-sky-100",
    weather: { icon: "📚", label: "참고자료" },
    pace: "0:20",
    notes:
      "Q&A용 백업 화면. 출처와 더 볼 거리를 띄워두고 질문을 받으세요.",
    Content: () => (
      <div className="w-full max-w-4xl">
        <Kicker icon="📚" no="참고">
          출처 & 더 보기
        </Kicker>
        <Title>같이 보면 좋은 것</Title>
        <div className="mt-7 space-y-3">
          <Card className="flex items-center gap-4 p-5">
            <span className="text-3xl">▶️</span>
            <div>
              <div className="font-extrabold text-slate-900">
                원본 영상 — 인생질문 307회
              </div>
              <div className="text-sm font-semibold text-sky-700">
                {META.videoUrl}
              </div>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-5">
            <span className="text-3xl">📖</span>
            <div>
              <div className="font-extrabold text-slate-900">
                송길영 『시대예보: 경량문명의 탄생』
              </div>
              <div className="text-sm font-semibold text-slate-500">
                마인드 마이너가 읽는 ‘일’의 미래
              </div>
            </div>
          </Card>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          본 자료는 강연 내용 요약·재구성이며, ‘우리 검증팀’ 적용 슬라이드는 발표자
          해석입니다.
        </p>
      </div>
    ),
  },
];
