import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//채팅방 목록 조회
export const __getChatrooms = createAsyncThunk(
  "GET_CHATROOMS",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/chat/rooms/${payload}`,{
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken") 
        },
      });
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __enterChatroom = createAsyncThunk(
  "ENTER_CHATROOMS",
  async (payload, thunkAPI) =>{
    console.log(payload)
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/chat/rooms/otherUserInfo/${payload}`,{
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken") 
        },
      })
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  chatroom: [],
  enter:{
  messageId : 1,
  type : "",
  roomId : "",
  otherMemberId : "",
  message : "",
  createdAt : "",
  userId : "",
  count : "",
}
};

export const chatroom = createSlice({
  name: "chatroom",
  initialState,
  reducers: {},

  extraReducers: {
    [__getChatrooms.pending]: (state) => {
      state.isLoading = true;
    },
    [__getChatrooms.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chatroom = action.payload;
    },
    [__getChatrooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__enterChatroom.pending]: (state) => {
      state.isLoading = true;
    },
    [__enterChatroom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.enter = action.payload;
    },
    [__enterChatroom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});


export default chatroom.reducer;