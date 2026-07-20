import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { consumeAuthTokenFromUrl } from "../utils/authUtils";
import FloatingSupport from "../components/support-drawer/FloatingSupport";
import { AuthDialogProvider } from "../modules/auth/context/AuthDialogContext";

export default function RootLayout() {
  const location = useLocation();
  // Matches Infollion/ValueChain's RootLayout/App gate: block children from
  // mounting until the SSO token handoff (if any) has been written to
  // storage, so a child like Header never reads isLoggedIn() too early and
  // gets stuck showing "logged out". Only blocks the very first render —
  // authCheckCompleted is never reset back to false on later navigations.
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  useEffect(() => {
    consumeAuthTokenFromUrl();
    setAuthCheckCompleted(true);
  }, [location.pathname, location.search]);

  if (!authCheckCompleted) {
    return null;
  }

  return (
    <AuthDialogProvider>
      <div className="bg-layout-background relative">
        <Outlet />
        <FloatingSupport />
      </div>
    </AuthDialogProvider>
  );
}
