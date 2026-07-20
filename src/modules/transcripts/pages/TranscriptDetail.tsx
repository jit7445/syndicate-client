import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTranscriptById } from "../transcriptsService";
import type { Transcript } from "../types";
import { useCart } from "../../cart/hooks/useCart";
import { setBuyNowItem } from "../../checkout/buyNowStorage";
import { useAuthDialog } from "../../auth/context/AuthDialogContext";
import { isLoggedIn } from "../../../utils/authUtils";
import { APP_ROUTES } from "../../../constants/appRoutes";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import DetailHeader from "../components/detail/DetailHeader";
import PreviewSection from "../components/detail/PreviewSection";
import PurchaseCard from "../components/detail/PurchaseCard";
import AuthorCard from "../components/detail/AuthorCard";
import RelatedTranscripts from "../components/detail/RelatedTranscripts";

export default function TranscriptDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { openAuthDialog } = useAuthDialog();
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setTranscript(null);
    setNotFound(false);

    if (id) {
      fetchTranscriptById(id)
        .then(setTranscript)
        .catch(() => setNotFound(true));
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <div className="mx-auto max-w-[1400px] px-6 py-10 text-center text-text-secondary">
            We couldn't find that transcript.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <p className="p-6">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const goToBuyNowCheckout = () => {
    // Stored in sessionStorage (not router state) so it survives any full
    // navigation regardless of login state, without ever touching the
    // shared cart.
    setBuyNowItem(transcript);
    navigate(APP_ROUTES.checkout);
  };

  const handleBuyNow = () => {
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <DetailHeader transcript={transcript} />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PreviewSection
                preview={transcript.preview}
                onBuyClick={handleBuyNow}
              />
              <RelatedTranscripts
                domain={transcript.domain}
                excludeId={transcript.id}
              />
            </div>

            <div className="sticky top-6 flex flex-col gap-6 self-start lg:col-span-4">
              <PurchaseCard
                price={transcript.price}
                onAddToCart={() => addToCart(transcript)}
                onBuyNow={handleBuyNow}
              />
              <AuthorCard author={transcript.author} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
