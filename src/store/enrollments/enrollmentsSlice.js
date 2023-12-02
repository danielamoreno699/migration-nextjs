import { createSlice } from '@reduxjs/toolkit';
export const enrollmentsSlice = createSlice({
    name: 'enrollments',
    initialState: {
        status: 'checking',
        enrollments: [],
        enrollmentInf: {},
        errorMessage: undefined
    },
    reducers: {
        pending: (state) =>{
            state.status = 'checking';
            state.enrollments = [];
            state.enrollmentInf= {};
            state.errorMessage = undefined
        },
        fulfilled : (state, {payload}) =>{
            state.status = 'succceded'
            state.enrollments = payload
            state.enrollmentInf = {}
            state.errorMessage = undefined
        },
        fulfilledEnrollment : (state, {payload}) =>{
            state.status = 'succceded'
            state.enrollments = []
            state.enrollmentInf = payload
            console.log('payload', payload)
            state.errorMessage = undefined
        },
        rejected : (state, {payload}) =>{
            state.status = 'failed'
            state.enrollments = [],
            state.enrollmentInf = {}
            state.errorMessage = payload
        },


       
    },
});
export const { pending, fulfilled, rejected,  fulfilledEnrollment } = enrollmentsSlice.actions;