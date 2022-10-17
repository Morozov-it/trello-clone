import React, { useCallback } from 'react'
import { MdClear, MdDone } from 'react-icons/md'
import useVisible from '../../../utils/useVisible'
import Button from '../button'
import './styles.scss'

interface Props {
    children: React.ReactNode
    onYes: () => void
    className?: 'contained-button' | 'outlined-button'
    text?: string
}

const Popover: React.FC<Props> = ({ children, className, onYes, text = 'Are you sure?' }) => {
    const { ref, visible, onVisible, offVisible } = useVisible()

    const handleOk = useCallback(() => {
        onYes()
        offVisible()
    }, [offVisible, onYes])

    return (
        <div className='popover'>
            <div ref={ref} style={{ display: visible ? 'flex' : 'none' }} className='popover-body'>
                <p className='popover-body__text'>{text}</p>
                <div className='popover-body__buttons'>
                    <Button
                        onClick={handleOk}
                        className='outlined-button'
                        style={{ color: 'green' }}
                    >
                        <MdDone />{' Yes'}
                    </Button>
                    <Button
                        onClick={offVisible}
                        className='outlined-button'
                        style={{ color: 'red' }}
                    >
                        <MdClear />{' No'}
                    </Button>
                </div>
            </div>
            <Button onClick={onVisible} className={className}>{children}</Button>
        </div>
    )
}

export default React.memo(Popover)