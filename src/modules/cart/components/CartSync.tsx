import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { isLoggedIn } from "../../../utils/authUtils";

// Renders nothing — just hydrates the cart from the server once on app
// load when already signed in (see useCart.ts:loadCart for why this is
// needed in addition to the post-sign-in merge).
export default function CartSync() {
  const { loadCart } = useCart();

  useEffect(() => {
    if (isLoggedIn()) {
      loadCart().catch((err) => console.error("Failed to load cart:", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
