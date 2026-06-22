import React from "react";
import {
  BalanceHeavyLight,
  BlessingOrDisaster,
  Cluster,
  CoverScene,
  GiantFalls,
  IndustryIcon,
  IqGauge,
  LightCivFlow,
  OrgRelay,
  PerCapitaBars,
  RainbowScene,
  Roadmap,
  SourcesArt,
  StuckAtDesk,
  UmbrellaPerson,
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
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-extrabold shadow-sm md:text-base ${className}`}
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
  size = "text-[clamp(1.5rem,4vw,2.9rem)]",
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
        <figcaption className="mt-2 text-sm font-bold text-slate-400 md:text-base">
          — {by}
        </figcaption>
      )}
    </figure>
  );
}

/** 이해를 돕는 적정 분량의 설명 텍스트 */
function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-2xl text-[clamp(0.95rem,1.7vw,1.2rem)] font-semibold leading-relaxed text-slate-600">
      {children}
    </p>
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
      "인사. ‘오늘 15분, AI 시대를 일기예보처럼 같이 읽어봅니다.’ 제목은 송길영 작가의 화두 — 직장도 직업도 없어질 때 무엇을 남길 것인가. 결론을 먼저: 버티지 말고 AI로 무장하자.",
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
          <p className="mt-1 text-sm font-semibold text-slate-400">{META.credit}</p>
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
    pace: "0:40",
    notes:
      "오늘의 흐름을 ‘주간예보’처럼 5칸으로. 길게 설명하지 말고 ‘이 순서로 갑니다’ 정도만. 마지막 칸(그래서 나는?)에서 자기 일로 가져가게 될 거라고 예고.",
    Content: () => {
      const items = [
        { type: "front", t: "경량문명", s: "정의와 등장" },
        { type: "tornado", t: "일의 방식", s: "오버헤드의 종말" },
        { type: "cloudsun", t: "두 동력", s: "지능·인당시총" },
        { type: "storm", t: "현장", s: "이미 벌어진 일" },
        { type: "compass", t: "그래서 나는?", s: "오늘의 한 걸음" },
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
      "도발적으로. 천천히 또박또박. 1초 정적. 직장인에게 가장 불편한 질문. 취직해 돈 벌던 시대에서, 이제는 차려서 버는 시대로 — 도구(AI)는 이미 다 갖춰졌다고 연결.",
    Content: () => (
      <div className="flex w-full max-w-5xl flex-col items-center">
        <Kicker icon="🎙️" no="HOOK">
          강연 오프닝
        </Kicker>
        <Quote size="text-[clamp(1.7rem,4.6vw,3.3rem)]">
          여러분, 뭐라도 좀 하세요.
          <br />
          <span className="text-amber-600">왜 아직도 조직에 있습니까?</span>
        </Quote>
        <div className="mt-4">
          <Lead>
            취직해서 돈을 벌던 시대에서, <b className="text-slate-800">차려서 버는 시대</b>로.
            도구(AI)는 이미 다 갖춰졌습니다.
          </Lead>
        </div>
        <StuckAtDesk className="mt-4 h-[24vh] w-auto max-w-full" />
      </div>
    ),
  },

  /* 4 — 경량문명의 등장 (흐름) ---------------------------------------- */
  {
    id: "lightweight-flow",
    bg: "from-sky-100 via-indigo-50 to-sky-100",
    weather: { icon: "🌀", label: "기단 형성" },
    pace: "1:20",
    notes:
      "경량문명이 ‘어떤 흐름에서’ 나왔는지. 산업화 = 중량문명(토지·자본·대규모 조직, 규모가 곧 경쟁력). 2022.11.30 ChatGPT가 변곡점 — 지능이 누구나 싸게 쓰는 범용재가 됐다. 그 결과 거대 조직 없이 개인이 일을 완결하는 경량문명으로.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🪶" no="01 · 경량문명">
          경량문명은 이렇게 왔다
        </Kicker>
        <LightCivFlow className="mt-2 h-[30vh] w-auto max-w-full" />
        <div className="mt-4 grid w-full max-w-5xl grid-cols-3 gap-3 text-left">
          {[
            ["중량문명", "토지·자본·대규모 조직이 생산의 전제. 규모가 곧 경쟁력."],
            ["2022.11.30", "ChatGPT 등장 → 고급 지능을 누구나 싸게 쓴다(지능의 범용화)."],
            ["경량문명", "AI·데이터로 개인이 가볍게 완결. 속도·밀도가 경쟁력."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/5">
              <div className="text-sm font-extrabold text-sky-700">{t}</div>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-slate-600">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[clamp(1rem,2.1vw,1.45rem)] font-black text-slate-900">
          🏁 출발선은 공평하게, <span className="text-amber-600">올해.</span>
        </p>
      </div>
    ),
  },

  /* 5 — 경량문명이란 (정의) ------------------------------------------- */
  {
    id: "lightweight-def",
    bg: "from-slate-100 via-white to-sky-100",
    weather: { icon: "🌡️", label: "기단 교체" },
    pace: "1:20",
    notes:
      "정의를 또박또박. 경량문명 = 토지·설비·거대 조직 없이, AI·데이터·프로토콜만으로 개인이 가볍게 일을 완결하는 문명. 핵심 특징 3가지: 중간 단계 제거 / 속도·밀도 / 1인이 완결. 인용 그대로 읽어주세요.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🪶" no="02 · 정의">
          경량문명이란?
        </Kicker>
        <Quote size="text-[clamp(1.4rem,3.7vw,2.6rem)]">
          개인이 <span className="text-sky-600">AI로 무장</span>하면 큰 조직과 경쟁할 수 있다.
        </Quote>
        <div className="mt-3">
          <Lead>
            <b className="text-slate-800">토지·설비·거대 조직 없이</b>, AI·데이터·프로토콜만으로
            개인이 가볍게 일을 완결하는 문명.
          </Lead>
        </div>
        <BalanceHeavyLight className="mt-2 h-[24vh] w-auto max-w-full" />
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Chip className="bg-sky-500/15 text-sky-700">중간 단계 제거</Chip>
          <Chip className="bg-sky-500/15 text-sky-700">속도 · 밀도</Chip>
          <Chip className="bg-sky-500/15 text-sky-700">1인이 완결</Chip>
        </div>
      </div>
    ),
  },

  /* 6 — 부장→차장→대리 (오버헤드) ------------------------------------ */
  {
    id: "overhead",
    bg: "from-rose-50 via-white to-sky-100",
    weather: { icon: "🌬️", label: "난기류 소멸" },
    pace: "1:30",
    notes:
      "송길영의 비유. 부장이 지시 → 차장이 나눠 → 대리가 실행 → 다시 보고·결재로 거슬러 올라간다. 이 왕복 전체가 오버헤드. 경량문명에선 1인 + AI가 통째로 완결한다. 직장인이라면 누구나 공감하는 장면 — 여기서 웃음 한 번.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🔄" no="03 · 일의 방식">
          부장 → 차장 → 대리, 그리고 보고
        </Kicker>
        <Quote size="text-[clamp(1.35rem,3.4vw,2.4rem)]">
          지시·배분·협의·보고 같은 절차가{" "}
          <span className="text-rose-500">사라질 것.</span>
        </Quote>
        <OrgRelay className="mt-3 h-[27vh] w-auto max-w-full" />
        <div className="mt-2">
          <Lead>
            지시하고, 나누고, 실행하고, 다시 보고로 거슬러 올라가는 왕복 —{" "}
            <b className="text-slate-800">그 전부가 오버헤드</b>입니다. 경량문명에선 1인 + AI가
            통째로 끝냅니다.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 6.5 — 단속적 협력 (경량문명의 규칙) ------------------------------- */
  {
    id: "clusters",
    bg: "from-sky-100 via-white to-violet-50",
    weather: { icon: "🔗", label: "유동적 기단" },
    pace: "1:00",
    notes:
      "경량문명의 일하는 방식. 평생직장·영구고용이 아니라 프로젝트 단위로 ‘지금 만나고, 잠시 만나고, 다시 만나는’ 단속적 협력. 필요할 때 모였다 흩어지는 ‘클러스터’가 기본 단위. 직장인에게: 회사가 아니라 ‘프로젝트로’ 일하는 감각.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🔗" no="일하는 방식">
          경량문명의 규칙
        </Kicker>
        <Quote size="text-[clamp(1.4rem,3.7vw,2.6rem)]">
          지금 만나고, 잠시 만나고,{" "}
          <span className="text-violet-600">다시 만난다.</span>
        </Quote>
        <Cluster className="mt-4 h-[25vh] w-auto max-w-full" />
        <div className="mt-3">
          <Lead>
            평생직장·영구고용이 아니라{" "}
            <b className="text-slate-800">프로젝트 중심의 단속적 협력</b>. 필요할 때 모였다
            흩어지는 ‘클러스터’가 기본 단위가 됩니다.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 7 — 동력① 지능의 범용화 ------------------------------------------- */
  {
    id: "intelligence",
    bg: "from-violet-100 via-sky-50 to-sky-100",
    weather: { icon: "🌤️", label: "지능 고기압" },
    pace: "1:10",
    notes:
      "경량문명을 떠받치는 첫 번째 동력. 작년 AI IQ 100 미만 → 올해 140 수준. 퇴근·점심·휴식이 없고 감정 부담도 0. 월 2만~26만 원이면 24시간 안 자는 똑똑한 조수를 고용한다.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🧠" no="동력 ①">
          지능의 범용화 · IQ 100 → 140
        </Kicker>
        <Quote size="text-[clamp(1.35rem,3.5vw,2.5rem)]">
          휴식이 필요 없고, 감정적 부담 없이{" "}
          <span className="text-violet-600">일을 시킬 수 있다.</span>
        </Quote>
        <IqGauge className="mt-1 h-[27vh] w-auto max-w-full" />
        <div className="mt-1">
          <Lead>
            작년만 해도 IQ 100 미만이던 AI가 올해 140 수준으로. 월{" "}
            <b className="text-slate-800">2만~26만 원</b>이면 누구나 똑똑한 조수를 24시간
            고용합니다.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 8 — 동력② 인당 시가총액 ------------------------------------------- */
  {
    id: "per-capita",
    bg: "from-emerald-100 via-sky-50 to-sky-100",
    weather: { icon: "📈", label: "고기압 확장" },
    pace: "1:20",
    notes:
      "두 번째 동력 — 인당 시가총액. 과거엔 규모·매출이 경쟁력, 지금은 적을수록 높은 평가. WhatsApp 55명이 약 25조(인당 4,500억), Instagram 13명이 1.3조(인당 1,000억), Mojang 40명이 3.3조. 송길영은 ‘1명짜리 회사가 매출 50억으로 1,000억에 팔린’ 예도 든다.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="⚖️" no="동력 ②">
          인당 시가총액
        </Kicker>
        <Quote size="text-[clamp(1.3rem,3.3vw,2.3rem)]">
          조직이 생산의 전제였던{" "}
          <span className="text-emerald-600">시대는 끝났다.</span>
        </Quote>
        <PerCapitaBars className="mt-2 h-[34vh] w-auto max-w-full" />
        <div className="mt-1">
          <Lead>
            수만 명이 하던 가치를 이제 수십 명이. 송길영은{" "}
            <b className="text-slate-800">1명짜리 회사가 매출 50억으로 1,000억에 팔린</b> 예도
            듭니다.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 8.5 — 거대하면 죽는다 (大馬必死) --------------------------------- */
  {
    id: "giant-falls",
    bg: "from-slate-100 via-white to-rose-50",
    weather: { icon: "🌪️", label: "대형 저기압 소멸" },
    pace: "1:10",
    notes:
      "거대 조직이 오히려 불리해진다 — 大馬必死(큰 말은 반드시 죽는다). 이유 둘: ① 천재는 더 이상 대규모 조직에 안 들어간다(성과급을 나눠야 하니까). ② ‘김 부장 시스템’이 안 바뀐다 — 권한 가진 사람은 권한을 포기하지 않으니까. 직장인 공감 + 웃음 포인트.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🏚️" no="조직의 몰락">
          大馬必死 · 큰 말은 반드시 죽는다
        </Kicker>
        <Quote size="text-[clamp(1.5rem,4vw,2.8rem)]">
          이제 <span className="text-rose-600">거대하면 죽는다.</span>
        </Quote>
        <GiantFalls className="mt-3 h-[23vh] w-auto max-w-full" />
        <div className="mt-3 grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-white/80 p-4 text-left shadow-sm ring-1 ring-slate-900/5">
            <p className="text-sm font-bold leading-snug text-slate-700">
              🧠 <b>천재는 더 이상 대규모 조직에 안 들어간다</b> — 성과급을 나눠야 하니까.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 p-4 text-left shadow-sm ring-1 ring-slate-900/5">
            <p className="text-sm font-bold leading-snug text-slate-700">
              🪑 <b>‘김 부장 시스템’은 안 바뀐다</b> — 권한 가진 사람은 권한을 포기하지 않으니까.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  /* 9 — 경쟁의 대전환 -------------------------------------------------- */
  {
    id: "competition",
    bg: "from-rose-100 via-amber-50 to-sky-100",
    weather: { icon: "🌪️", label: "경쟁 난기류" },
    pace: "1:10",
    notes:
      "경쟁 상대가 바뀐다. 과거엔 법인끼리 싸웠지만, 이제 AI로 무장한 개인이 법인의 몫을 가져온다. 법인은 사람·회의·결재라는 오버헤드를 짊어진 채로. 그래서 ‘개인에게 건다’ — 천천히, 잠깐 멈춰 곱씹게.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🥊" no="04 · 경쟁의 대전환">
          누구와 싸우는가
        </Kicker>
        <Quote size="text-[clamp(1.4rem,3.6vw,2.6rem)]">
          개인과 법인이 붙으면,{" "}
          <span className="text-rose-600">개인에게 건다.</span>
        </Quote>
        <VersusDiagram className="mt-2 h-[26vh] w-auto max-w-full" />
        <div className="mt-2">
          <Lead>
            과거엔 법인끼리 싸웠습니다. 이제 AI로 무장한 개인이 법인의 몫을 가져옵니다 —
            법인은 <b className="text-slate-800">사람·회의·결재라는 무게(오버헤드)</b>를 짊어진 채로.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 10 — 현장 목격담 (재미있는 케이스) -------------------------------- */
  {
    id: "field",
    bg: "from-sky-100 via-white to-amber-50",
    weather: { icon: "🗺️", label: "전국 날씨" },
    pace: "2:00",
    notes:
      "송길영이 드는 생생한 사례들 — 가장 재미있는 파트. 광고: 유명 광고가 6월엔 1시간 촬영, 9월엔 촬영 0(AI로만). 법률: 작은 로펌 월 300만 원 인턴에 SKY 50명, 패럴리걸·어소시에이트는 챗GPT가 대신. 중개: OpenAI 8분 앱 시연, 24시간 다국어 AI 상담. 물류: 쿠팡 채용이 ‘소통’에서 ‘자동화’로. 하나씩 짚으며 ‘남 얘기 아니다’.",
    Content: () => {
      const cases = [
        { type: "ad", t: "광고", s: "6월 1시간 촬영 → 9월 촬영 0. 메타는 제작도구를 광고주에 직접" },
        { type: "law", t: "법률", s: "인턴에 SKY 50명. 패럴리걸·어소시에이트는 챗GPT가" },
        { type: "broker", t: "중개", s: "8분 만에 앱. 24시간·다국어 AI 상담" },
        { type: "logistics", t: "물류", s: "쿠팡 채용 ‘소통 담당’ → ‘자동화 담당’" },
      ];
      return (
        <div className="flex w-full max-w-6xl flex-col items-center">
          <Kicker icon="📍" no="현장">
            이미, 도처에서 벌어지는 일
          </Kicker>
          <Quote size="text-[clamp(1.2rem,3vw,2rem)]">
            패럴리걸과 어소시에이트가{" "}
            <span className="text-rose-500">사라졌다.</span>
          </Quote>
          <div className="mt-5 grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {cases.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl bg-white/80 p-4 text-center shadow-lg shadow-sky-900/5 ring-1 ring-slate-900/5"
              >
                <IndustryIcon type={c.type} className="mx-auto h-14 w-14 md:h-16 md:w-16" />
                <div className="mt-1 text-base font-extrabold text-slate-900">{c.t}</div>
                <p className="mt-1 text-[12px] font-semibold leading-snug text-slate-500">
                  {c.s}
                </p>
              </div>
            ))}
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
      "톤 전환. 직장인의 본능은 ‘버티기(존버)’지만 그건 전략이 아니다. 변화는 좋고 나쁨이 아니라 비·눈·바람처럼 그냥 온다. 우산을 들지, 비를 맞을지가 선택. 다음 장에서 그 선택을 던진다고 예고.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-center md:gap-14">
        <UmbrellaPerson className="w-[clamp(160px,22vw,260px)]" />
        <div className="text-center md:text-left">
          <Kicker icon="⛈️" no="경고">
            존버는 전략이 아니다
          </Kicker>
          <p className="text-[clamp(2.2rem,6.4vw,4.8rem)] font-black leading-[1.1] tracking-tight text-slate-900">
            “버티지
            <br />
            마세요”
          </p>
          <p className="mt-3 max-w-md text-[clamp(0.95rem,1.7vw,1.2rem)] font-semibold text-slate-600">
            변화는 비·눈처럼 그냥 옵니다. 버티는 게 아니라{" "}
            <b className="text-slate-800">우산을 드는 것</b>이 전략입니다.
          </p>
          <p className="mt-2 text-sm font-bold text-slate-400">— 송길영</p>
        </div>
      </div>
    ),
  },

  /* 12 — 축복이냐 재앙이냐 (선택) ------------------------------------- */
  {
    id: "choice",
    bg: "from-amber-200 via-sky-100 to-sky-200",
    weather: { icon: "🌈", label: "갬 / 흐림" },
    pace: "1:00",
    notes:
      "결국 선택의 문제. 같은 도구가 누군가에겐 축복, 누군가에겐 재앙. 가르는 건 ‘얼마나 빨리 받아들이느냐’. 오늘의 결론으로 연결: 버티지 말고 AI로 무장하라.",
    Content: () => (
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <Kicker icon="🔑" no="선택">
          같은 도구, 다른 결말
        </Kicker>
        <Quote size="text-[clamp(1.35rem,3.5vw,2.5rem)]">
          새로운 도구를 <span className="text-sky-600">축복</span>으로 받아들일지,{" "}
          <span className="text-slate-500">재앙</span>으로 경험할지.
        </Quote>
        <BlessingOrDisaster className="mt-3 h-[28vh] w-auto max-w-full" />
        <div className="mt-2">
          <Lead>
            가르는 건 단 하나, <b className="text-slate-800">얼마나 빨리 받아들이느냐</b>입니다.
          </Lead>
        </div>
      </div>
    ),
  },

  /* 13 — 그래서 나는? (성찰/액션) ------------------------------------- */
  {
    id: "reflection",
    bg: "from-sky-100 via-white to-emerald-50",
    weather: { icon: "🧭", label: "나의 예보" },
    pace: "1:20",
    notes:
      "청중이 직접 자기 일로. 20~30초 정적을 두고 ‘딱 하나만 정하세요’. OKR Party 연결: 분기 OKR에 ‘AI 활용’ KR 하나. 강요보다 초대하는 톤.",
    Content: () => {
      const acts = [
        "내 업무 1개에 AI 붙이기",
        "반복 작업 1개 자동화",
        "OKR에 ‘AI 활용’ KR 1개",
      ];
      return (
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <Kicker icon="✍️" no="05 · 그래서, 나는?">
            오늘 딱 하나만
          </Kicker>
          <h2 className="text-[clamp(1.6rem,4.2vw,2.9rem)] font-black tracking-tight text-slate-900">
            그래서 나는 무엇을 할 것인가?
          </h2>
          <Roadmap className="mt-3 h-[24vh] w-auto max-w-full" />
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
        <RainbowScene className="w-[clamp(200px,28vw,340px)]" />
        <div className="mt-3">
          <Quote size="text-[clamp(2rem,5.2vw,3.6rem)]">
            뭐라도, <span className="text-amber-600">좀 하세요.</span>
          </Quote>
        </div>
        <p className="mt-4 text-base font-bold text-slate-500">
          내일 당장 할 일 <b className="text-slate-800">1가지</b>를 정하고 나가세요.
        </p>
        <p className="mt-3 text-lg font-extrabold text-slate-600">감사합니다 🙇</p>
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
        <SourcesArt className="w-[clamp(150px,20vw,240px)]" />
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
          인용은 송길영 작가의 강연·인터뷰 워딩이며, 기업 수치는 공개된 인수·고용 사례
          기준입니다.
        </p>
      </div>
    ),
  },
];
