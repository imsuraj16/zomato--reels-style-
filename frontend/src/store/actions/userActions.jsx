import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../api/apiconfig"


export const registerUser = createAsyncThunk('user/registerUser',async(credentials,thunkAPI)=>{

    try {
        const {data} = await axios.post('/api/v1/auth/signup',credentials)
        return data.user;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const loginUser = createAsyncThunk('user/loginUser',async(credentials,thunkAPI)=>{

    try {
        const {data} = await axios.post('/api/v1/auth/login',credentials)
        return data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})