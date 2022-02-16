export type Answer ={
	id: string,

}

export type Question = {
	title:string,
	options: string[],
	userAnswer: Answer
}

export type CardProps = {
	question: Question
	questionNumber: number,
	totalQuestions: number,
	setCurrentAnswer:Function,
	setCurrentQuestion: Function
	next: Function,
	prev: Function
}

export type ScoreProps = {
	questions: Question[],
	score: number,
	restart: Function

}