import cs from './Slider.module.css';


type SliderProps = {
    segsCnt: number
    currSegIx: number
}

const Slider = ({ segsCnt, currSegIx }: SliderProps) => {
    const Segs = Array(segsCnt).fill(null).map((_, i) => {
        const segCurr = i === currSegIx
        const segPassed = i < currSegIx
        const segClass = cs.slider__seg + ' ' + (
            segCurr ? cs.slider__seg_curr
                    : segPassed
                    ? cs.slider__seg_passed
                    : ''
        )


        return (
            <span className={segClass} key={i}>
            </span>
        )
         
    })


    return (
        <aside className={cs.slider}>
            {Segs}
        </aside>
    )
}


export { Slider }
