import { useState, useEffect, useRef, useCallback } from 'react'

const useVisible = () => {
    const [visible, setVisible] = useState(false)
    const onVisible = useCallback(() => setVisible(true), [])
    const offVisible = useCallback(() => setVisible(false), [])
    const ref = useRef<any>(null)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            offVisible()
        }
    }, [offVisible])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [handleClickOutside])

    return { ref, visible, onVisible, offVisible }
}

export default useVisible