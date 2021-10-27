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
    selectId: ({id}) => id,
    sortComparer: (a, b) => b.priority - a.priority
})

const bugSlice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        getBugs: bugAdapter.setAll,
        createBugs: bugAdapter.addMany,
        updateBug: bugAdapter.upsertOne,
        completeBug: (state, { payload }) => {
            
        },
    },
    extraReducers: {

    }
})

fetchBugs()

export default bugSlice.reducer

export const { getBugs, createBugs, updateBug, completeBug } = bugSlice.actions