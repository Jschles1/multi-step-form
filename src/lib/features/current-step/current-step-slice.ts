import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CurrentStepState {
  currentStep: number;
}

const initialState: CurrentStepState = {
  currentStep: 1,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const currentStepSlice = createSlice({
  name: "currentStep",
  initialState,
  reducers: (create) => ({
    setStep: create.reducer((state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStep: (state) => state.currentStep,
  },
});

// Action creators are generated for each case reducer function.
export const { setStep } = currentStepSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStep } = currentStepSlice.selectors;
