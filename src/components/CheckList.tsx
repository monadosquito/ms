import cs from './CheckList.module.css'

import React, { useState } from 'react'


type CheckListProps = {
    handleSelected: (ixs: number[]) => React.MouseEventHandler<HTMLInputElement>
    multiple?: boolean
    xs: string[]
}


const CheckList = ({
    handleSelected,
    multiple=false,
    xs,
}: CheckListProps): JSX.Element => {
    const [ currXsIxs, setCurrXsIxs ] = useState<number[]>([])

    const select = (ix: number): React.FormEventHandler => () => {
        const selected = currXsIxs.includes(ix)
        if (!multiple) {
            if (selected) {
                setCurrXsIxs([])
            } else {
                setCurrXsIxs([ ix ])
            }
        } else {
            if (selected) {
                setCurrXsIxs(currXsIxs.filter(i => i !== ix))
            } else {
                setCurrXsIxs([ ...currXsIxs, ix ])
            }
        }
    }

    const handle = (
        ix: number
    ): React.MouseEventHandler<HTMLInputElement> => (ev) => {
        select(ix)(ev)
        handleSelected([ ...currXsIxs, ix ])(ev)
    }

    const Opts = xs.map((o, i) =>
        <label key={i} >
            <input
                onClick={handle(i)}
                onChange={() => {}}
                className={cs['check-list__acc']}
                checked={currXsIxs.includes(i)}
                value={o}
                type='radio'
            />
            {o}
        </label>
    )
    
    return (
        <div className={cs['check-list']}>
            {Opts}
        </div>
    )
}


export { CheckList }
