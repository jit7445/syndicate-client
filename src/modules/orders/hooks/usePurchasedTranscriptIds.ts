import { useEffect, useState } from "react";
import { isLoggedIn } from "../../../utils/authUtils";
import { fetchPurchasedTranscriptIds } from "../ordersService";

export const usePurchasedTranscriptIds = (): string[] => {
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      setPurchasedIds([]);
      return;
    }

    fetchPurchasedTranscriptIds()
      .then(setPurchasedIds)
      .catch(() => setPurchasedIds([]));
  }, []);

  return purchasedIds;
};
