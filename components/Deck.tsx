"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { META, slides } from "@/components/slides";

const TOTAL = slides.length;
const TARGET_SECONDS = 15 * 60; // 발표 목표 15분

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? 64 : -64,
    scale: 0.985,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -64 : 64,
    scale: 0.985,
  }),
};

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // 타이머
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // 시계 (클라이언트에서만)
  const [clock, setClock] = useState("");

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => Math.min(Math.max(i + dir, 0), TOTAL - 1));
  }, []);

  const goTo = useCallback(
    (n: number) => {
      setDirection(n >= index ? 1 : -1);
      setIndex(Math.min(Math.max(n, 0), TOTAL - 1));
    },
    [index],
  );

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  /* ---------------- 키보드 ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (["ArrowRight", "PageDown", " ", "Spacebar"].includes(k)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowLeft", "PageUp"].includes(k)) {
        e.preventDefault();
        go(-1);
      } else if (k === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (k === "End") {
        e.preventDefault();
        goTo(TOTAL - 1);
      } else if (k === "n" || k === "N" || k === "ㅜ") {
        setShowNotes((v) => !v);
      } else if (k === "t" || k === "T" || k === "ㅅ") {
        setRunning((v) => !v);
      } else if (k === "r" || k === "R" || k === "ㄱ") {
        setSeconds(0);
        setRunning(false);
      } else if (k === "f" || k === "F" || k === "ㄹ") {
        toggleFullscreen();
      } else if (k === "?" || k === "/") {
        setShowHelp((v) => !v);
      } else if (k === "Escape") {
        setShowHelp(false);
        setShowNotes(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, toggleFullscreen]);

  /* ---------------- 타이머 ---------------- */
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  /* ---------------- 시계 ---------------- */
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  /* ---------------- 터치 스와이프 ---------------- */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const slide = slides[index];
  const next = slides[index + 1];
  const progress = ((index + 1) / TOTAL) * 100;
  const overtime = seconds >= TARGET_SECONDS;
  const timerColor = overtime
    ? "text-rose-600"
    : seconds >= TARGET_SECONDS - 120
      ? "text-amber-600"
      : "text-emerald-600";

  return (
    <main
      className="fixed inset-0 select-none overflow-hidden bg-sky-100 text-slate-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 진행바 */}
      <div className="absolute inset-x-0 top-0 z-40 h-1.5 bg-slate-900/5">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* 슬라이드 */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        >
          {/* 은은한 배경 장식 */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          </div>

          {/* 콘텐츠 */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-7 pb-20 pt-20 md:px-20">
            <slide.Content />
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 상단 크롬: 브랜드 + 예보칩/시계 */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛅</span>
          <span className="text-sm font-black tracking-tight text-slate-700 md:text-base">
            {META.brand}
            <span className="ml-1 font-bold text-slate-400">
              {META.brandHanja}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-900/5 md:text-sm">
            {slide.weather.icon} {slide.weather.label}
          </span>
          {clock && (
            <span className="hidden rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-900/5 md:inline">
              {clock}
            </span>
          )}
        </div>
      </header>

      {/* 하단 컨트롤 */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-5 py-4 md:px-10">
        {/* 좌: 타이머 */}
        <button
          onClick={() => setRunning((v) => !v)}
          title="타이머 시작/정지 (T) · 리셋 (R)"
          className="flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-sm font-bold shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:bg-white"
        >
          <span className={running ? "animate-pulse" : ""}>
            {running ? "⏱️" : "⏸️"}
          </span>
          <span className={`font-mono tabular-nums ${timerColor}`}>
            {fmt(seconds)}
          </span>
          <span className="font-mono text-xs text-slate-400">/ 15:00</span>
        </button>

        {/* 중: 페이지 네비 */}
        <div className="flex items-center gap-2 md:gap-3">
          <NavBtn label="이전 (←)" onClick={() => go(-1)} disabled={index === 0}>
            ‹
          </NavBtn>
          <span className="min-w-[64px] text-center text-sm font-extrabold tabular-nums text-slate-600">
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="text-slate-400">/ {String(TOTAL).padStart(2, "0")}</span>
          </span>
          <NavBtn
            label="다음 (→)"
            onClick={() => go(1)}
            disabled={index === TOTAL - 1}
          >
            ›
          </NavBtn>
        </div>

        {/* 우: 보조 버튼 */}
        <div className="flex items-center gap-1.5">
          <IconBtn label="발표자 노트 (N)" active={showNotes} onClick={() => setShowNotes((v) => !v)}>
            📝
          </IconBtn>
          <IconBtn label="전체화면 (F)" onClick={toggleFullscreen}>
            ⛶
          </IconBtn>
          <IconBtn label="도움말 (?)" active={showHelp} onClick={() => setShowHelp((v) => !v)}>
            ?
          </IconBtn>
        </div>
      </footer>

      {/* 발표자 노트 패널 */}
      <AnimatePresence>
        {showNotes && (
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-40 max-h-[44vh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white/95 px-6 py-5 shadow-2xl backdrop-blur md:px-12"
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-extrabold text-sky-700">
                  📝 발표자 노트
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                    {String(index + 1).padStart(2, "0")} · {slide.weather.label}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                    ⏲ 권장 {slide.pace}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="rounded-full px-2 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-[15px] font-medium leading-relaxed text-slate-700 md:text-base">
                {slide.notes}
              </p>
              {next && (
                <p className="mt-3 text-sm font-semibold text-slate-400">
                  다음 ▸ {next.weather.icon} {next.id}
                </p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 도움말 오버레이 */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[min(92vw,460px)] rounded-3xl bg-white p-7 shadow-2xl"
            >
              <h3 className="text-xl font-black text-slate-900">⌨️ 단축키</h3>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-600">
                <Shortcut keys="→ / Space / PageDn">다음 슬라이드</Shortcut>
                <Shortcut keys="← / PageUp">이전 슬라이드</Shortcut>
                <Shortcut keys="Home / End">처음 / 마지막</Shortcut>
                <Shortcut keys="N">발표자 노트</Shortcut>
                <Shortcut keys="T / R">타이머 시작·정지 / 리셋</Shortcut>
                <Shortcut keys="F">전체화면</Shortcut>
                <Shortcut keys="? ">이 도움말</Shortcut>
              </ul>
              <p className="mt-5 text-xs text-slate-400">
                모바일에서는 좌우로 스와이프하세요. 화면 하단 버튼으로도 조작할 수
                있습니다.
              </p>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-5 w-full rounded-xl bg-sky-500 py-2.5 font-bold text-white transition hover:bg-sky-600"
              >
                닫기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ---------------- 작은 컴포넌트들 ---------------- */

function NavBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-2xl font-bold text-slate-700 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function IconBtn({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-base shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition ${
        active
          ? "bg-sky-500 text-white"
          : "bg-white/75 text-slate-700 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function Shortcut({
  keys,
  children,
}: {
  keys: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{children}</span>
      <kbd className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 ring-1 ring-slate-900/10">
        {keys}
      </kbd>
    </li>
  );
}
