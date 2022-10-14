import React from 'react'
import { classNames } from '../../../utils/classNames'
import './styles.scss'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...other }) => {
    const styles = classNames(
        'styled-button',
        className ?? ''
    )

    return (
        <button
            {...other}
            className={styles}
        >
            {children}
        </button>
    )
}

export default React.memo(Button)