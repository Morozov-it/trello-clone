/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { v4 } from 'uuid'
import { useActions, useAppSelector } from '../../store'
import { AddItem } from '../add-item'
import { Board } from '../board'
import { Popover } from '../controllers'
import './styles.scss'

const BoardList: React.FC = () => {
    const { tasks, boards, boardOrder } = useAppSelector((state) => state.dashboard)
    const { changeBoardOrder, changeTaskOrder, addBoard, clearAll } = useActions()

    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId, type } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) return

        //move boards
        if (type === 'board') {
            changeBoardOrder({
                sourceIndex: source.index,
                destinationIndex: destination.index,
                draggableId
            })
            return
        }

        changeTaskOrder({
            draggableId,
            sourceBoardId: source.droppableId,
            destinationBoardId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index
        })
    }, [])

    const onAddBoard = useCallback((title: string) => {
        const newBoard = { id: v4(), title }
        addBoard(newBoard)
    }, [])
    const onClearAll = useCallback(() => clearAll(), [])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId='all-boards'
                direction='horizontal'
                type='board'
            >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="boards-container"
                    >
                        {boardOrder.map((boardId, i) => {
                            const board = boards[boardId]
                            const boardTasks = board.taskIds.map((taskId) => tasks[taskId])

                            return <Board key={board.id} board={board} tasks={boardTasks} index={i}></Board>
                        })}
                        {provided.placeholder}
                        <div className='add-board'>
                            <AddItem name='board' onAdd={onAddBoard} />
                        </div>
                        <div className='clear-button'>
                            <Popover className='contained-button' onYes={onClearAll}>
                                Clear All
                            </Popover>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default React.memo(BoardList)