import { getStorageItem } from "../../../utils/storageUtils";

// TODO: replace with a real API call.
// GET /api/profile -> { userId, userName, email, ... }
// Currently sourced only from the JWT claims cached in storage at sign-in
// (see authUtils.processToken), so any field not in the token is
// unavailable here until a dedicated profile endpoint exists.
export const useCurrentUser = () => {
  return {
    userId: getStorageItem<string>("userId"),
    userName: getStorageItem<string>("userName"),
    email: getStorageItem<string>("email"),
    companyName: getStorageItem<string>("companyName"),
  };
};
