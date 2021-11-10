/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.css';
import {
  fetchQuestions,
  questionsSelector
} from '../../../store/dashboard/questions';
import QuizCard from '../../components/quizcard/index.lazy';
import ScoreSheet from './score/index.lazy';

interface Question {
  questionId: string;
}

function Index() {
  const { data, isFetching, isError, success, errorMessage, successMessage } =
    useSelector(questionsSelector);
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [currentAnswer, setCurrentAnswer] = useState<Question>({
    questionId: ''
  });
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const nextQuestion = (): number => {
    if (currentQuestion < data.length - 1) return currentQuestion + 1;
    return currentQuestion;
  };

  const previousQuestion = (): number => {
    if (currentQuestion > 0) return currentQuestion - 1;
    return currentQuestion;
  };

  const totalScore = () => {
    const correctAnswers = questions.filter(
      (item) => item?.userAnswer?.isCorrect === true
    );
    console.log(setScore(correctAnswers.length));
  };

  const addUserAnswer = () => {
    const newQuetions = questions.map((item: any) => {
      if (item.id === currentAnswer.questionId) {
        item.userAnswer = currentAnswer;
      }

      return item;
    });
    setQuestions(newQuetions);
  };

  const restartQuiz = () => {
    dispatch(fetchQuestions(''));
    setShowScore(false);
  };

  useEffect(() => {
    document.title = 'Quiz';
  }, []);

  useEffect(() => {
    dispatch(fetchQuestions(''));
  }, []);

  useEffect(() => {
    totalScore();
  }, [questions]);

  useEffect(() => {
    if (success) setQuestions(_.cloneDeep(data));
    setCurrentQuestion(0);
  }, [success, data]);

  useEffect(() => {
    addUserAnswer();
  }, [currentAnswer]);

  return (
    <div className='container'>
      <div className='d-flex'></div>
      {/* <div className={`${!showScore && "d-none"} ml-5`}>Score: {score}</div> */}
      {!showScore ? (
        <>
          {' '}
          <QuizCard
            question={questions[currentQuestion]}
            questionNumber={currentQuestion}
            totalQuestions={data.length}
            setCurrentAnswer={setCurrentAnswer}
            setCurrentQuestion={setCurrentQuestion}
            prev={previousQuestion}
            next={nextQuestion}
          />
          <div>
            <button
              className='btn btn-primary mt-4'
              onClick={() => {
                dispatch(fetchQuestions(''));
                setShowScore(true);
              }}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <ScoreSheet questions={questions} score={score} restart={restartQuiz} />
      )}
    </div>
  );
}

export default Index;
