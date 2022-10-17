import React, { useCallback, useRef, useState } from 'react'
import { MdAddBox, MdClear } from 'react-icons/md'
import { Button, Input } from '../controllers'
import './styles.scss'

interface Props {
    onAdd: (text: string, color: string) => void
}

const PickUpTag: React.FC<Props> = ({ onAdd }) => {
    const refText = useRef<HTMLInputElement>(null)
    const refColor = useRef<HTMLInputElement>(null)
    const [edit, setEdit] = useState(false)

    const onEdit = useCallback(() => setEdit(true), [])
    const offEdit = useCallback(() => setEdit(false), [])

    const handleAdd = () => {
        if (!!refText.current?.value && !!refColor.current?.value) {
            onAdd(refText.current.value, refColor.current.value)
            offEdit()
        }
    }

    return edit
        ? (<div className='add-tag-edit'>
            <div className='add-tag-edit-inputs'>
                <Input ref={refText} type='text' placeholder='Enter title' className='add-tag-edit-inputs__text'/>
                <input ref={refColor} type='color' className='add-tag-edit-inputs__color'/>
            </div>
            <div className='add-tag-edit-buttons'>
                <Button onClick={handleAdd} className='contained-button'>Add tag</Button>
                <MdClear onClick={offEdit} className='add-tag-edit-buttons__clear' />
            </div>
        </div>)
        : (<div onClick={onEdit} className='add-tag-no-edit'>
            <MdAddBox />
            <p>Add tag</p>
        </div>)
}

export default React.memo(PickUpTag)