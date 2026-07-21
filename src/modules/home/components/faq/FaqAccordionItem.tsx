import { useState } from "react";
import ExpandMoreIcon from "../../../../icons/ExpandMore/ExpandMore";
import type { FaqItem } from "../../constants/homeConstants";

export default function FaqAccordionItem({ question, answer }: FaqItem) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#F2EDE4] last:border-b-0 py-3.5">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between gap-4 text-left text-sm sm:text-base font-semibold text-[#2D2B29] hover:text-[#111111] transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ExpandMoreIcon
          fontSize="small"
          className={`shrink-0 text-[#6B655C] transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && (
        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#5E5952]">
          {answer}
        </p>
      )}
    </div>
  );
}
