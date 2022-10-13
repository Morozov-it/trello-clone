import { bindActionCreators, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { boardsActions, boardsReducer } from './boards/boards.slice'

const actions = {
    ...boardsActions,
}

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

//Reusabled hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}