import { ITask, IBoard } from "../../models"

export interface InitialState {
    tasks: { [key: string]: ITask }
    boards: { [key: string]: IBoard }
    boardOrder: string[]
}

// const initialData: Data = {
//     id: 'board-1',
//     tasks: {
//         'task-1': {
//              id: 'task-1',
//              title: 'Content-1',
//              description: 'description of task-1',
//              tags: [ { id: 'tag-1', text: 'attention!', color: 'red' }, ],
//              subTasks: [ { id: 'subTask-1', isDone: false, title: 'title of subtask' }, ],
//          },
//     },
//     boards: {
//         'board-1': {
//             id: 'board-1',
//             title: 'To do',
//             taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
//         },
//     },
//     boardOrder: ['board-1', 'board-2', 'board-3']
// }

// export default initialData

export type AddTaskPayload = Omit<ITask, 'isDragable' | 'description' | 'tags' | 'subTasks'> & { boardId: string }

export type AddBoardPayload = Omit<IBoard, 'isDragable' | 'isEdit' | 'taskIds'> 

export interface ChangeBoardOrderPayload {
    draggableId: string
    sourceIndex: number
    destinationIndex: number
}

export interface ChangeTaskOrderPayload {
    draggableId: string
    sourceIndex: number
    destinationIndex: number
    sourceBoardId: string
    destinationBoardId: string
}

export interface EditBoardTitlePayload {
    boardId: string
    title: string
}