import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/userActions";


const userSlice = createSlice({
    name : "user",
    initialState :{user:null,loading:false,error:null},
    reducers : {},
    extraReducers : (builder)=>{
        builder

        //usersignup
        
        .addCase(registerUser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload,
            state.error = null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload,
            state.user = null
        })

        //userlogin

        .addCase(loginUser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload,
            state.error = null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload,
            state.user = null
        })
    }
})

export default userSlice.reducer;