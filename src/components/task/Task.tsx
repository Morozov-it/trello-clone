/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { MdDeleteOutline, MdMobiledataOff, MdOutlineDescription, MdOutlineLibraryAddCheck } from 'react-icons/md'
import { ITask } from '../../models'
import { useActions } from '../../store'
import { Popover } from '../controllers'
import './styles.scss'

interface Props {
    task: ITask
    index: number
    boardId: string
}

const Task: React.FC<Props> = ({ task, index, boardId }) => {
    const { openTask, toggleTask, deleteTask } = useActions()

    const onClick = useCallback(() => openTask(task), [task])
    const onToggleDrag = useCallback(() => toggleTask({ id: task.id }), [task])
    const onDeleteTask = useCallback(() => deleteTask({ id: task.id, boardId }), [task])

    return (
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={!task.isDragable}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} //handle
                    className={snapshot.isDragging ? 'task task-dragging' : 'task'}
                    onClick={onClick}
                    aria-roledescription='Press space bar to lift the task' //for screen reader
                >
                    {/* <div className='handle' {...provided.dragHandleProps}/> */}
                    <div className='task-title'>
                        <h5>{task.title}</h5>
                        <div onClick={(e) => e.stopPropagation()} className='task-title-buttons'>
                            {task.isDragable
                                ? <MdMobiledataOff onClick={onToggleDrag} className='task-title-buttons__drag'/>
                                : <MdMobiledataOff onClick={onToggleDrag} className='task-title-buttons__no-drag'/>
                            }
                            <Popover onYes={onDeleteTask}>
                                <MdDeleteOutline className='task-title-buttons__delete'/>
                            </Popover>
                        </div>
                        
                    </div>
                    <div className='task-description'>
                        {task.description && <MdOutlineDescription />}
                        {!!task.subTasks.length &&
                            <div className='task-description__subtasks'>
                                <MdOutlineLibraryAddCheck />
                                <span>{task.subTasks.filter((i) => i.isDone).length + '/' + task.subTasks.length}</span>
                            </div>
                        }
                        {task.tags.map((tag) => (
                            <div></div>
                        ))}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default React.memo(Task)