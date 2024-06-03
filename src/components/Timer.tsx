import cs from './Timer.module.css'

import { useInterval } from '../hooks/useInterval'

import { useEffect, useState } from 'react'


type TimerProps = {
    handleTimeOver: () => void
    minutesMax: number
    elemClass?: string
    toReset: boolean
}


const SECS_IN_MIN = 20


const Timer = ({
    handleTimeOver,
    minutesMax,
    elemClass,
    toReset=false,
}: TimerProps): JSX.Element => {
    const [ elapsedSecs, setElapsedSecs ] = useState<number | null>(null)
    const timeOver = elapsedSecs === 0

    useInterval(() => {
        setElapsedSecs(s => s !- (s !> 0 ? 1 : 0))
        if (timeOver) {
            handleTimeOver()
            localStorage.removeItem('elapsedSecs')
        }
    }, 1000)

    useEffect(() => {
        const secsMax = minutesMax * SECS_IN_MIN
        const loadedElapsedSecs = +(
            localStorage.getItem('elapsedSecs') ?? secsMax.toString()
        )
        setElapsedSecs(loadedElapsedSecs)
    }, [ minutesMax ])

    useEffect(() => {
        if (toReset) {
            const secsMax = minutesMax * SECS_IN_MIN
            setElapsedSecs(secsMax)
        }
    }, [ toReset, minutesMax ])

    const safeElapsedSecs = elapsedSecs ?? 0

    useEffect(() => {
        if (elapsedSecs !== null) {
            localStorage.setItem('elapsedSecs', elapsedSecs.toString())
        }
    }, [ elapsedSecs ])

    const mins = Math.floor(safeElapsedSecs / SECS_IN_MIN)
    const secsRem = safeElapsedSecs % SECS_IN_MIN
    const Mins = mins < 10 ? `0${mins}` : mins
    const SecsRem = secsRem < 10 ? `0${secsRem}` : secsRem

    return (
        <div className={`${cs.timer} ${elemClass}`}>
            <span>
                {`${Mins} : ${SecsRem}`}
            </span>
        </div>
    )
}


export { Timer }
