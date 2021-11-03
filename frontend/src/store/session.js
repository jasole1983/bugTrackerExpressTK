import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const signup = createAsyncThunk(
    'session/signup',
    async (user, { dispatch }) => {
        const { name, email, password } = user;
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            })
        }).then((result)=>result.json())
        dispatch(setSessionUser(res))
        return res
    }
)

export const login = createAsyncThunk(
    'session/login',
    async (user, { dispatch }) => {
        const { email, password } = user;
        const res = await fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((result)=>result.json());
        console.log(res)
        dispatch(setSessionUser(user));
        return res;
    }
)


export const restoreUser = createAsyncThunk(
    'session/restoreUser',
    async () => {
        const res = await fetch('/api/session').then((result)=>result.json())
        console.log(res)
        return res;
    }
)

export const logout = createAsyncThunk(
    'session/logout',
    async (_, { dispatch }) => {
        const res = await fetch('/api/session', {
            method: 'DELETE',
        }).then((result)=>result.json())
        dispatch(removeSessionUser());
        return res;

    }
)


// export const login = createAsyncThunk(
//     'session/login', 
//     async (user, { dispatch }) => {

//         return dispatch(setSessionUser(user))        
//     })

// export const restoreUser = createAsyncThunk(
//     'session/restoreUser', 
//     async (user, { dispatch }) => {
//         return dispatch(setSessionUser(user))  
//     })
const sessionsSlice = createSlice({
    name: 'session',
    initialState: {
        user: {name: "Devon Straight", email: "fake@email.com", id: 99, admin: true},
    },
    reducers: {
        setSessionUser: (state, { payload }) => {
            state.user = payload
        },
        removeSessionUser: (state) => {
            state.user = null 
        }
    },
    extraReducers: {
        [login.pending](state){
            state.status = "Loading"
        },
        [login.fulfilled](state, { payload }){
            state.status = "Successful"
            state.user = payload
        },
        [login.rejected](state){
            state.status = "Rejected"
        },
        [logout.pending](state){
            state.status = "Loading"
        },
        [logout.fulfilled](state){
            state.status = "Successful"
            state.user = null
        },
        [logout.rejected](state){
            state.status = "Rejected"
        },
        [signup.pending](state){
            state.status = "Loading"
        },
        [signup.fulfilled](state, { payload }){
            state.status = "Successful"
            state.user = payload
        },
        [signup.rejected](state){
            state.status = "Rejected"
        },
    }

})

export const { setSessionUser, removeSessionUser } = sessionsSlice.actions

export default sessionsSlice.reducer

