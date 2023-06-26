import { createSlice } from "@reduxjs/toolkit";
const initialState={
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null 
}
const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.userinfo=action.payload;
            localStorage.setItem('userinfo', JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.userinfo= null
            localStorage.removeItem('userinfo');
        }
    }

})
export const {setUserData ,logout} = authSlice.actions
export default authSlice.reducer;