"use client"

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { ChangeEvent } from '@/types/type'
import { lineSpinner } from 'ldrs'

type Quiz = {
  _id: string;
  answer: string;
  options: string[];
  question: string
}

function Student() {

  const [quizes, setQuizes] = useState<Quiz[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
        try{
          const response = await axios.get('/api/get')
          const data = response.data
          console.log(data.data)
          setQuizes(data.data)
        } catch (error: any) {
          console.log('Error fetching quizes: ', error.message || error)
        } finally {
          setLoading(false)
        }
    }
    setTimeout(() => {
      fetchData()
    }, 500)
  }, [])


  const handleOptionChange = (event: ChangeEvent) => {
    setAnswers({
      ...answers,
      [quizes[questionIndex]._id]: event.target.value
    })
  }

  const handleNextQuestion = () => {
    if(questionIndex < quizes.length - 1){
      setQuestionIndex(questionIndex + 1)
    }
  }

  const handleSubmit = () => {
      let correctAnswers = 0

      quizes.forEach((quiz) => {
        if(answers[quiz._id] === quiz.answer){
          correctAnswers++
        }
      })
      setResult(correctAnswers)
  }

  
  const currentQuiz = quizes[questionIndex]



  if (loading) {
   lineSpinner.register()
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-800 to-stone-200">
        <l-line-spinner size={40} stroke={3} speed={1}></l-line-spinner>
      </div>
    );
  }


  if(result !== null){
    return(
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800">
        <h1 className="text-3xl font-bold text-green-600">Final Result</h1>
          <p className='mt-4 text-lg'>
            You answered{" "}
            <span className="font-semibold text-green-400">{result}</span> out of{" "}
            <span className="font-semibold text-green-400">{quizes.length}</span>{" "}
            questions correctly!
          </p>
      </div>
    )
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-800 to-stone-200'>
      <h1 className='text-4xl font-bold mb-6'>Student page</h1>
      <div className='w-full max-w-lg bg-gray-300 shadow-md rounded-md p-6'>
        <form>
          <h2 className='text-xl font-medium mb-4 text-gray-800'>
            Question {questionIndex + 1}:<br/>
            <span className='font-semibold'>{currentQuiz?.question}</span>
          </h2>
          <div className='space-y-3'>
            {currentQuiz?.options.map((option, index) => (
              <div key={index} className='flex items-center'>
                <input 
                type="radio" 
                name={`question-${currentQuiz._id}`}
                value={option}
                checked={answers[currentQuiz._id] === option}
                onChange={handleOptionChange}
                className='mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                />
                <label className='text-gray-700'>{option}</label>
              </div>
            ))}
          </div>
          <div className='mt-6 flex justify-end'>
            {questionIndex < quizes.length - 1 && (
              <button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuiz._id]}
                className={`px-4 py-2 rounded-md ${
                  answers[currentQuiz._id]
                  ? 'bg-violet-600 text-white hover:bg-violet-700'
                  : 'bg-gray-400 text-gray-300 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}

            {questionIndex === quizes.length - 1 && (
              <button
              onClick={handleSubmit}
              disabled={!answers[currentQuiz._id]}
              className={`px-4 py-2 rounded-md ${
                answers[currentQuiz._id]
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-400 text-gray-300 cursor-not-allowed'
              }`}
              >
                Submit
              </button>
            )}

          </div>
        </form>
      </div>
    </div>
  )
}

export default Student
