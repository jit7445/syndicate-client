import { useEffect, useState } from "react";
import DialogModal from "../../../../components/dialog/DialogModal";
import AuthForm from "./form";
import type { AuthDialogMode } from "../../types";

type AuthDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  initialMode?: AuthDialogMode;
  onSuccess: () => void;
};

export default function AuthDialog({
  isOpen,
  handleClose,
  initialMode = "signin",
  onSuccess,
}: AuthDialogProps) {
  const [mode, setMode] = useState<AuthDialogMode>(initialMode);

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

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={mode === "signin" ? "Sign in" : "Sign up"}
    >
      <AuthForm
        mode={mode}
        setMode={setMode}
        handleClose={handleClose}
        handleSubmitClose={handleSubmitClose}
      />
    </DialogModal>
  );
}
