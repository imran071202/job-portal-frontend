import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({

    name: "application",
    initialState: {
        applicant:[]

    },
    reducers: {
        //actions
        setApplicant: (state, action) => {
            state.applicant = action.payload
        }
    }
})
export const { setApplicant } = applicationSlice.actions
export default applicationSlice.reducer