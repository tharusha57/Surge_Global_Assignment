import { createSlice ,  configureStore } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : 'posts',
    initialState : {posts : []},
    reducers : {
        setPosts(state , action){
            state.posts = action.payload
        }
    }
})


export const store = configureStore({
    reducer : counterSlice.reducer
})
export const actions = counterSlice.actions
