import { createContext } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});
