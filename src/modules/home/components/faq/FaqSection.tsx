import { useState, type ReactNode } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ExpandMoreIcon from "../../../../icons/ExpandMore/ExpandMore";
import FaqAccordionItem from "./FaqAccordionItem";
import { FAQ_SECTIONS } from "../../constants/homeConstants";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "About the transcripts": <DescriptionOutlinedIcon className="text-[#C27803]" />,
  "Browsing & buying": <SearchOutlinedIcon className="text-[#C27803]" />,
  "After purchase": <AttachMoneyIcon className="text-[#C27803]" />,
  "Account & compliance": <ShieldOutlinedIcon className="text-[#C27803]" />,
};

export default function FaqSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory((prev) => (prev === title ? null : title));
  };

  return (
    <div className="w-full bg-[#FAF7F2] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#23211F] sm:text-4xl tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-2.5 text-base text-[#78736B] max-w-xl mx-auto">
            Everything you need to know about buying and using session transcripts.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {FAQ_SECTIONS.map((section) => {
            const isExpanded = expandedCategory === section.title;
            const icon = CATEGORY_ICONS[section.title] || (
              <DescriptionOutlinedIcon className="text-[#C27803]" />
            );

            return (
              <div
                key={section.title}
                className="rounded-2xl border border-[#ECE8DF] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#D6C4A5]"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(section.title)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDF4E7]">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#1F1D1B]">
                        {section.title}
                      </h3>
                      <p className="text-xs font-normal text-[#8C867D] mt-0.5">
                        {section.items.length} questions
                      </p>
                    </div>
                  </div>

                  <div className="text-[#C27803] p-1">
                    <ExpandMoreIcon
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[#F2EDE4] px-5 sm:px-6 pb-5 pt-2">
                    {section.items.map((item) => (
                      <FaqAccordionItem key={item.question} {...item} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
