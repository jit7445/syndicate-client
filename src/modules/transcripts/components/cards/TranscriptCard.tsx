import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import { APP_ROUTES } from "../../../../constants/appRoutes";
import Button from "../../../../components/button/Button";
import Chip from "../../../../components/chip/Chip";
import CalendarTodayIcon from "../../../../icons/CalendarToday/CalendarToday";
import { setBuyNowItem } from "../../../checkout/buyNowStorage";
import { useCart } from "../../../cart/hooks/useCart";
import { useAuthDialog } from "../../../auth/context/AuthDialogContext";
import { isLoggedIn } from "../../../../utils/authUtils";
import CheckIcon from "../../../../icons/Check/Check";
import type { Transcript } from "../../types";

type TranscriptCardProps = {
  transcript: Transcript;
};

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
  const navigate = useNavigate();
  const { items: cartItems, addToCart } = useCart();
  const { openAuthDialog } = useAuthDialog();
  const isInCart = cartItems.some((item) => item.id === transcript.id);
  const [isTagsTooltipOpen, setIsTagsTooltipOpen] = useState(false);

  // Show at most 4 domain chips on the top line. Any remaining tags (e.g. 5th tag) go into [+1 more].
  const visibleCount = Math.min(4, transcript.tags.length);
  const visibleTags = transcript.tags.slice(0, visibleCount);
  const remainingTags = transcript.tags.slice(visibleCount);
  const remainingTagCount = remainingTags.length;

  const goToBuyNowCheckout = () => {
    // Stored in sessionStorage (not router state) so it survives any full
    // navigation regardless of login state, without ever touching the
    // shared cart.
    setBuyNowItem(transcript);
    navigate(APP_ROUTES.checkout);
  };

  const handleBuyTranscript = () => {
    if (isLoggedIn()) {
      goToBuyNowCheckout();
      return;
    }

    // Open the sign-in dialog right here on the current page instead of
    // routing through /checkout (which would bounce to the home page via
    // RequireAuth) — proceed straight to checkout once signed in.
    openAuthDialog("signin", goToBuyNowCheckout);
  };

  const previewText = transcript.preview.endsWith("...")
    ? transcript.preview
    : `${transcript.preview.replace(/\.+$/, "")}...`;

  return (
    <div className="relative rounded-lg border border-gray-200 bg-main-background p-4.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "text.secondary",
              flexShrink: 0,
            }}
          >
            Domain:
          </Typography>
          {visibleTags.map((tag) => {
            const isLong = tag.length > 25;
            const displayLabel = isLong ? `${tag.slice(0, 25)}...` : tag;
            return (
              <Tooltip key={tag} title={tag} arrow disableHoverListener={!isLong}>
                <Chip
                  label={displayLabel}
                  variant="outlined"
                  size="small"
                  sx={{
                    maxWidth: "140px",
                    "& .MuiChip-label": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </Tooltip>
            );
          })}
          {remainingTagCount > 0 && (
            <ClickAwayListener onClickAway={() => setIsTagsTooltipOpen(false)}>
              <Tooltip
                title={remainingTags.join(", ")}
                arrow
                open={isTagsTooltipOpen}
                onClose={() => setIsTagsTooltipOpen(false)}
                disableHoverListener
                disableFocusListener
                disableTouchListener
              >
                <span onClick={() => setIsTagsTooltipOpen((prev) => !prev)}>
                  <Chip
                    label={`+${remainingTagCount} more`}
                    variant="outlined"
                    size="small"
                    className="cursor-pointer"
                  />
                </span>
              </Tooltip>
            </ClickAwayListener>
          )}
        </div>
        <span className="shrink-0 text-base font-bold text-text-primary self-start">
          USD ${transcript.price}
        </span>
      </div>

      <Link to={APP_ROUTES.transcriptDetail.replace(":id", transcript.id)}>
        <h2 className="mt-1.5 text-xl font-bold text-text-primary hover:text-accent-2 transition-colors">
          {transcript.title}
        </h2>
        <p className="mt-1 text-text-secondary hover:text-text-primary transition-colors line-clamp-2">
          {previewText}
        </p>
      </Link>

      <div className="mt-2.5 flex items-center justify-between">
        <Tooltip title="Published Date" arrow>
          <span className="flex items-center gap-1 text-sm text-text-secondary cursor-pointer">
            <CalendarTodayIcon fontSize="inherit" />
            {transcript.date}
          </span>
        </Tooltip>
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            label={isInCart ? "In Cart" : "Add to Cart"}
            startIcon={isInCart ? <CheckIcon fontSize="small" /> : undefined}
            onClick={() => addToCart(transcript)}
          />
          <Button
            variant="contained"
            label="Buy Transcript"
            onClick={handleBuyTranscript}
          />
        </div>
      </div>
    </div>
  );
}
