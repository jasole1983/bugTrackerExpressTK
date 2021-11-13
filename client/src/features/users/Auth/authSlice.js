import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin:false,
        LoggedIn:false,
    },
    reducers:{
        logIn: (state) =>{
            state.LoggedIn = true;
            state.admin = true;
        },
        logOut: (state) => {
            state.LoggedIn = false;
            state.admin = false;
        },
    },
    extraReducers:{

    }
});

export default authSlice.reducer;

export const { logIn, logOut } = authSlice.actions;