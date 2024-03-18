import { createAppSlice } from "@/lib/create-app-slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Step2State } from "./schema";

const initialState: Step2State = {
  plan: "arcade",
  billingType: "monthly",
};

export const step2Slice = createAppSlice({
  name: "step2",
  initialState,
  reducers: (create) => ({
    setInfo: create.reducer((state, action: PayloadAction<Step2State>) => {
      state.plan = action.payload.plan;
      state.billingType = action.payload.billingType;
    }),
  }),
  selectors: {
    selectStep2Info: (state) => state,
  },
});

export const { setInfo } = step2Slice.actions;

export const { selectStep2Info } = step2Slice.selectors;
