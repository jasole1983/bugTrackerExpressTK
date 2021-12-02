import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { csrfFetch } from "../../store/csrf";

export const fetchBugs = createAsyncThunk(
    'bugs/fetchBugs',
    async (_, { dispatch }) => {
        const res = await csrfFetch('/api/bugs').then((result) => result.json())
        dispatch(getBugs(res.bugs))
    }
)

export const updateBug = createAsyncThunk(
    'bugs/updateBug',
    async (bug, { dispatch }) => {
        const { id, name, details, steps, priority, version, assignedTo, createdBy } = bug
        console.log({ bug })
        const res = await csrfFetch(`/api/bugs/update/${id}`, {
            method: 'POST',
            body: JSON.stringify({id, name, details, steps, priority, version, createdBy, assignedTo})
        }).then((result)=>result.json());
        dispatch(updBug(res.editBug))
    }
)

export const createBug = createAsyncThunk(
    'bugs/createBug',
    async (bug, { dispatch }) => {
        const { id, name, details, steps, priority, version, assignedTo, createdBy } = bug
        console.log({ bug })
        const res = await csrfFetch(`/api/bugs/create`, {
            method: 'POST',
            body: JSON.stringify({id, name, details, steps, priority, version, createdBy, assignedTo})
        }).then((result)=>result.json());
        dispatch(addBug(res.newBug))
    }
)

export const delBug = createAsyncThunk(
    'bugs/delBug',
    async (bugId, { dispatch }) => {
        const res = await csrfFetch(`/api/bugs/${bugId}`, {
            method: 'DELETE',
        }).then((result) => result.json())
        if (res.ok){
            dispatch(deleteBug(bugId))
            return { message: res.message }
        } else {
            return { errors: res.errors }
        }
    }
)

const bugAdapter = createEntityAdapter({
    selectId: (bug) => bug.id
})

const bugSlice = createSlice({
    name: "bugs",
    initialState: bugAdapter.getInitialState(),
    reducers: {
        getBugs: bugAdapter.setAll,
        addBug: bugAdapter.addOne,
        deleteBug: bugAdapter.removeOne,
        updBug: bugAdapter.updateOne,
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
        [updateBug.pending](state){
            state.status = "Loading"
        },
        [updateBug.fulfilled](state, { payload }){
            state.status = "Successful"
            updBug(payload)
        },
        [updateBug.rejected](state){
            state.status = "Failed"
        },
        [createBug.pending](state){
            state.status = "Loading"
        },
        [createBug.fulfilled](state, { payload }){
            state.status = "Successful"
            addBug(payload)
        },
        [createBug.rejected](state){
            state.status = "Failed"
        },

    }
})

export default bugSlice.reducer

export const { getBugs, addBug, updBug, deleteBug } = bugSlice.actions

export const bugSelectors = bugAdapter.getSelectors((state) => state.bugs)