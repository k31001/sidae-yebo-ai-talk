import React from "react";
import {
  BalanceHeavyLight,
  BlessingOrDisaster,
  CoverScene,
  FrontDiagram,
  IndustryIcon,
  IqGauge,
  PerCapitaBars,
  RainbowScene,
  Roadmap,
  SourcesArt,
  StuckAtDesk,
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
  title: "직장도 직업도 없어질 때,\n꼭 남겨야 하는 것",
  subtitle: "AI 전선이 바꾸는 ‘일’의 미래 · 경량문명",
  credit: "송길영 『시대예보』 기반",
  event: "OKR Party 세미나",
  team: "SSD Controller 검증팀",
  presenter: "발표자",
  date: "2026",
  oneLiner: "버티지 말고, AI로 무장하라.",
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
    <div className="mb-3 flex items-center justify-center gap-2.5">
      <span className="text-xl md:text-2xl">{icon}</span>
      {no && (
        <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-extrabold tracking-wide text-sky-700 md:text-sm">
          {no}
        </span>
      )}
      <span className="text-sm font-bold text-slate-500 md:text-base">
        {children}
      </span>
    </div>
  );
}

/** 핵심 워딩(인용문) — 송길영 작가의 워딩을 그대로 */
function Quote({
  children,
  by = "송길영",
  size = "text-[clamp(1.6rem,4.4vw,3.2rem)]",
}: {
  children: React.ReactNode;
  by?: string | null;
  size?: string;
}) {
  return (
    <figure className="text-center">
      <blockquote
        className={`${size} font-black leading-[1.3] tracking-tight text-slate-900`}
      >
        <span className="text-sky-400">“</span>
        {children}
        <span className="text-sky-400">”</span>
      </blockquote>
      {by && (
        <figcaption className="mt-3 text-base font-bold text-slate-400">
          — {by}
        </figcaption>
      )}
    </figure>
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
      "인사. ‘오늘 15분, AI 시대를 일기예보처럼 같이 읽어봅니다.’ 제목은 송길영 작가의 화두 — 직장도 직업도 없어질 때 무엇을 남길 것인가. 결론을 먼저 던지세요: 버티지 말고 AI로 무장하자. 키 안내: → 다음, N 노트, T 타이머, ? 도움말.",
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
          <h1 className="whitespace-pre-line text-[clamp(1.9rem,5.2vw,4.2rem)] font-black leading-[1.12] tracking-tight text-slate-900">
            {META.title}
          </h1>
          <p className="mt-5 text-[clamp(1rem,1.9vw,1.5rem)] font-bold text-slate-600">
            {META.subtitle}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-400">
            {META.credit}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Chip className="bg-sky-500/15 text-sky-800">{META.event}</Chip>
            <Chip className="bg-amber-500/20 text-amber-800">{META.team}</Chip>
          </div>
          <p className="mt-6 text-sm text-slate-500">
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
      "오늘의 흐름을 ‘주간예보’처럼 5칸으로. 길게 설명하지 말고 ‘이 순서로 갑니다’ 정도만. 마지막 칸(우리 검증팀)에서 자기 일로 가져가게 될 거라고 예고.",
    Content: () => {
      const items = [
        { type: "front", t: "변곡점", s: "2022.11.30" },
        { type: "tornado", t: "경량문명", s: "중량→경량" },
        { type: "cloudsun", t: "두 변화", s: "지능·조직" },
        { type: "storm", t: "경쟁 전환", s: "개인 vs 법인" },
        { type: "compass", t: "우리 검증팀", s: "그래서 나는?" },
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
      "도발적으로. 천천히 또박또박. 1초 정적. ‘불편하지만 이게 지금 시대가 직장인에게 던지는 질문’이라 연결. 취직해 돈 벌던 시대에서, 차리는 시대로.",
    Content: () => (
      <div className="flex w-full max-w-5xl flex-col items-center">
        <Kicker icon="🎙️" no="HOOK">
          강연 오프닝
        </Kicker>
        <Quote size="text-[clamp(1.8rem,5vw,3.6rem)]">
          여러분, 뭐라도 좀 하세요.
          <br />
          <span className="text-amber-600">왜 아직도 조직에 있습니까?</span>
        </Quote>
        <StuckAtDesk className="mt-6 h-[30vh] w-auto max-w-full" />
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
      "ChatGPT 공개일(2022.11.30). 날씨로 치면 전선이 통과한 날 — 그 전과 후로 공기가 바뀝니다. 사람이 지능을 공급하던 시대에서 지능을 구독하는 시대로. 출발선은 모두에게 ‘지금’이라 오히려 공평하다.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="📅" no="01 · 변곡점">
          2022.11.30 · ChatGPT 등장
        </Kicker>
        <Quote>
          출발선은 <span className="text-sky-600">공평하게</span>, 올해.
        </Quote>
        <FrontDiagram className="mt-6 h-[32vh] w-auto max-w-full" />
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
      "오늘의 핵심 프레임. 토지·설비·규모의 중량문명에서 AI·데이터·속도의 경량문명으로. 중간 단계(지시·보고·협의)가 사라지고 각자가 AI로 일을 완결한다. 인용 그대로 읽어주세요.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="🪶" no="02 · 경량문명">
          중량문명 → 경량문명
        </Kicker>
        <Quote>
          개인이 <span className="text-sky-600">AI로 무장</span>하면
          <br className="md:hidden" /> 큰 조직과 경쟁할 수 있다.
        </Quote>
        <BalanceHeavyLight className="mt-4 h-[32vh] w-auto max-w-full" />
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
      "첫 번째 변화 — 지능의 범용화. 작년 AI IQ 100 미만에서 올해 140 수준으로. 퇴근·점심·휴식이 없고 감정 부담도 0. 개인이 월 $20~$200로 똑똑한 조수를 구독한다. 비유: 24시간 안 자는 주니어를 월 몇 만원에.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="🧠" no="변화 ①">
          지능의 범용화 · IQ 100 → 140
        </Kicker>
        <Quote>
          휴식이 필요 없고,
          <br className="md:hidden" /> 감정적 부담 없이{" "}
          <span className="text-violet-600">일을 시킬 수 있다.</span>
        </Quote>
        <IqGauge className="mt-3 h-[31vh] w-auto max-w-full" />
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
      "두 번째 변화 — 인당 시가총액. 과거엔 규모·매출이 경쟁력, 지금은 적을수록 높은 평가. 텔레그램 30명, 미드저니 40명, 커서 20명, 1인 기업이 매출 50억에 1000억 매각. 인용 그대로.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="⚖️" no="변화 ②">
          인당 시가총액 · 적을수록 비싸다
        </Kicker>
        <Quote size="text-[clamp(1.5rem,4vw,2.9rem)]">
          조직이 생산의 전제였던{" "}
          <span className="text-emerald-600">시대는 끝났다.</span>
        </Quote>
        <PerCapitaBars className="mt-3 h-[36vh] w-auto max-w-full" />
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
      "경쟁 상대가 바뀐다. 과거엔 법인끼리 싸웠지만, 이제 AI로 무장한 개인이 법인의 몫을 가져온다. 핵심 한 마디 ‘개인에게 건다 — 오버헤드 때문’을 천천히, 그리고 잠깐 멈춰 곱씹게.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="🥊" no="03 · 경쟁의 대전환">
          누구와 싸우는가
        </Kicker>
        <Quote>
          개인과 법인이 붙으면,{" "}
          <span className="text-rose-600">개인에게 건다.</span>
        </Quote>
        <p className="mt-1 text-base font-bold text-slate-400">— 오버헤드 때문.</p>
        <VersusDiagram className="mt-3 h-[30vh] w-auto max-w-full" />
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
      "추상론을 현실로. 법률: 작은 로펌 인턴에 SKY 50명이 몰리고, 패럴리걸·어소시에이트 자리가 사라졌다(챗GPT가 대신). 광고는 촬영 없이 AI로, 중개는 8분 만에 앱·24시간 다국어 무료 상담→직거래, 물류는 쿠팡 채용이 ‘소통’에서 ‘자동화’로. 전 산업 동시다발.",
    Content: () => {
      const cases = [
        { type: "ad", t: "광고", s: "촬영 0 · AI 제작" },
        { type: "law", t: "법률", s: "인턴에 SKY 50명" },
        { type: "broker", t: "중개", s: "8분 만에 앱" },
        { type: "logistics", t: "물류", s: "‘소통’→‘자동화’" },
      ];
      return (
        <div className="flex w-full max-w-6xl flex-col items-center">
          <Kicker icon="📍" no="현장">
            전 산업, 동시다발
          </Kicker>
          <Quote size="text-[clamp(1.4rem,3.6vw,2.6rem)]">
            패럴리걸과 어소시에이트가{" "}
            <span className="text-rose-500">사라졌다.</span>
          </Quote>
          <div className="mt-6 grid w-full grid-cols-4 gap-3 md:gap-4">
            {cases.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl bg-white/80 p-4 text-center shadow-lg shadow-sky-900/5 ring-1 ring-slate-900/5"
              >
                <IndustryIcon type={c.type} className="mx-auto h-14 w-14 md:h-16 md:w-16" />
                <div className="mt-1 text-base font-extrabold text-slate-900">{c.t}</div>
                <div className="text-xs font-bold text-slate-500">{c.s}</div>
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
      "오늘의 핵심 브릿지 — 우리 일로. 송길영의 인용(‘AI를 활용하는 개인과 그렇지 못한 개인의 경쟁’)을 우리 검증 업무에 대입. 스펙→TC생성→실행→로그분석→리포트, 모든 단계에 AI 주입. 펀치라인: ‘검증 엔지니어 vs AI 쓰는 검증 엔지니어 — 내년 평가의 격차.’ (※ 적용은 발표자 해석)",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="🧭" no="04 · 우리 검증팀">
          검증은 AI의 홈그라운드
        </Kicker>
        <Quote size="text-[clamp(1.4rem,3.6vw,2.6rem)]">
          AI를 활용하는 개인과,{" "}
          <span className="text-amber-600">그렇지 못한 개인의 경쟁.</span>
        </Quote>
        <VerifyPipeline className="mt-4 h-[24vh] w-auto max-w-full" />
        <div className="mt-3 rounded-2xl bg-gradient-to-r from-amber-200 to-sky-200 px-6 py-2.5 shadow-sm ring-1 ring-amber-300">
          <p className="text-[clamp(1rem,2.2vw,1.5rem)] font-black text-slate-900">
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
      "톤 전환. 직장인이 가장 흔히 택하는 전략이 ‘버티기(존버)’지만, 그건 전략이 아니라고. 변화는 좋고 나쁨이 아니라 비·눈·바람처럼 그냥 온다. 우산을 들지, 비를 맞을지가 선택. 다음 장에서 그 선택을 던진다고 예고.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-center md:gap-14">
        <UmbrellaPerson className="w-[clamp(170px,24vw,280px)]" />
        <div className="text-center md:text-left">
          <Kicker icon="⛈️" no="경고">
            존버는 전략이 아니다
          </Kicker>
          <p className="text-[clamp(2.4rem,7vw,5.2rem)] font-black leading-[1.1] tracking-tight text-slate-900">
            “버티지
            <br />
            마세요”
          </p>
          <p className="mt-4 text-base font-bold text-slate-400">— 송길영</p>
        </div>
      </div>
    ),
  },

  /* 12 — 축복이냐 재앙이냐 (선택) ------------------------------------- */
  {
    id: "choice",
    bg: "from-amber-200 via-sky-100 to-sky-200",
    weather: { icon: "🌈", label: "갬 / 흐림" },
    pace: "1:10",
    notes:
      "결국 선택의 문제. 같은 도구가 누군가에겐 축복, 누군가에겐 재앙이 된다. 가르는 건 ‘얼마나 빨리 받아들이느냐’. 오늘의 결론으로 연결: 버티지 말고 AI로 무장하라.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center">
        <Kicker icon="🔑" no="선택">
          같은 도구, 다른 결말
        </Kicker>
        <Quote size="text-[clamp(1.4rem,3.7vw,2.7rem)]">
          새로운 도구를 <span className="text-sky-600">축복</span>으로 받아들일지,
          <br className="hidden md:block" />{" "}
          <span className="text-slate-500">재앙</span>으로 경험할지.
        </Quote>
        <BlessingOrDisaster className="mt-4 h-[33vh] w-auto max-w-full" />
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
          <Kicker icon="✍️" no="05 · 그래서, 나는?">
            오늘 딱 하나만
          </Kicker>
          <h2 className="text-[clamp(1.7rem,4.4vw,3rem)] font-black tracking-tight text-slate-900">
            그래서 나는 무엇을 할 것인가?
          </h2>
          <Roadmap className="mt-3 h-[25vh] w-auto max-w-full" />
          <div className="mt-2 grid w-full max-w-4xl grid-cols-1 gap-2 md:grid-cols-3">
            {acts.map((a) => (
              <div
                key={a}
                className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-900/5"
              >
                <span className="mr-1 text-sky-500">☐</span> {a}
              </div>
            ))}
          </div>
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
      "밝게 마무리. 오프닝의 ‘뭐라도 좀 하세요’로 수미상관. ‘내일 당장 할 일 1가지’를 정하고 나가자. 감사 인사, 한 박자 미소.",
    Content: () => (
      <div className="flex w-full max-w-5xl flex-col items-center">
        <RainbowScene className="w-[clamp(200px,30vw,360px)]" />
        <div className="mt-3">
          <Quote size="text-[clamp(2rem,5.4vw,3.8rem)]">
            뭐라도, <span className="text-amber-600">좀 하세요.</span>
          </Quote>
        </div>
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
          <p className="text-slate-700">📖 송길영 『시대예보: 경량문명의 탄생』</p>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          인용은 송길영 작가의 강연·인터뷰 워딩이며, ‘검증팀 적용’은 발표자
          해석입니다.
        </p>
      </div>
    ),
  },
];
