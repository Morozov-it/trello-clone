/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import { MdClose, MdDeleteOutline, MdOutlineDescription, MdOutlineLibraryAddCheck } from 'react-icons/md'
import { useActions, useAppSelector } from '../../store'
import { Button, Input } from '../controllers'
import './styles.scss'
import { AddItem } from '../add-item'

const TaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [editTitle, setEditTitle] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    const task = useAppSelector((state) => state.modals.task!)
    const { changeTaskTitle, changeTask, changeTaskDesc, addSubTask, toggleSubTask, removeSubTask } = useActions()

    //save & close modal
    const handleClose = useCallback(() => onClose(), [])
    const onSaveTask = useCallback(() => changeTask(task), [task])

    //edit title
    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
        changeTaskTitle({ value: e.target.value }), [])
    const onEditTitle = useCallback(() => setEditTitle(true), [])
    const offEditTitle = useCallback(() => setEditTitle(false), [])

    //edit description
    const onChangeDesc = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => 
        changeTaskDesc({ value: e.target.value }), [])
    const onEditDesc = useCallback(() => setEditDesc(true), [])
    const offEditDesc = useCallback(() => setEditDesc(false), [])

    //edit subtasks
    const onAddSubTask = useCallback((title: string) => addSubTask({ title }), [])
    const onToggleSubTask = useCallback((id: string) => toggleSubTask({ id }), [])
    const onRemoveSubTask = useCallback((id: string) => removeSubTask({ id }), [])

    return (
        <div className='task-modal'>
            <div className='task-modal-title'>
                <div className='task-modal-title__main'>
                    {editTitle
                        ? <Input
                            onBlur={offEditTitle}
                            value={task.title}
                            onChange={onChangeTitle}
                        />
                        : <h3 onClick={onEditTitle}>{task.title}</h3>
                    }
                </div>
                <MdClose className='task-modal-title__close' onClick={handleClose} />
            </div>
            <div className="task-modal-description">
                <div className="task-modal-description__title">
                    <MdOutlineDescription />
                    <h4>Description</h4>
                </div>
                <div className="task-modal-description__body">
                    {editDesc 
                        ? <textarea
                            autoFocus
                            value={task.description}
                            onChange={onChangeDesc}
                            onBlur={offEditDesc}
                        />
                        : <p onClick={onEditDesc}>{task.description}</p>
                    }
                </div>
            </div>
            <div className="task-modal-subtasks">
                <div className="task-modal-subtasks__title">
                    <MdOutlineLibraryAddCheck />
                    <h4>Sub-tasks</h4>
                </div>
                <div className="task-modal-subtasks-body">
                    {task.subTasks.map((subTask) => (
                        <div key={subTask.id} className="task-modal-subtasks-body-item">
                            <label>
                                <input
                                    type='checkbox'
                                    checked={subTask.isDone}
                                    onChange={() => onToggleSubTask(subTask.id)}
                                />
                                {subTask.title}
                            </label>
                            <MdDeleteOutline
                                onClick={() => onRemoveSubTask(subTask.id)}
                                className='task-modal-subtasks-body-item__delete' />
                        </div>
                    ))}
                    <AddItem name='sub-task' onAdd={onAddSubTask}/>
                </div>
            </div>
            <div className="task-modal__save-button">
                <Button onClick={onSaveTask} className='contained-button'>Save</Button>
            </div>
        </div>
    )
}

export default React.memo(TaskModal)