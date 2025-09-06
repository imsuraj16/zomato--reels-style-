import { createSlice } from "@reduxjs/toolkit";
import { getFoods } from "../actions/foodActions";

const foodSlice = createSlice({
  name: "food",
  initialState: { foods: [], Loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.Loading = true;
        state.error = null;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.Loading = false;
        state.foods = action.payload;
        state.error = null;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
      });
  },
});


export default foodSlice.reducer;