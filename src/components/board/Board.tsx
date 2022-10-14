/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { MdClear, MdDone, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { v4 } from 'uuid'
import { IBoard, ITask } from '../../models'
import { useActions } from '../../store'
import { AddItem } from '../add-item'
import { Button, Input, Popover } from '../controllers'
import { Task } from '../task'
import './styles.scss'

interface Props {
    board: IBoard
    tasks: ITask[]
    index: number
}

const Board: React.FC<Props> = ({ board, index, tasks }) => {
    const [title, setTitle] = useState(board.title)
    const [editTitle, setEditTitle] = useState(false)
    const { editBoardTitle, deleteBoard, addTask } = useActions()

    const onEdit = useCallback(() => setEditTitle(true), [])
    const offEdit = useCallback(() => setEditTitle(false), [])
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [])

    const onSaveTitle = useCallback(() => {
        editBoardTitle({ boardId: board.id, title })
        offEdit()
    }, [title])

    const onCancelTitle = useCallback(() => {
        offEdit()
        setTitle(board.title)
    }, [board.title])

    const onDeleteBoard = useCallback(() => deleteBoard({ boardId: board.id }), [])
    const onAddTask = useCallback((title: string) => {
        const newTaskPayload = { id: v4(), boardId: board.id, title }
        addTask(newTaskPayload)
    }, [])

    return (
        <Draggable
            isDragDisabled={!board.isDragable}
            draggableId={board.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='board'
                >
                    <div className='board-title'>
                        <div className='board-title__main' {...provided.dragHandleProps}>
                            {editTitle
                                ? <Input value={title} onChange={onChange} style={{ width: '100%' }}/>
                                :<h3>{board.title}</h3>
                            }
                        </div>
                        <div className='board-title__buttons'>
                            {editTitle
                                ? <>
                                    <Button className='outlined-button' onClick={onSaveTitle}><MdDone /></Button>
                                    <Button className='outlined-button' onClick={onCancelTitle}><MdClear /></Button>
                                </>
                                : <>
                                    <Button className='outlined-button' onClick={onEdit}><MdOutlineEdit /></Button>
                                    <Popover
                                        className='outlined-button'
                                        onYes={onDeleteBoard}
                                    >
                                        <MdOutlineDelete />
                                    </Popover>
                                </>
                            }
                        </div>
                    </div>
                    <Droppable
                        droppableId={board.id}
                        type='task'
                    >
                        {(provided, snapshot) => (
                            <>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='board-list'
                                >
                                    {tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
                                    {provided.placeholder}
                                </div>
                                <div className='add-task'>
                                    <AddItem name='task' onAdd={onAddTask} />
                                </div>
                            </>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default React.memo(Board)