import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getMain = createAsyncThunk(
    "/main",
    async (payload, thunkAPI) => {
        try {
          
            const data = await axios.get(`${process.env.REACT_APP_HOST}/main`);
            //console.log(data.data.data);
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

const initialState = {
  data:[{
    imageUrl : [],
    nickname : "",
    age: 0,
    area: "",
    introduction: ""
  }],
  error: null,
  isLoading: false,
}

export const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers:{

    },  

extraReducers: {
    [__getMain.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getMain.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getMain.pending]: (state) => {
      state.isLoading = true;
    },
}})

export default mainSlice.reducer;