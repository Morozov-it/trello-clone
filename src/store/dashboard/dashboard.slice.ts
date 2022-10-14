import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    InitialState,
    AddBoardPayload,
    AddTaskPayload,
    ChangeBoardOrderPayload,
    EditBoardTitlePayload,
    ChangeTaskOrderPayload,
} from "./models"

const initialState: InitialState = {
    tasks: {},
    boards: {},
    boardOrder: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addTask: (state, { payload }: PayloadAction<AddTaskPayload>) => {
            state.tasks[payload.id] = {
                id: payload.id,
                title: payload.title,
                description: '',
                isDragable: true,
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
            state.boardOrder.push(payload.id)
        },
        editBoardTitle: (state, { payload }: PayloadAction<EditBoardTitlePayload>) => {
            state.boards[payload.boardId].title = payload.title
        },
        deleteBoard: (state, { payload }: PayloadAction<{ boardId: string }>) => { 
            delete state.boards[payload.boardId]
            const index = state.boardOrder.indexOf(payload.boardId)
            state.boardOrder.splice(index, 1)
        },
        changeTaskOrder: (state, { payload }: PayloadAction<ChangeTaskOrderPayload>) => { 
            const sourceBoardId = payload.sourceBoardId
            const destinationBoardId = payload.destinationBoardId

            //moving into one board
            if (sourceBoardId === destinationBoardId) {
                const newTaskOrder = Array.from(state.boards[sourceBoardId].taskIds)
                newTaskOrder.splice(payload.sourceIndex, 1)
                newTaskOrder.splice(payload.destinationIndex, 0, payload.draggableId)

                state.boards[sourceBoardId].taskIds = newTaskOrder
                return
            }

            //moving from one board to another
            const sourceTaskOrder = Array.from(state.boards[sourceBoardId].taskIds)
            const destinationTaskOrder = Array.from(state.boards[destinationBoardId].taskIds)

            sourceTaskOrder.splice(payload.sourceIndex, 1)
            destinationTaskOrder.splice(payload.destinationIndex, 0, payload.draggableId)

            state.boards[sourceBoardId].taskIds = sourceTaskOrder
            state.boards[destinationBoardId].taskIds = destinationTaskOrder
        },
        changeBoardOrder: (state, { payload }: PayloadAction<ChangeBoardOrderPayload>) => {
            const newOrder = Array.from(state.boardOrder)
            newOrder.splice(payload.sourceIndex, 1)
            newOrder.splice(payload.destinationIndex, 0, payload.draggableId)

            state.boardOrder = newOrder
        },
        clearAll: (state) => initialState,
    }
})

export const dashboardActions = dashboardSlice.actions
export const dashboardReducer = dashboardSlice.reducer