import React, {useEffect, useState} from 'react'
import './index.css'


function Index({question, questionNumber, totalQuestions, setCurrentAnswer, setCurrentQuestion, next, prev}:any) {

	const setUserAnswer = (answer:any) =>{
setCurrentAnswer(answer)
	}

	const [selected, setSelected] = useState<any>()
	//item.id === question?.userAnswer?.id  &&question?.userAnswer?.isCorrect && "bg-primary"
  
	return (
		<div  className="quizcard">
			<div>
				<div>
					<p><span>Question {questionNumber+1}</span>/{totalQuestions}</p> 
				</div>
				<div>
					<p>{question?.title}</p>
				</div>
		
			</div>
			<div>
<ul>
{question?.options?.map((item:any)=><li className={item.id === question?.userAnswer?.id? "bg-primary":""} key={item?.id}  onClick={()=>{setSelected(item.id)
	setUserAnswer(item)}}>{item?.title}</li>)	}
	
</ul>
			</div>
			<div>
				<button className="btn btn-primary mr-3" onClick={()=>setCurrentQuestion(prev())}>Prev</button>
			<button className="btn btn-primary ml-3" onClick={()=>setCurrentQuestion(next())}> Next</button>
				</div>
		</div>
	)
}

export default Index;
