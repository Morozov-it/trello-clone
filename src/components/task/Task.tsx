import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { MdMobiledataOff, MdOutlineDescription, MdOutlineLibraryAddCheck } from 'react-icons/md'
import { ITask } from '../../models'
import './styles.scss'

interface Props {
    task: ITask
    index: number
}

const Task: React.FC<Props> = ({ task, index }) => {
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
                    className='task'
                    aria-roledescription='Press space bar to lift the task' //for screen reader
                >
                    {/* <div className='handle' {...provided.dragHandleProps}/> */}
                    <div className='task-title'>
                        <h5>{task.title}</h5>
                        {!task.isDragable && <MdMobiledataOff />}
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