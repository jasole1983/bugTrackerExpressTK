import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { csrfFetch } from "../../store/csrf";

export const fetchBugs = createAsyncThunk(
    'bugs/fetchBugs',
    async (_, { dispatch }) => {
        const res = await csrfFetch('/api/bugs').then((result) => result.json())
        dispatch(getBugs(res.bugs))
    }
)

export const makeNewBug = createAsyncThunk(
    'bugs/newBug',
    async (bug, { dispatch }) => {
        const { name, details, steps, priority, version, assignedTo, createdBy } = bug
        console.log("bug = ", {bug})
        const res = await csrfFetch('/api/bugs/new', {
            method: 'POST',
            body: JSON.stringify({name, details, steps, priority, version, createdBy, assignedTo})
        }).then((result) => result.json())
        if(res.ok) dispatch(addBug(bug))
    }
)

export const delBug = createAsyncThunk(
    'bugs/delBug',
    async (bug, { dispatch }) => {
        const res = await csrfFetch(`/api/bugs/${bug.id}`, {
            method: 'DELETE',
        }).then((result) => result.json())
        if (res.ok){
            dispatch(deleteBug(bug.id))
            return { message: res.message }
        } else {
            return { errors: res.errors }
        }
    }
)

const bugAdapter = createEntityAdapter({
    selectId: (bug) => bug.id,
    sortComparer: (a, b) => b.priority - a.priority
})

const bugSlice = createSlice({
    name: "bugs",
    initialState: bugAdapter.getInitialState(),
    reducers: {
        getBugs: bugAdapter.setAll,
        addBug: bugAdapter.addOne,
        deleteBug: bugAdapter.removeOne,
        upsertBug: bugAdapter.upsertOne,
        completeBug: (state, { payload }) => {
            
        },
    },
    extraReducers: {
        [fetchBugs.pending](state){
            state.status = "Loading"
        },
        [fetchBugs.fulfilled](state, { payload }){
            state.status = "Successful"
            getBugs(payload)
        },
        [fetchBugs.rejected](state){
            state.status = "Failed"
        },
        [delBug.pending](state){
            state.status = "Loading"
        },
        [delBug.fulfilled](state, { payload }){
            state.status = "Successful"
            deleteBug(payload)
        },
        [delBug.rejected](state){
            state.status = "Failed"
        },
    }
})

export default bugSlice.reducer

export const { getBugs, addBug, upsertBug, completeBug, deleteBug } = bugSlice.actions

export const bugSelectors = bugAdapter.getSelectors((state) => state.bugs)