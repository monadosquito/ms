import cs from './Test.module.css'
import { Timer } from './Timer';
import { Slider } from './Slider';
import { Question, Answer, Quest } from './Question';

import React, { FormEventHandler, useEffect, useState } from 'react';


const questions: Question[] = [
    {
        type: 'singleAnswer',
        id: 1,
        text: 'What is your gender?',
        answerOptions: [ 'Cheese', 'Milk', 'Bread' ],
    },
    {
        type: 'multiAnswer',
        id: 2,
        text: 'How many seconds have passed since the test started?',
        answerOptions: [ '1', '2', '3' ],
    },
    {
        type: 'shortAnswer',
        id: 3,
        text: 'What is your right leg`s name?',
    },
    {
        type: 'longAnswer',
        id: 4,
        text: 'What did you feel when you left hand said its first words?',
    }
]


const MINUTES_MAX = 20


type TestT = {
    minutesMax: number
    questions: Question[]
}

type TestProps = {
    elemClass?: string
}


const Test = ({ elemClass }: TestProps): JSX.Element => {
    const [ test, setTest ] = useState<TestT | null>(null)
    const [ answers, setAnswers ] = useState<Answer[] | null>(null)
    const [ questIx, setQuestIx ] = useState<number>(0)
    const [ toReset, setToReset ] = useState<boolean>(false)
    const [ timeOver, setTimeOver ] = useState<boolean>(false)

    useEffect(() => {
        const test: TestT = {
            minutesMax: MINUTES_MAX,
            questions,
        }
        // Read test from the server
        Promise.resolve(test).then(test => {
            setTest(test)
        })
        const currQuestIx = localStorage.getItem('questIx')
        if (currQuestIx) {
            const loadedAnswers = JSON.parse(
                localStorage.getItem( 'answers') || JSON.stringify([])
            )
            setQuestIx(+currQuestIx)
            setAnswers(loadedAnswers)
        } else {
            setAnswers([])
        }
    }, [])

    const addAnswer = (a: Answer): FormEventHandler => () => {
        if (test && answers) {
            setAnswers([ ...answers, a ])
            setQuestIx(questIx + 1)
            const { questions: quests } = test
            if (questIx + 1 === quests.length) {
                localStorage.removeItem('answers')
                localStorage.removeItem('questIx')

                // Send answers to the server
                const answersToSend = [ ...answers, a ]
                setAnswers([])
                console.log(answersToSend)
            } else if (questIx + 1 < quests.length) {
                localStorage.setItem(
                    'answers',
                    JSON.stringify([ ...answers, a ]),
                )
                localStorage.setItem('questIx', (questIx + 1).toString())
            }
        }
    }

    const Load =
        <main>
            <span>
                Loading ...
            </span> 
        </main>

    if (!test || !answers) return <>{Load}</>

    const repeat: React.MouseEventHandler<HTMLButtonElement> = () => {
        setAnswers([])
        setQuestIx(0)
        setToReset(!toReset)
        setTimeOver(false)
        localStorage.removeItem('answers')
        localStorage.removeItem('questIx')
    }

    const Congrats =
        <main className={`${cs.test} ${elemClass}`}>
            <h1>
                Congratulations! The test has been completed!
            </h1>
            <button onClick={repeat} className={cs['test__reset-btn']}>
                Repeat
            </button>
        </main>

    const { minutesMax: minsMax, questions: quests } = test

    if (questIx === quests.length) return <>{Congrats}</>

    const handleTimeOver = () => {
        setTimeOver(true)
        localStorage.removeItem('answers')
        localStorage.removeItem('questIx')
    }

    const TimeOver =
        <main className={`${cs.test} ${elemClass}`}>
            <h1>
                Time is over! You have ruined your life successfully!
            </h1>
            <button onClick={repeat} className={cs['test__reset-btn']}>
                Repeat
            </button>
        </main>

    if (timeOver) return <>{TimeOver}</>


    return (
        <main className={`${cs.test} ${elemClass}`}>
            <div className={cs.test__quest}>
                <div className={cs.test__title}>
                    <h1>
                        Testing
                    </h1>
                    <Timer
                        handleTimeOver={handleTimeOver}
                        minutesMax={minsMax}
                        elemClass={cs.test__timer}
                        toReset={toReset}
                    />
                </div>
                <Slider
                    segsCnt={quests.length}
                    currSegIx={questIx}
                />
                <Quest
                    addAnswer={addAnswer}
                    question={quests[questIx]} 
                    answer={answers[questIx]}
                />
            </div>
            <div>
                <button onClick={repeat} className={cs['test__reset-btn']}>
                    Reset
                </button>
            </div>
        </main>
    )
}

export { Test }
