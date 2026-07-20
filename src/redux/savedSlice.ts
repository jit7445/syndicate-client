import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SavedState = {
  ids: string[];
};

const initialState: SavedState = {
  ids: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    toggleSaved: (state, action: PayloadAction<string>) => {
      const isSaved = state.ids.includes(action.payload);
      state.ids = isSaved
        ? state.ids.filter((id) => id !== action.payload)
        : [...state.ids, action.payload];
    },
  },
});

export const { toggleSaved } = savedSlice.actions;
export default savedSlice.reducer;
