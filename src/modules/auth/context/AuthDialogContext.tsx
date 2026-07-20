import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import AuthDialog from "../components/auth-dialog";
import type { AuthDialogMode } from "../types";

type AuthDialogContextValue = {
  // Opens the sign-in/register dialog on whatever page it's called from —
  // no navigation involved. `onSuccess` (e.g. "now proceed to checkout with
  // this buy-now item") runs right after a successful sign-in/register.
  openAuthDialog: (mode?: AuthDialogMode, onSuccess?: () => void) => void;
};

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthDialogMode>("signin");
  const [onSuccessCallback, setOnSuccessCallback] = useState<
    (() => void) | null
  >(null);

  const openAuthDialog = useCallback(
    (newMode: AuthDialogMode = "signin", onSuccess?: () => void) => {
      setMode(newMode);
      setOnSuccessCallback(() => onSuccess ?? null);
      setIsOpen(true);
    },
    [],
  );

  const handleClose = () => setIsOpen(false);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccessCallback?.();
    setOnSuccessCallback(null);
  };

  return (
    <AuthDialogContext.Provider value={{ openAuthDialog }}>
      {children}
      <AuthDialog
        isOpen={isOpen}
        handleClose={handleClose}
        initialMode={mode}
        onSuccess={handleSuccess}
      />
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog(): AuthDialogContextValue {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  }
  return context;
}
