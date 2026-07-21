import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { APP_ROUTES } from "../../../../constants/appRoutes";
import type { Transcript } from "../../types";

type DetailHeaderProps = {
  transcript: Transcript;
};

export default function DetailHeader({ transcript }: DetailHeaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const allTags = Array.from(
    new Set([transcript.domain, ...transcript.tags]),
  );

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-text-secondary min-w-0">
        <Link
          to={APP_ROUTES.transcripts}
          className="underline hover:no-underline text-text-primary font-medium shrink-0"
        >
          All transcripts
        </Link>
        <span className="shrink-0">/</span>
        <span
          title={transcript.domain}
          className="text-text-primary font-medium truncate max-w-xl"
        >
          {transcript.domain}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1">
        {canScrollLeft && (
          <IconButton
            onClick={() => handleScroll("left")}
            className="shrink-0 bg-white! border! border-gray-300! shadow-xs! hover:bg-slate-100! p-1.5!"
            aria-label="Scroll left"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex w-full items-center gap-1.5 overflow-x-auto pb-1.5 pt-1 scroll-smooth"
        >
          {allTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex shrink-0 items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-text-primary shadow-2xs hover:border-accent-2 hover:shadow-xs transition-all cursor-default whitespace-nowrap"
            >
              {tag}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <IconButton
            onClick={() => handleScroll("right")}
            className="shrink-0 bg-white! border! border-gray-300! shadow-xs! hover:bg-slate-100! p-1.5!"
            aria-label="Scroll right"
          >
            <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        )}
      </div>

      <h1 className="mt-2.5 text-3xl font-bold leading-snug text-text-primary break-words">
        {transcript.title}
      </h1>
    </div>
  );
}
