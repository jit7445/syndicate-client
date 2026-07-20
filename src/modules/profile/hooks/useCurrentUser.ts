import { getStorageItem } from "../../../utils/storageUtils";

export const useCurrentUser = () => {
  return {
    userId: getStorageItem<string>("userId"),
    userName: getStorageItem<string>("userName"),
    email: getStorageItem<string>("email"),
  };
};
