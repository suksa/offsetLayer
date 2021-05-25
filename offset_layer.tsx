import React, { FC, useState, useEffect, useCallback, memo } from 'react'
import styled from 'styled-components'

interface P {
    target: HTMLElement
    children: JSX.Element
    move?: {
        top: number
        left: number
    }
    zIndex?: number
    closedLayer: () => void
}

const OffsetLayer: FC<P> = ({ target, children, move = { top: 0, left: 0 }, zIndex = 5, closedLayer }) => {
    const [targetDireact, setTargetDireact] = useState({ top: 0, left: 0 })
    const [bodyHeight, setBodyHeight] = useState(0)

    const setTargetOffest = useCallback((t: HTMLElement) => {
        let rect = t.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let offset = {
            top: rect.top + scrollTop + move.top,
            left: rect.left + scrollLeft + move.left,
        }
        setTargetDireact(offset)
    }, [])

    const stopPropagation = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
    }, [])

    const resize = useCallback(() => {
        setTargetOffest(target)
        setBodyHeight(document.body.offsetHeight)
    }, [])

    useEffect(() => {
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    return (
        <Style bodyHeight={bodyHeight} zIndex={zIndex} onClick={closedLayer}>
            <Inner targetDireact={targetDireact} onClick={stopPropagation}>
                { children }
            </Inner>
        </Style>
    )
}

interface IStyle {
    bodyHeight: number
    zIndex: number
}

interface IInner {
    targetDireact: {
        top: number
        left: number
    }
}

const Style = styled.div<IStyle>`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: ${({ bodyHeight }) => bodyHeight}px;
    z-index: ${({ zIndex }) => zIndex};
`
const Inner = styled.div<IInner>`
    position: absolute;
    top: ${({ targetDireact }) => targetDireact.top}px;
    left: ${({ targetDireact }) => targetDireact.left}px;
`

export default memo(OffsetLayer)
