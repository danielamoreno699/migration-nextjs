import { createSlice } from '@reduxjs/toolkit';
export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        status: 'checking',
        users: [],
        errorMessage: undefined
    },
    reducers: {
        pending: (state) =>{
            state.status = 'checking';
            state.users = [];
            state.errorMessage = undefined
        },
        fulfilled : (state, {payload}) =>{
            state.status = 'succceded'
            state.users = payload
            state.errorMessage = undefined
        },
        rejected : (state, {payload}) =>{
            state.status = 'failed'
            state.users = []
            state.errorMessage = payload
        },
        deleteUserSuccess: (state, { payload }) => {
            state.users = state.users.filter((user) => user._id !== payload.deletedUserId);
          },


       
    },
});
export const { pending, fulfilled, rejected, deleteUserSuccess } = usersSlice.actions;