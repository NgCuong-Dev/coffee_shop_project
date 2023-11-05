import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value:0,
}

export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        increment: (state) => {
            state.value = state.value +10
          },
          decrement: (state) => {
            state.value -= 10
          },
    }
})
export const { increment, decrement } = userSlice.actions

export default userSlice.reducer