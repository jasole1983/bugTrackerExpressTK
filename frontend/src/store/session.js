import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const signup = createAsyncThunk(
    'session/signup',
    async (user, { dispatch }) => {
        const { name, email, password } = user;
        const res = await csrfFetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            })
        }).then((result)=>result.json())
        dispatch(setUser(res.user))
        return res
    }
)

// export const login = createAsyncThunk(
//     'session/login',
//     async (user, { dispatch }) => {
//         const { email, password } = user;
//         const res = await csrfFetch('/api/session', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         }).then((result)=>result.json());
//         console.log(res)
//         dispatch(setUser(res.user));
//         return res;
//     }
// )
const tempUser = {name: "Devon Straight", email: "fake@email.com", id: 99, admin: true}

export const login = createAsyncThunk(
    'session/login', 
    async (tempUser, { dispatch }) => {
        return dispatch(setUser(tempUser))        
    })

export const restoreUser = createAsyncThunk(
    'session/restoreUser', 
    async (tempUser, { dispatch }) => {
        return dispatch(setUser(tempUser))  
    })

// export const restoreUser = createAsyncThunk(
//     'session/restoreUser',
//     async (_, { dispatch }) => {
//         const res = await csrfFetch('/api/session').then((result)=>result.json());
//         console.log(res)
//         dispatch(setUser(res.user));
//         return res;
//     }
// )

export const logout = createAsyncThunk(
    'session/logout',
    async (_, { dispatch }) => {
        const res = await csrfFetch('/api/session', {
            method: 'DELETE',
        }).then((result)=>result.json())
        dispatch(removeUser());
        return res;

    }
)

const sessionsSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload.user
        },
        removeUser: (state) => {
            state.user = null 
        }
    }

})

export const { setUser, removeUser } = sessionsSlice.actions

export default sessionsSlice.reducer