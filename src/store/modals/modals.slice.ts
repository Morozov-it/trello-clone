import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 } from "uuid"
import { InitialState, ITask } from "./models"

const initialState: InitialState = {
    task: null,
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openTask: (state, { payload }: PayloadAction<ITask>) => {
            state.task = payload
        },
        closeTask: (state) => {
            state.task = null
        },
        changeTaskTitle: (state, { payload }: PayloadAction<{value: string}>) => { 
            if (!!state.task) {
                state.task.title = payload.value
            }
        },
        changeTaskDesc: (state, { payload }: PayloadAction<{value: string}>) => { 
            if (!!state.task) {
                state.task.description = payload.value
            }
        },
        addSubTask: (state, { payload }: PayloadAction<{ title: string }>) => {
            state.task?.subTasks.push({ id: v4(), isDone: false, title: payload.title })
        },
        toggleSubTask: (state, { payload }: PayloadAction<{ id: string }>) => {
            if (!!state.task) { 
                const newSubTasks = state.task?.subTasks.map((subTask) => {
                    if (subTask.id === payload.id) return { ...subTask, isDone: !subTask.isDone }
                    return subTask
                })
                state.task.subTasks = newSubTasks
            }
        },
        removeSubTask: (state, { payload }: PayloadAction<{ id: string }>) => { 
            if (!!state.task) { 
                state.task.subTasks = state.task.subTasks.filter((subTask) => subTask.id !== payload.id)
            }
        },
        addTag: (state, { payload }: PayloadAction<{ text: string, color: string }>) => {
            state.task?.tags.push({ id: v4(), text: payload.text, color: payload.color })
        },
        removeTag: (state, { payload }: PayloadAction<{ id: string }>) => { 
            if (!!state.task) { 
                state.task.tags = state.task.tags.filter((tag) => tag.id !== payload.id)
            }
        },
    }
})

export const modalsActions = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer