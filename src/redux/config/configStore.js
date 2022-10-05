import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import mypage from "../modules/mypage";
import logout from "../modules/user";
import post from "../modules/board"
import comment from "../modules/comment";
import main from "../modules/main";
import user from "../modules/signup";

const store = configureStore({
    reducer: {
        profile,
        post,
        comment,
        mypage,
        logout,
        main,
        user
    }
})

export default store;