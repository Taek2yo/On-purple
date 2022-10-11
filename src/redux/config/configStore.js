import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import logout from "../modules/user";
import post from "../modules/board"
import comment from "../modules/comment";
import main from "../modules/main";
import user from "../modules/signup";
import chatroom from "../modules/chatRoom"
const store = configureStore({
    reducer: {
        profile,
        post,
        comment,
        chatroom,
        mypage: detailSlice.reducer,
        logout,
        main,
        user
    }
})

export default store;