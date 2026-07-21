import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { toggleSaved } from "../../../redux/savedSlice";

// TODO: saved/bookmarked ids are pure in-memory Redux — lost on refresh, no
// cross-device sync. Needs either redux-persist or:
//   GET    /api/saved                    -> { transcriptIds: string[] }
//   POST   /api/saved/:transcriptId      -> ok
//   DELETE /api/saved/:transcriptId      -> ok
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
