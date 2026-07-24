import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../../../../utils/hooks/useIsMobile";
import AuthForm from "./form";
import { MODE_COPY } from "../../constants";
import { authDialogPaperSx } from "./AuthDialog.styles";
import type { AuthDialogMode } from "../../types";

type AuthDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  initialMode?: AuthDialogMode;
  onSuccess: () => void;
};

export default function AuthDialog({ isOpen, handleClose, initialMode = "signin", onSuccess }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthDialogMode>(initialMode);
  const isMobile = useIsMobile();

  // AuthDialog is mounted persistently inside Header (just visually hidden
  // when closed), so `useState(initialMode)` only captures the prop once at
  // mount. Re-sync whenever the caller asks for a different mode (e.g. the
  // header's "Register" button), otherwise the dialog keeps showing whatever
  // mode it first mounted with.
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmitClose = () => {
    setMode(initialMode);
    onSuccess();
    handleClose();
  };

  const { title, subtitle } = MODE_COPY[mode];

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={authDialogPaperSx}
    >
      <div className="flex h-full">
        {!isMobile && (
          <div className="relative w-[42%] shrink-0 h-full overflow-hidden bg-[#212631]">
            <img
              src="/Design-01.svg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="relative flex-1 h-full p-6 sm:p-8 flex flex-col justify-center overflow-y-auto">
          <IconButton onClick={handleClose} aria-label="Close" className="absolute! right-3! top-3!">
            <CloseIcon fontSize="small" />
          </IconButton>

          <div className="flex flex-col items-center text-center">
            <img
              src="/assets/infollion_logo_200x100.png"
              alt="Infollion"
              className="h-16 w-auto mx-auto"
            />
            <h2 className="mt-1.5 text-[18px] font-medium text-slate-700">
              {title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          </div>

          <div className="mt-4">
            <AuthForm mode={mode} setMode={setMode} handleSubmitClose={handleSubmitClose} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
