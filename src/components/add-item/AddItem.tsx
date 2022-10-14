import React, { useCallback, useRef, useState } from 'react'
import { MdClear, MdAddCircleOutline } from 'react-icons/md'
import { Input, Button } from '../controllers'
import './styles.scss'

interface Props {
    name: string
    onAdd: (title: string) => void
}

const AddItem: React.FC<Props> = ({ name, onAdd }) => {
    const ref = useRef<HTMLInputElement>(null)
    const [edit, setEdit] = useState(false)

    const onEdit = useCallback(() => setEdit(true), [])
    const offEdit = useCallback(() => setEdit(false), [])

    const handleAdd = () => {
        if (!!ref.current?.value) {
            onAdd(ref.current.value)
            offEdit()
        }
    }

    return edit
        ? (<div className='add-item__edit'>
            <Input ref={ref} type='text' placeholder='Enter title' />
            <div className='add-item__edit-buttons'>
                <Button onClick={handleAdd} className='contained-button'>{`Add ${name}`}</Button>
                <MdClear onClick={offEdit} style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }} />
            </div>
        </div>)
        : (<div onClick={onEdit} className='add-item__no-edit'>
            <MdAddCircleOutline />
            <p>{`Add ${name}`}</p>
        </div>)
}

export default React.memo(AddItem)