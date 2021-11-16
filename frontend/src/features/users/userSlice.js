import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { csrfFetch } from "../../store/csrf";
import { setSessionUser } from "../../store/session";

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { dispatch }) => {
        const res = await fetch('/api/users/').then((result) => result.json())
        dispatch(setUsers(res.users))
    }) 
    
export const signup = createAsyncThunk(
    'user/signup',
    async (user, { dispatch }) => {
        const { name, email, password } = user;
        const res = await csrfFetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        const data = await res.json()
        dispatch(addUser(data.user))
        dispatch(setSessionUser(data.user))
        return data.user
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (user, { dispatch }) => {
        const { id } = user;
        const res = await csrfFetch(`/api/users/${id}`, {
            method: "DELETE",
        })
        const data = await res.json()
        dispatch(delUser(id))
        return data        
    }
)

const userAdapter = createEntityAdapter({
    selectId: (user) => user.id,
    })

const userSlice = createSlice({
    name: 'user',
    initialState: userAdapter.getInitialState(),
    reducers: {
        getUser: userAdapter.setOne,
        addUser: userAdapter.addOne,
        delUser: userAdapter.removeOne,
        updUser: userAdapter.updateOne,
        setUsers: userAdapter.setAll,
    },
    extraReducers: {
        [fetchUsers.pending](state) {
            state.status = 'loading'
        },
        [fetchUsers.fulfilled](state, { payload }) {
            state.status = 'fulfilled'
            setUsers(payload)
        },
        [fetchUsers.rejected](state) {
            state.status = 'rejected'
        },
        [signup.pending](state){
            state.status = "Loading"
        },
        [signup.fulfilled](state, { payload }){
            state.status = "Successful"
            addUser(payload)
        },
        [signup.rejected](state){
            state.status = "Rejected"
        },
        [deleteUser.pending](state){
            state.status = "Loading"
        },
        [deleteUser.fulfilled](state, { payload }){
            state.status = "Successful"
            delUser(payload)
        },
        [deleteUser.rejected](state){
            state.status = "Rejected"
        },
    }
})

export const { getUser, addUser, delUser, updUser, setUsers } = userSlice.actions

export default userSlice.reducer