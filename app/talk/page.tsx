import type { Metadata } from "next";
import Deck from "@/components/Deck";

export const metadata: Metadata = {
  title: "시대예보 — 직장도 직업도 없어질 때, 꼭 남겨야 하는 것",
  description:
    "송길영 『시대예보』 기반 · AI 전선이 바꾸는 일의 미래(경량문명). 직장인을 위한 OKR Party 세미나 발표 자료.",
};

export default function TalkPage() {
  return <Deck />;
}
