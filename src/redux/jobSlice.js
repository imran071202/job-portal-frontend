import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        singleJob: null,
        adminJobs: [],
        appliedJobs: [],
        searchQuery: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setsingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload;
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { setAllJobs, setsingleJob, setAdminJobs, setAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer; 
