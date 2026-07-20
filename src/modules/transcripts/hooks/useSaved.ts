import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { toggleSaved } from "../../../redux/savedSlice";

export const useSaved = (transcriptId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSaved = useSelector((state: RootState) =>
    state.saved.ids.includes(transcriptId),
  );

  return {
    isSaved,
    toggleSaved: () => dispatch(toggleSaved(transcriptId)),
  };
};
