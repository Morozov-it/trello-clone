import { bindActionCreators, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { dashboardActions, dashboardReducer } from './dashboard/dashboard.slice'

const actions = {
    ...dashboardActions,
}

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

//Reusabled hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}