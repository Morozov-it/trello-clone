import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import './styles.scss'

interface Props {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onClick = useCallback(() => onClose(), [])

    if (open) {
        return createPortal(
            <div className='modal' onClick={onClick}>
                <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div> 
            </div>,
            document.body
        )
    } else return null
}

export default Modal