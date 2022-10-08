import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";



//user info 정보 불러오기
export const __getUser = createAsyncThunk(
  "GET_USER",
  async (payload, thunkAPI) => {
    try {
      // 
      // const userToken = localStorage.getItem("Authorization")

      // var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NDcwNjUyNn0.z4A64I9f088GtowfubT6mgvvfNMzhUKXdFeOvjjDJxg";
      // var decoded = jwt_decode(token);

      // console.log('decoded is', decoded);


      const data = await axios.get(`${process.env.REACT_APP_HOST}/user/me`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),   //accesstoken
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
<<<<<<< HEAD
      //console.log('get data is', data.data.data)
      return thunkAPI.fulfillWithValue(data.data);
=======
      console.log('get data is', data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
>>>>>>> 90f3ae16ea37801312a2b1ec56e136b0c881751e
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __getmyname = createAsyncThunk(
  "GET_USER_NAME",
  async (payload, thunkAPI) => {
    try {
      // 
      // const userToken = localStorage.getItem("Authorization")

      // var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NDcwNjUyNn0.z4A64I9f088GtowfubT6mgvvfNMzhUKXdFeOvjjDJxg";
      // var decoded = jwt_decode(token);

      // console.log('decoded is', decoded);


      const data = await axios.get(`${process.env.REACT_APP_HOST}/user/me`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),   //accesstoken
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      console.log('get data is', data.data.data.nickname)
      return thunkAPI.fulfillWithValue(data.data.data.nickname);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


const initialState = {
  user: {
    userId: 0,
    nickname: "",
    imageUrl: "",
    imgList: "",
  },
  error: null,
  isLoading: false,
}

export const signupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {


    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      console.log("action is", action.payload)
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getUser.pending]: (state) => {
      state.isLoading = true;
    },


  }
})

export let { UserData } = signupSlice.actions;

export default signupSlice.reducer;