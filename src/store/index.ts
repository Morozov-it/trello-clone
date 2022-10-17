import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { dashboardActions, dashboardReducer } from './dashboard/dashboard.slice'
import { modalsActions, modalsReducer } from './modals/modals.slice'

const actions = {
    ...dashboardActions,
    ...modalsActions,
}

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    modals: modalsReducer,
})

const persistConfig = {
    key: 'dashboard',
    storage, //local storage
    whitelist: ['dashboard'], //reducer name
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>

//Reusabled hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}