import { createAppSlice } from "@/lib/create-app-slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Step1State } from "./schema";

const initialState: Step1State = {
  name: "",
  email: "",
  phone: "",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const step1Slice = createAppSlice({
  name: "step1",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // increment: create.reducer((state) => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // state.value += 1;
    // }),
    // decrement: create.reducer((state) => {
    //   // state.value -= 1;
    // }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     // state.value += action.payload;
    //   }
    // ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount);
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.value += action.payload;
    //     },
    //     rejected: (state) => {
    //       state.status = "failed";
    //     },
    //   }
    // ),
    setInfo: create.reducer((state, action: PayloadAction<Step1State>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    // selectCount: (counter) => counter.value,
    // selectStatus: (counter) => counter.status,
    selectStep1Info: (state) => state,
  },
});

// Action creators are generated for each case reducer function.
export const { setInfo } = step1Slice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStep1Info } = step1Slice.selectors;
