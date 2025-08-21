import originalSlice from "@/state/modules/animals/slice";
import { createSlice } from "@reduxjs/toolkit";

const animalsSlice = createSlice({
  initialState: originalSlice.getInitialState(),
  name: originalSlice.name,
  reducers: {
    ...originalSlice.caseReducers,
    freedom: () => {
      return [];
    }
  },
  selectors: originalSlice.getSelectors()
});

export default animalsSlice;
