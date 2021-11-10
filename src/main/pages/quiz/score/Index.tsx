/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.css';
import {
  fetchQuestions,
  questionsSelector
} from '../../../../store/dashboard/questions';

interface Question {
  questionId: string;
}

function Index({ questions, score, restart }: any) {
  const { data, isFetching, isError, success, errorMessage, successMessage } =
    useSelector(questionsSelector);
  const dispatch = useDispatch();

  console.log(questions);

  useEffect(() => {
    document.title = 'Score';
  }, []);

  return (
    <div className='container score'>
      <div className='d-flex'>
        <div>
          You scored: {score}/{questions.length}
        </div>
      </div>
      <div>
        {questions.map((item: any, index: number) => (
          <div className='mt-3'>
            <div>
              <span>{index + 1}. </span>
              {item.title}
            </div>
            <div className='card questions '>
              <ul className=''>
                {item?.options?.map((option: any) => (
                  <li
                    className={` ${
                      option.isCorrect && 'bg-success text-white'
                    } ' ' 
${
  option.id === item?.userAnswer?.id && option.isCorrect
    ? 'bg-success text-white'
    : option.id === item?.userAnswer?.id
    ? 'bg-warning text-white'
    : ''
}
                   `}
                    key={option?.id}
                  >
                    {option?.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button className='btn btn-primary mt-4' onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Index;
