import React from "react";
import {
  BalanceHeavyLight,
  CoverScene,
  FrontDiagram,
  IndustryIcon,
  IqGauge,
  PerCapitaBars,
  RainbowScene,
  Roadmap,
  ResumeVsProof,
  SourcesArt,
  Sparkles,
  UmbrellaPerson,
  VerifyPipeline,
  VersusDiagram,
  Wx,
} from "@/components/art";

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
  bg: string;
  weather: { icon: string; label: string };
  pace: string;
  notes: string;
  Content: React.FC;
};

/* ============================== 공용 UI ================================= */

function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base font-extrabold shadow-sm ${className}`}
    >
      {children}
    </span>
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

/* ============================== 슬라이드 ================================ */

export const slides: SlideDef[] = [
  /* 1 — 표지 ----------------------------------------------------------- */
  {
    id: "cover",
    bg: "from-sky-300 via-sky-200 to-amber-100",
    weather: { icon: "☀️", label: "맑음 · 특보" },
    pace: "0:30",
    notes:
      "인사. ‘오늘 15분, AI 시대를 일기예보처럼 같이 읽어봅니다.’ 결론을 먼저 던지세요 — “AI를 빠르게 받아들이자.” 키 안내: → / Space 다음, N 노트, T 타이머, ? 도움말.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between md:gap-10">
        <div className="order-2 text-center md:order-1 md:text-left">
          <div className="mb-6 flex items-center justify-center gap-2 md:justify-start">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {META.brand}
              <span className="ml-1 text-slate-400">{META.brandHanja}</span>
            </span>
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-bold text-sky-700">
              AI 전선 특보
            </span>
          </div>
          <h1 className="whitespace-pre-line text-[clamp(2rem,5.6vw,4.4rem)] font-black leading-[1.1] tracking-tight text-slate-900">
            {META.title}
          </h1>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.6rem)] font-bold text-slate-600">
            {META.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Chip className="bg-sky-500/15 text-sky-800">{META.event}</Chip>
            <Chip className="bg-amber-500/20 text-amber-800">{META.team}</Chip>
          </div>
          <p className="mt-7 text-sm text-slate-500">
            <kbd className="rounded bg-white/80 px-1.5 py-0.5 font-mono ring-1 ring-slate-900/10">
              →
            </kbd>{" "}
            로 시작 · <b>N</b> 노트 · <b>?</b> 도움말
          </p>
        </div>
        <CoverScene className="order-1 w-[clamp(200px,30vw,360px)] md:order-2" />
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
      "오늘의 흐름을 ‘주간예보’처럼 5칸으로. 길게 설명하지 말고 ‘이 순서로 갑니다’ 정도만. 마지막 칸(우리는?)에서 자기 일로 가져가게 될 거라고 예고.",
    Content: () => {
      const items = [
        { type: "front", t: "변곡점", s: "2022.11.30" },
        { type: "tornado", t: "문명 교체", s: "중량→경량" },
        { type: "cloudsun", t: "두 변화", s: "지능·조직" },
        { type: "storm", t: "경쟁 전환", s: "개인 vs 법인" },
        { type: "compass", t: "우리는?", s: "검증팀" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="📡" no="오늘의 예보">
            15분간의 시대 날씨
          </Kicker>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {items.map((it, i) => (
              <div
                key={it.t}
                className="rounded-3xl bg-white/80 p-5 text-center shadow-xl shadow-sky-900/5 ring-1 ring-slate-900/5"
              >
                <Wx type={it.type} className="mx-auto h-16 w-16 md:h-20 md:w-20" />
                <div className="mt-2 text-xs font-extrabold tracking-widest text-sky-600">
                  0{i + 1}
                </div>
                <div className="text-lg font-extrabold text-slate-900">{it.t}</div>
                <div className="text-sm font-semibold text-slate-400">{it.s}</div>
              </div>
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
      "도발적으로. 천천히 또박또박. 1초 정적. ‘불편하지만 이게 지금 시대가 던지는 질문’이라 연결. ‘취직하던 시대에서 차리는 시대로.’ 원문: 여러분 뭐라도 좀 하세요 — 지금은 차리면 되는데 왜 아직도 조직에 있습니까?",
    Content: () => (
      <div className="relative w-full max-w-5xl text-center">
        <Sparkles className="pointer-events-none absolute -top-10 right-6 h-24 w-24 opacity-70" />
        <span className="text-8xl font-black text-amber-300 md:text-9xl">“</span>
        <h2 className="-mt-6 text-[clamp(2rem,6vw,4.6rem)] font-black leading-[1.18] tracking-tight text-slate-900">
          왜 아직도
          <br />
          <span className="text-amber-600">조직에</span> 있습니까?
        </h2>
        <p className="mt-7 text-[clamp(1.05rem,2.3vw,1.6rem)] font-bold text-slate-500">
          취직하던 시대에서, <span className="text-sky-600">차리는</span> 시대로.
        </p>
        <p className="mt-6 text-base font-bold text-slate-400">— 송길영, 마인드 마이너</p>
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
      "ChatGPT 공개일. ‘날씨로 치면 전선이 통과한 날 — 그 전과 후로 공기가 바뀝니다.’ 사람이 지능을 공급하던 시대 → 지능을 구독하는 시대. 출발선은 모두에게 ‘지금’이라 공평하다.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="📅" no="01">
          변곡점
        </Kicker>
        <div className="text-[clamp(2.6rem,8vw,6rem)] font-black leading-none tracking-tight text-slate-900">
          2022.<span className="text-sky-600">11.30</span>
        </div>
        <p className="mt-3 text-[clamp(1.05rem,2.4vw,1.7rem)] font-extrabold text-slate-600">
          지능을 <span className="text-slate-400 line-through">공급</span>하던 시대 →{" "}
          <span className="text-sky-600">구독</span>하는 시대
        </p>
        <FrontDiagram className="mt-6 h-[34vh] w-auto max-w-full" />
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
      "오늘의 핵심 프레임. 토지·설비·규모의 중량문명에서 AI·데이터·속도의 경량문명으로. 한 줄: ‘개인이 AI로 무장하면 큰 조직과 경쟁할 수 있다.’ 중간 단계(지시·보고·협의)가 사라진다.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <h2 className="text-[clamp(1.8rem,4.6vw,3.4rem)] font-black tracking-tight text-slate-900">
          중량문명 <span className="text-slate-300">→</span>{" "}
          <span className="text-sky-600">경량문명</span>
        </h2>
        <BalanceHeavyLight className="mt-2 h-[36vh] w-auto max-w-full" />
        <div className="mt-2 flex w-full max-w-3xl items-start justify-between gap-4">
          <div className="flex-1">
            <Chip className="bg-slate-200 text-slate-600">🏭 중량 · Heavy</Chip>
            <p className="mt-2 text-sm font-bold text-slate-400">토지 · 설비 · 규모</p>
          </div>
          <div className="flex-1">
            <Chip className="bg-sky-500/15 text-sky-700">🪶 경량 · Light</Chip>
            <p className="mt-2 text-sm font-bold text-sky-600">AI · 데이터 · 속도</p>
          </div>
        </div>
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
      "첫 번째 변화. ‘지능이 흔해졌다.’ 작년 AI IQ 100 미만 → 올해 140. 퇴근·점심·휴식 없고 감정 부담도 0. 개인이 월 $20~$200로 똑똑한 조수를 구독. 비유: 24시간 안 자는 주니어를 월 몇 만원에.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🧠" no="변화 ①">
          지능의 범용화
        </Kicker>
        <h2 className="text-[clamp(1.8rem,4.6vw,3.2rem)] font-black tracking-tight text-slate-900">
          똑똑함이, <span className="text-violet-600">흔해졌다</span>
        </h2>
        <IqGauge className="mt-2 h-[34vh] w-auto max-w-full" />
        <div className="-mt-2 flex flex-wrap justify-center gap-2">
          <Chip className="bg-white/80 text-slate-600 ring-1 ring-slate-900/5">
            🌙 휴식 0
          </Chip>
          <Chip className="bg-white/80 text-slate-600 ring-1 ring-slate-900/5">
            😶 감정노동 0
          </Chip>
          <Chip className="bg-violet-500/15 text-violet-700">💳 월 $20→$200 구독</Chip>
        </div>
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
      "두 번째 변화. 과거엔 규모·매출이 경쟁력, 지금은 적을수록 높은 평가 — ‘인당 시가총액’. 텔레그램 30명, 미드저니 40명, 커서 20명, 1인 기업이 매출 50억에 1000억 매각. ‘조직이 생산의 전제였던 시대는 끝났다.’",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="⚖️" no="변화 ②">
          조직 규모의 균형화
        </Kicker>
        <h2 className="text-[clamp(1.8rem,4.6vw,3.2rem)] font-black tracking-tight text-slate-900">
          적을수록 <span className="text-emerald-600">비싸다</span> · 인당 시총
        </h2>
        <PerCapitaBars className="mt-3 h-[40vh] w-auto max-w-full" />
        <p className="mt-1 text-base font-extrabold text-slate-500">
          💬 “조직이 생산의 전제였던 시대는 끝났다.”
        </p>
      </div>
    ),
  },

  /* 8 — 경쟁의 대전환 -------------------------------------------------- */
  {
    id: "competition",
    bg: "from-rose-100 via-amber-50 to-sky-100",
    weather: { icon: "🌪️", label: "경쟁 난기류" },
    pace: "1:20",
    notes:
      "경쟁 상대가 바뀐다. 과거: 법인 vs 법인. 지금: AI 쓰는 개인이 법인의 몫을 가져온다. 핵심 한 마디: ‘개인 vs 법인이 붙으면 개인에게 건다 — 오버헤드 때문.’ 잠깐 멈춰 곱씹게.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🥊" no="03">
          경쟁의 대전환
        </Kicker>
        <h2 className="text-[clamp(1.8rem,4.6vw,3.2rem)] font-black tracking-tight text-slate-900">
          누구와 싸우는가
        </h2>
        <VersusDiagram className="mt-3 h-[34vh] w-auto max-w-full" />
        <div className="mt-2 rounded-2xl bg-gradient-to-r from-amber-100 to-rose-100 px-6 py-3 shadow-sm ring-1 ring-amber-200">
          <p className="text-[clamp(1.05rem,2.4vw,1.7rem)] font-black text-slate-900">
            🎲 개인 vs 법인? <span className="text-rose-600">개인에게 건다</span> — 오버헤드.
          </p>
        </div>
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
      "추상론을 현실로. 광고: 촬영 없이 AI로. 법률: 작은 로펌 인턴에 SKY 50명, 패럴리걸·어소시에이트 소멸. 중개: 8분 만에 앱·24시간 다국어 무료 상담→브랜드 직거래. 물류: 쿠팡 채용 ‘소통 담당’→‘자동화 담당’. 전 산업 동시다발.",
    Content: () => {
      const cases = [
        { type: "ad", t: "광고", s: "촬영 0 · AI로 제작", w: "🌦️" },
        { type: "law", t: "법률", s: "인턴에 SKY 50명", w: "⛈️" },
        { type: "broker", t: "중개", s: "8분 만에 앱 · 직거래", w: "🌪️" },
        { type: "logistics", t: "물류", s: "‘소통’ → ‘자동화’", w: "🌧️" },
      ];
      return (
        <div className="w-full max-w-6xl">
          <Kicker icon="📍" no="현장">
            이미 벌어지는 일 · 전 산업 동시다발
          </Kicker>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {cases.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl bg-white/80 p-5 text-center shadow-xl shadow-sky-900/5 ring-1 ring-slate-900/5"
              >
                <IndustryIcon type={c.type} className="mx-auto h-20 w-20" />
                <div className="mt-2 flex items-center justify-center gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900">{c.t}</span>
                  <span className="text-lg">{c.w}</span>
                </div>
                <p className="mt-1 text-sm font-bold text-slate-500">{c.s}</p>
              </div>
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
      "오늘의 핵심 브릿지 — 우리 일로. 검증은 반복·패턴·대량 로그·방대한 스펙이라 AI의 홈그라운드. 스펙→TC생성→실행→로그분석→리포트, 모든 단계에 AI를 주입. 펀치라인: ‘검증 엔지니어 vs AI 쓰는 검증 엔지니어 — 내년 평가의 격차.’ (※ 영상 외, 우리 팀 적용)",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🧭" no="04">
          그래서, 우리 검증팀은?
        </Kicker>
        <h2 className="text-[clamp(1.7rem,4.4vw,3rem)] font-black tracking-tight text-slate-900">
          검증은 AI의 <span className="text-amber-600">홈그라운드</span>
        </h2>
        <p className="mt-2 text-base font-bold text-slate-500">
          반복 · 패턴 · 대량 로그 · 방대한 스펙 — 모든 단계에 AI 주입
        </p>
        <VerifyPipeline className="mt-4 h-[26vh] w-auto max-w-full" />
        <div className="mt-3 rounded-2xl bg-gradient-to-r from-amber-200 to-sky-200 px-6 py-3 shadow-sm ring-1 ring-amber-300">
          <p className="text-[clamp(1.05rem,2.3vw,1.6rem)] font-black text-slate-900">
            검증 엔지니어 <span className="text-slate-500">vs</span>{" "}
            <span className="text-amber-700">AI 쓰는</span> 검증 엔지니어
          </p>
        </div>
      </div>
    ),
  },

  /* 11 — 버티지 마세요 ------------------------------------------------- */
  {
    id: "warning",
    bg: "from-slate-200 via-sky-100 to-sky-200",
    weather: { icon: "⛈️", label: "호우경보" },
    pace: "1:00",
    notes:
      "톤 전환. 두려움은 인정하되 ‘버티기(존버)’는 전략이 아니다. 변화는 좋고 나쁨이 아니라 비·눈·바람처럼 그냥 온다. 우산을 들지, 비를 맞을지가 선택. 다음 장에서 답을 준다고 예고.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-center md:gap-12">
        <UmbrellaPerson className="w-[clamp(180px,26vw,300px)]" />
        <div className="text-center md:text-left">
          <h2 className="text-[clamp(2.2rem,6.5vw,5rem)] font-black tracking-tight text-slate-900">
            버티지
            <br />
            마세요
          </h2>
          <p className="mt-5 max-w-md text-[clamp(1.05rem,2.2vw,1.5rem)] font-bold text-slate-600">
            변화는 비·눈·바람처럼 그냥 옵니다.
            <br />
            <span className="text-sky-700">우산을 들지, 비를 맞을지</span>가 선택.
          </p>
        </div>
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
      "영상 제목의 답. 이력서의 빈칸(스펙·연차)을 채우는 게임은 끝났다. 대체 불가능한 ‘결과/증거’를 쌓고 그 위에 AI 활용력을 얹어라. ‘AI는 도구, 무기는 당신.’ 오늘의 결론 ‘AI를 빠르게 받아들여라’.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🔑" no="답">
          이력서보다 중요한 한 가지
        </Kicker>
        <ResumeVsProof className="mt-1 h-[34vh] w-auto max-w-full" />
        <h2 className="mt-3 text-[clamp(1.5rem,3.6vw,2.6rem)] font-black tracking-tight text-slate-900">
          칸을 채우지 말고, <span className="text-amber-600">증거를 쌓아라</span>
        </h2>
        <p className="mt-3 text-[clamp(1.1rem,2.6vw,1.9rem)] font-black text-sky-700">
          🤖 AI는 도구, 무기는 당신 →{" "}
          <span className="text-amber-600">빠르게 받아들여라</span>
        </p>
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
      "청중이 직접 자기 일로. 20~30초 정적을 두고 ‘딱 하나만 정하세요’. OKR Party 연결: 분기 OKR에 ‘AI 활용’ KR 하나. 강요보다 초대하는 톤.",
    Content: () => {
      const acts = [
        "내 업무 1개에 AI 붙이기",
        "검증 task 1개 자동화",
        "OKR에 ‘AI 활용’ KR 1개",
      ];
      return (
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <Kicker icon="✍️" no="05">
            그래서, 나는?
          </Kicker>
          <h2 className="text-[clamp(1.7rem,4.4vw,3rem)] font-black tracking-tight text-slate-900">
            그래서 나는 무엇을 할 것인가?
          </h2>
          <Roadmap className="mt-3 h-[26vh] w-auto max-w-full" />
          <div className="mt-2 grid w-full max-w-4xl grid-cols-1 gap-2 md:grid-cols-3">
            {acts.map((a, i) => (
              <div
                key={a}
                className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-900/5"
              >
                <span className="mr-1 text-sky-500">☐</span> {a}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[clamp(1.05rem,2.2vw,1.5rem)] font-extrabold text-slate-800">
            ✅ 오늘 딱 <span className="text-emerald-600">하나만</span> 시작하기.
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
      "밝게 마무리. 한 줄 메시지 다시. ‘내일 당장 할 일 1가지’를 정하고 나가자. 감사 인사, 한 박자 미소.",
    Content: () => (
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <RainbowScene className="w-[clamp(220px,32vw,380px)]" />
        <h2 className="mt-4 text-[clamp(1.7rem,4.4vw,3.2rem)] font-black leading-[1.2] tracking-tight text-slate-900">
          대체 불가능한 <span className="text-sky-700">나</span>를 증명하라
        </h2>
        <p className="mt-4 text-[clamp(1.2rem,2.8vw,2rem)] font-black text-amber-600">
          AI는 도구, 무기는 당신.
        </p>
        <p className="mt-6 text-lg font-extrabold text-slate-500">감사합니다 🙇</p>
      </div>
    ),
  },

  /* 15 — 출처/참고 --------------------------------------------------- */
  {
    id: "sources",
    bg: "from-white via-sky-50 to-sky-100",
    weather: { icon: "📚", label: "참고자료" },
    pace: "0:20",
    notes: "Q&A용 백업 화면. 출처를 띄워두고 질문을 받으세요.",
    Content: () => (
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <SourcesArt className="w-[clamp(160px,22vw,260px)]" />
        <h2 className="mt-4 text-[clamp(1.5rem,3.6vw,2.4rem)] font-black tracking-tight text-slate-900">
          출처 & 더 보기
        </h2>
        <div className="mt-5 space-y-2 text-base font-bold">
          <p className="text-slate-700">
            ▶️ 원본 영상 — 인생질문 307회 ·{" "}
            <span className="text-sky-700">{META.videoUrl}</span>
          </p>
          <p className="text-slate-700">
            📖 송길영 『시대예보: 경량문명의 탄생』
          </p>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          강연 요약·재구성이며, ‘검증팀 적용’은 발표자 해석입니다.
        </p>
      </div>
    ),
  },
];
