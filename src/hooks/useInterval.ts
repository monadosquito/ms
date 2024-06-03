import { useEffect } from "react"


const useInterval = (callback: () => void, delay: number): void => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            callback()
        }, delay)

        return () => {
            clearInterval(intervalId)
        }
    }, [ callback, delay ])
}


export { useInterval }
