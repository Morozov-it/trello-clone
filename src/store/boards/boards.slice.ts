import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { storageKey } from "../../models"
import { InitialState, AddBoardPayload, AddTaskPayload } from "./models"

const initialState: InitialState = {
    tasks: {},
    boards: {},
    boardOrder: []
}

const setInitialState = (): InitialState => 
    !!localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey)!)
        : initialState

const boardsSlice = createSlice({
    name: 'boards',
    initialState: setInitialState(),
    reducers: {
        addTask: (state, { payload }: PayloadAction<AddTaskPayload>) => {
            state.tasks[payload.id] = {
                id: payload.id,
                title: payload.title,
                description: '',
                tags: [],
                subTasks: []
            }
            state.boards[payload.boardId].taskIds.push(payload.id)
        },
        addBoard: (state, { payload }: PayloadAction<AddBoardPayload>) => { 
            state.boards[payload.id] = {
                id: payload.id,
                title: payload.title,
                isDragable: true,
                isEdit: false,
                taskIds: []
            }
        },
    }
})

export const boardsActions = boardsSlice.actions
export const boardsReducer = boardsSlice.reducer