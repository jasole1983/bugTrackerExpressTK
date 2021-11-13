import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { dispatch }) => {
        const res = await fetch('/api/users/').then((result) => result.json())
        dispatch(setUsers(res.users))
    }) 
    

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
            setUsers()
        },
        [fetchUsers.rejected](state) {
            state.status = 'rejected'
        }
    }
})

export const { getUser, addUser, delUser, updUser, setUsers } = userSlice.actions

export default userSlice.reducer