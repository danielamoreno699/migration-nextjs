import { createSlice } from '@reduxjs/toolkit';
export const tournamentsSlice = createSlice({
    name: 'tournaments',
    initialState: {
        status: 'checking',
        tournaments: [],
        tournamentDetails: {},
        errorMessage: undefined
    },
    reducers: {
        pending: (state) =>{
            state.status = 'checking';
            state.tournaments = [];
            state.tournamentDetails = {};
            state.errorMessage = undefined
        },
        fulfilled : (state, {payload}) =>{
            state.status = 'succceded'
            state.tournaments = payload
            state.tournamentDetails = {}
            state.errorMessage = undefined
        },
        fulfilledTournament : (state, {payload}) =>{
            state.status = 'succceded'
            state.tournaments = []
            state.tournamentDetails = payload
            state.errorMessage = undefined
        },
        rejected : (state, {payload}) =>{
            state.status = 'failed'
            state.tournaments = [],
            state.tournamentDetails = {}
            state.errorMessage = payload
        },


       
    },
});
export const { pending, fulfilled, rejected,  fulfilledTournament } = tournamentsSlice.actions;