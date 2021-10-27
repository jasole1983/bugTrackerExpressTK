import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
// import { csrfFetch } from "../../store/csrf";

export const fetchBugs = createAsyncThunk(
    'bugs/fetchBugs',
    async (_, { dispatch }) => {
        const res = await fetch('/api/bugs').then((result) => result.json())
        dispatch(getBugs(res.bugs))
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
        createBugs: bugAdapter.addMany,
        updateBug: bugAdapter.upsertOne,
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
        }
    }
})

export default bugSlice.reducer

export const { getBugs, createBugs, updateBug, completeBug } = bugSlice.actions

export const bugSelectors = bugAdapter.getSelectors((state) => state.bugs)