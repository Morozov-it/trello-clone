import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppSelector } from '../../store'
import './styles.scss'

const BoardList: React.FC = () => {
    const { boards, boardOrder } = useAppSelector((state) => state.boards)

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result
    }

    return (
        <section>
            <DragDropContext onDragEnd={onDragEnd}>
                Boards
            </DragDropContext>
        </section>
    )
}

export default React.memo(BoardList)