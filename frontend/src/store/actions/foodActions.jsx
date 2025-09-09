import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/apiconfig";

export const getFoods = createAsyncThunk(
  "food/getFoods",
  async (_, thunkAPI) => {
    try {
      const  {data}  = await axios.get("api/v1/food/reels");
            
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
