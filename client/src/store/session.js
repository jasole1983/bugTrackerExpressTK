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
        dispatch(setSessionUser(res.user))
        return res
    }
)

export const login = createAsyncThunk(
    'session/login',
    async (user) => {
        const { email, password } = user;
        const res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await res.json()
        return data.user;
        
    }
)


export const restoreUser = createAsyncThunk(
    'session/restoreUser',
    async (_, dispatch) => {
        const res = await csrfFetch('/api/session');
        const data = await res.json();
        const { name, id, email, admin } = data.user
        return { name, id, email, admin };
    }
);

export const logout = createAsyncThunk(
    'session/logout',
    async (_, { dispatch }) => {
        const res = await csrfFetch('/api/session', {
            method: 'DELETE',
        })
        const data = res.json()
        if (data.ok)
            return dispatch(removeSessionUser())

        return dispatch(removeSessionUser());

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
        user: null,
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

