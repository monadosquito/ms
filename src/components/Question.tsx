import cs from './Question.module.css'
import { CheckList } from "./CheckList"

import { useState } from 'react'


type BasicQuestion = {
    id: number
    text: string
}

// Step 1: Add new product types for both question and its answer with the same tag type with the name 'type' by the 'BasicAnswer' type.
type Question = BasicQuestion & ({
    type: 'singleAnswer'
    answerOptions: string[]
} | {
    type: 'multiAnswer'
    answerOptions: string[]
}| {
    type: 'shortAnswer'
}| {
    type: 'longAnswer'
})

type BasicAnswer = {
    questionId: number
}

type Answer = BasicAnswer & ({
    type: 'singleAnswer'
    answerIx: number | null
} | {
    type: 'multiAnswer'
    answerIxs: number[]
}| {
    type: 'shortAnswer'
    answer: string
}| {
    type: 'longAnswer'
    answer: string
})

type QuestionProps = {
    addAnswer: (a: Answer) => React.FormEventHandler
    question: Question
    answer: Answer | null
}


function Quest ({ addAnswer, question, answer }: QuestionProps): JSX.Element {
    const [ selectedAns, setSelectedAns ] = useState<Answer | null>(answer)

    // Step 2: Add a case for them similar to the already defined ones.
    switch(question.type) {
        case('singleAnswer'): {
            const { text, answerOptions } = question
            const handleSubmit: React.FormEventHandler = (ev) => {
                const a: Answer = {
                    type: 'singleAnswer',
                    questionId: question.id,
                    answerIx: null,
                }
                addAnswer(selectedAns ?? a)(ev)
                setSelectedAns(null) 
            }

            const handleSelected = (
                ixs: number[]
            ): React.MouseEventHandler<HTMLInputElement> => () => {
                const a: Answer = {
                    type: 'singleAnswer',
                    questionId: question.id,
                    answerIx: ixs[0],
                }
                setSelectedAns(a)
            }

            return (
                <div className={cs.quest}>
                    <span className={cs.quest__text}>
                        {text}
                    </span>
                    <div>
                        <CheckList
                            key={question.id}
                            handleSelected={handleSelected}
                            xs={answerOptions}
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className={cs.quest__btn}
                        >
                            Answer
                        </button>
                    </div>
                </div> 
            )
        }
        case('multiAnswer'): {
            const { text, answerOptions } = question
            const handleSubmit: React.FormEventHandler = (ev) => {
                const a: Answer = {
                    type: 'multiAnswer',
                    questionId: question.id,
                    answerIxs: [],
                }
                addAnswer(selectedAns ?? a)(ev)
                setSelectedAns(null) 
            }

            const handleSelected = (
                ixs: number[]
            ): React.MouseEventHandler<HTMLInputElement> => () => {
                const a: Answer = {
                    type: 'multiAnswer',
                    questionId: question.id,
                    answerIxs: ixs,
                }
                setSelectedAns(a)
            }

            return (
                <div className={cs.quest}>
                    <span className={cs.quest__text}>
                        {text}
                    </span>
                    <div>
                        <CheckList
                            key={question.id}
                            handleSelected={handleSelected}
                            multiple
                            xs={answerOptions}
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className={cs.quest__btn}
                        >
                            Answer
                        </button>
                    </div>
                </div> 
            )
        }
        case('shortAnswer'): {
            const { text } = question
            const handleSubmit: React.FormEventHandler = ev => {
                const a: Answer = {
                    type: 'shortAnswer',
                    questionId: question.id,
                    answer: '',
                }
                addAnswer(selectedAns ?? a)(ev)
                setSelectedAns(null) 
            }

            const handleAnswerChange: React.ChangeEventHandler<
                HTMLInputElement
            > = ev => {
                const a: Answer = {
                    type: 'shortAnswer',
                    questionId: question.id,
                    answer: ev.target.value,
                }
                setSelectedAns(a)
            }

            return (
                <div className={cs.quest}>
                    <span className={cs.quest__text}>
                        {text}
                    </span>
                    <input
                        onChange={handleAnswerChange} key={question.id}
                        className={cs.quest__answer}
                        placeholder='Please, give a short answer.'
                    />
                    <div>
                        <button
                            onClick={handleSubmit}
                            className={cs.quest__btn}
                        >
                            Answer
                        </button>
                    </div>
                </div> 
            )
        }
        case('longAnswer'): {
            const { text } = question
            const handleSubmit: React.FormEventHandler = (ev) => {
                const a: Answer = {
                    type: 'longAnswer',
                    questionId: question.id,
                    answer: '',
                }
                addAnswer(selectedAns ?? a)(ev)
                setSelectedAns(null) 
            }

            const handleAnswerChange: React.ChangeEventHandler<
                HTMLTextAreaElement
            > = ev => {
                const a: Answer = {
                    type: 'longAnswer',
                    questionId: question.id,
                    answer: ev.target.value,
                }
                setSelectedAns(a)
            }

            return (
                <div className={cs.quest}>
                    <span className={cs.quest__text}>
                        {text}
                    </span>
                    <textarea
                        onChange={handleAnswerChange} key={question.id}
                        className={cs.quest__answer}
                        placeholder='Please, give a detailed answer.'
                    />
                    <div>
                        <button
                            onClick={handleSubmit}
                            className={cs.quest__btn}
                        >
                            Answer
                        </button>
                    </div>
                </div> 
            )
        }
        default: {
            throw new Error()
        }
    }
}


export type { Question, Answer }
export { Quest }
