import React, { useState } from 'react';
import { CardProps } from '../../../types/types';
import './index.css';

function Index({
  question,
  questionNumber,
  totalQuestions,
  setCurrentAnswer,
  setCurrentQuestion,
  next,
  prev
}: CardProps) {
  const setUserAnswer = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const [selected, setSelected] = useState<string>();
  //item.id === question?.userAnswer?.id  &&question?.userAnswer?.isCorrect && "bg-primary"

  return (
    <div className='quizcard'>
      <div>
        <div>
          <p>
            <span>Question {questionNumber + 1}</span>/{totalQuestions}
          </p>
        </div>
        <div>
          <p>{question?.title}</p>
        </div>
      </div>
      <div>
        <ul>
          {question?.options?.map((item: any) => (
            <li
              className={
                item.id === question?.userAnswer?.id ? 'bg-primary' : ''
              }
              key={item?.id}
              onClick={() => {
                setSelected(item.id);
                setUserAnswer(item);
                setCurrentQuestion(next());
              }}
            >
              {item?.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className='btn quiz-btn m-1'
          onClick={() => setCurrentQuestion(prev())}
        >
          Prev
        </button>
        <button
          className='btn quiz-btn m-1'
          onClick={() => setCurrentQuestion(next())}
        >
          {' '}
          Next
        </button>
      </div>
    </div>
  );
}

export default Index;
