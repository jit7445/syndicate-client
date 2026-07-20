import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { APP_ROUTES } from "../../../../constants/appRoutes";
import Button from "../../../../components/button/Button";
import Chip from "../../../../components/chip/Chip";
import AccessTimeIcon from "../../../../icons/AccessTime/AccessTime";
import CalendarTodayIcon from "../../../../icons/CalendarToday/CalendarToday";
import { setBuyNowItem } from "../../../checkout/buyNowStorage";
import { useCart } from "../../../cart/hooks/useCart";
import { useAuthDialog } from "../../../auth/context/AuthDialogContext";
import { isLoggedIn } from "../../../../utils/authUtils";
import type { Transcript } from "../../types";

type TranscriptCardProps = {
  transcript: Transcript;
};

const VISIBLE_TAG_COUNT = 2;

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { openAuthDialog } = useAuthDialog();
  const [isTagsTooltipOpen, setIsTagsTooltipOpen] = useState(false);
  const visibleTags = transcript.tags.slice(0, VISIBLE_TAG_COUNT);
  const remainingTags = transcript.tags.slice(VISIBLE_TAG_COUNT);
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

  return (
    <div className="relative rounded-lg border border-gray-200 bg-main-background p-6">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Chip key={tag} label={tag} variant="outlined" size="small" />
        ))}
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

      <Link to={APP_ROUTES.transcriptDetail.replace(":id", transcript.id)}>
        <h2 className="mt-4 text-xl font-bold text-text-primary">
          {transcript.title}
        </h2>
      </Link>

      <p className="mt-3 text-text-secondary">{transcript.preview}</p>

      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-text-secondary">
          <AccessTimeIcon fontSize="inherit" />
          {transcript.readMinutes} min read
          <span>·</span>
          <CalendarTodayIcon fontSize="inherit" />
          {transcript.date}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-text-primary">
            USD ${transcript.price}
          </span>
          <Button
            variant="outlined"
            label="Add to Cart"
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
