import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getActivity = createAsyncThunk("get/activity",
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/showAcitvity', {
                headers: {
                    "authorization": token
                }
            });

            return data;

        } catch (error) {
            rejectWithValue(error.response.data)
        }
    });

export const DeleteAcitvity = createAsyncThunk("delete/acitivity", async (userData, { rejectWithValue }) => {
    try {
        const { id, token, toast } = userData;
        const { data } = await axios.post(`http://localhost:5000/deleteAcitvity/${id}`, {
            headers: {
                "authorization": token
            }
        });
        toast.success('Activity Oder Deleted Successfully');
        return data;
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
});

export const AddAcitvity = createAsyncThunk("add/activity", async (userData, { rejectWithValue }) => {
    try {
        const { token, toast, activity } = userData;
        const response = await axios.post('/addActivity', activity, {
            headers: {
                "authorization": token
            }
        });
        if (response.status === 200) {
            toast.success("Acitvity Order Added Successfully");
        }
        return response.data
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})
const Activity = createSlice({
    name: "actvity",
    initialState: {
        activity: [],
        success: false,
        loading: false,
        error: ""
    },
    extraReducers: {
        [getActivity.pending]: (state, action) => {
            state.loading = true
        },
        [getActivity.fulfilled]: (state, action) => {
            state.loading = false
            state.activity = action.payload
        },
        [getActivity.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [DeleteAcitvity.pending]: (state, action) => {
            state.loading = true;
        },
        [DeleteAcitvity.fulfilled]: (state, action) => {
            state.loading = false;

        },
        [DeleteAcitvity.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        },
        [AddAcitvity.pending]: (state, action) => {
            state.loading = true;
        },
        [AddAcitvity.fulfilled]: (state, action) => {
            state.loading = false;
            state.activity = action.payload
        },
        [AddAcitvity.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        }


    }

});

export default Activity.reducer;