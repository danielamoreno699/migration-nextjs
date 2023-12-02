import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { usersSlice } from './user/userSlice'
import { tournamentsSlice } from './tournaments/tournamentsSlice'
import { enrollmentsSlice } from './enrollments/enrollmentsSlice'

export const store = configureStore({

    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        tournaments: tournamentsSlice.reducer,
        enrollments: enrollmentsSlice.reducer

    }

})