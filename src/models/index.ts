export interface ITag {
    id: string
    text: string
    color: string
}

export interface ISubTasks {
    id: string
    isDone: boolean
    title: string
}

export interface ITask {
    id: string
    title: string
    isDragable: boolean
    description: string
    tags: ITag[]
    subTasks: ISubTasks[]
}
export interface IBoard {
    id: string
    title: string
    isDragable: boolean
    isEdit: boolean
    taskIds: string[]
}