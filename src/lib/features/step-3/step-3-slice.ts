import { createAppSlice } from "@/lib/create-app-slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Step3State } from "./schema";

const initialState: Step3State = {
  customizableProfile: false,
  largerStorage: false,
  onlineStore: false,
};

export const step3Slice = createAppSlice({
  name: "step3",
  initialState,
  reducers: (create) => ({
    setInfo: create.reducer((state, action: PayloadAction<Step3State>) => {
      state.customizableProfile = action.payload.customizableProfile;
      state.largerStorage = action.payload.largerStorage;
      state.onlineStore = action.payload.onlineStore;
    }),
  }),
  selectors: {
    selectStep3Info: (state) => state,
  },
});

export const { setInfo } = step3Slice.actions;

export const { selectStep3Info } = step3Slice.selectors;
