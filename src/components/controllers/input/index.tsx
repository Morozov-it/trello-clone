import React from 'react'
import { classNames } from '../../../utils/classNames'
import './styles.scss'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ children, className, ...other }, ref) => {
    const styles = classNames(
        'styled-input',
        className ?? ''
    )

    return (
        <input
            ref={ref}
            {...other}
            autoFocus
            className={styles}
        />
    )
})

export default React.memo(Input)