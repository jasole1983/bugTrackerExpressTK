import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const login = createAsyncThunk(
    'session/login',
    async (user, { dispatch }) => {
        const { credential, password } = user;
        const res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                credential,
                password,
            }),
        })
        const data = await res.json()
        dispatch(setSessionUser(data.user))
        return data.user;       
    }
)

export const restoreUser = createAsyncThunk(
    'session/restoreUser',
    async (_, { dispatch }) => {
        const res = await csrfFetch('/api/session');
        const data = await res.json();
        const { name, id, username, admin } = data.user
        dispatch(setSessionUser({ name, id, username, admin }));
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
    }
})

export const { setSessionUser, removeSessionUser } = sessionsSlice.actions

export default sessionsSlice.reducer

