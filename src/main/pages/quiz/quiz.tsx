/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './quiz.css';
import {
  fetchQuestions,
  submitScore,
  questionsSelector
} from '../../../store/dashboard/questions';
import QuizCard from '../../components/quizcard/index.lazy';
import ScoreSheet from './score/index.lazy';
import Loader from '../../components/Loader';

interface Question {
  questionId: string;
}

function Index() {
  const { data, isFetching, isError, success, errorMessage, successMessage } =
    useSelector(questionsSelector);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Array<any>>(_.cloneDeep(data));
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(submitScore({ score: score }));
    // dispatch(fetchQuestions(''));
    setShowScore(true);
  };

  const totalScore = () => {
    const correctAnswers = questions?.filter(
      (item) => item?.userAnswer?.isCorrect === true
    );
    setScore(correctAnswers.length);
  };

  const addUserAnswer = () => {
    const newQuetions = questions?.map((item: any) => {
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

  //   useEffect(() => {
  //     console.log('called qu');
  //     setQuestions(_.cloneDeep(data));
  //     setCurrentQuestion(0);
  //   }, [data]);

  useEffect(() => {
    addUserAnswer();
  }, [currentAnswer]);

  return (
    <div className='container'>
      {isFetching && <Loader />}
      {!isFetching && (
        <>
          <div className='d-flex'></div>
          {/* <div className={`${!showScore && "d-none"} ml-5`}>Score: {score}</div> */}
          {!showScore ? (
            <>
              <QuizCard
                question={questions[currentQuestion]}
                questionNumber={currentQuestion}
                totalQuestions={data.length}
                setCurrentAnswer={setCurrentAnswer}
                setCurrentQuestion={setCurrentQuestion}
                prev={previousQuestion}
                next={nextQuestion}
              />
              {currentQuestion === questions.length - 1 && (
                <div>
                  <button
                    className='btn btn-primary mt-4'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </>
          ) : (
            <ScoreSheet
              questions={questions}
              score={score}
              restart={restartQuiz}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Index;
