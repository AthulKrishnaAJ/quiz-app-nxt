'use client'

import React, { useState} from 'react'
import {FormEvent, ChangeEvent, ChangeEventArea} from '../../types/type'
import axios from 'axios'
import { toast } from 'sonner'
import { lineSpinner } from 'ldrs'



type Error = {
    questionError: string,
    answerError: string
    optionError: string
}

function Instructor() {
    const [question, setQuestion] = useState<string>('')
    const [options, setOptions] = useState<string[]>(['', '', '', ''])
    const [answer, setAnswer] = useState<string>('')
    const [errors, setErrors] = useState<Error>({questionError: '', answerError: '', optionError: ''})
    const [loading, setLoading] = useState(false)
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        let isValid = true
        let errorObj: Error = {questionError: '', answerError: '', optionError: ''}
        if(question.trim() === ''){
            errorObj.questionError = 'Field is required'
            isValid = false
        }

        if(answer.trim() === ''){
            errorObj.answerError = 'Field is required'
            isValid = false
        }

        if(options.some((option) => option.trim() === '')){
            errorObj.optionError = 'All field must be filled'
            isValid = false
        }

        setErrors(errorObj)

        if(isValid){
            try{
                const response = await axios.post('/api/post', {question, options, answer})
                setQuestion('')
                setOptions(['', '', '', ''])
                setAnswer('')
                setTimeout(() => {
                    setLoading(false)
                    toast.success('Successfully added')
                }, 1000)
                console.log('Response from next server:',response)
            } catch (error: any){
                if(error.response && error.response.data){
                    toast.error(error.response.data.message)
                } else {
                    console.log('ERROR making request: ', error.message || error)
                    toast.error('An unexpected error occur')
                }
            }

            
        }

    }

    if(loading){
        lineSpinner.register()
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-800 to-stone-200">
                <l-line-spinner size={40} stroke={3} speed={1}></l-line-spinner>
                <p>{" "}processing...</p>
            </div>
        )
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-800 to-stone-200'>
    <div className='bg-gray-200 p-10 rounded-lg shadow-xl w-full max-w-lg'>
      <h1 className='text-2xl font-bold mb-6 text-center text-gray-600'>Instructor page</h1>
      <form 
        onSubmit={handleSubmit}
      >
        <div className='mb-2'>
            <label htmlFor="questoin" className='block text-gray-700 font-medium mb-1'>
                Question
            </label>
            <textarea  
            id="questoin"
            value={question}
            onChange={(e: ChangeEventArea) => {
                setQuestion(e.target.value)
            }}
            placeholder='Add question'
            className='w-full p-2 text-black rounded-md focus:outline-none focus:ring focus:ring-violet-300'
             />
            {errors.questionError && <p className='text-sm text-red-500'>Field is required</p>}

        </div>

        <div className='mb-2'>
            <label htmlFor="options" className='block text-gray-700 font-medium mb-1'>
                Options
            </label>
            {
                options.map((option, index) => (
                    <input 
                    type="text" 
                    key={index}
                    value={option}
                    onChange={(e: ChangeEvent) => {
                        const opt = [...options]
                        opt[index] = e.target.value
                        setOptions(opt)
                        
                    }}
                    className='w-full p-1 mb-2 text-black rounded-md focus:outline-none focus:ring focus:ring-violet-300'
                    />
                    
                ))
            }
            {errors.optionError && <p className='text-sm text-red-500'>{errors.optionError}</p>}

        </div>

        <div className='mb-2'>
            <label htmlFor="answer" className='block text-gray-700 font-medium mb-1'>
                Answer
            </label>
            <input 
            type="text" 
            value={answer}
            onChange={(e: ChangeEvent) => {
                setAnswer(e.target.value)
            }} 
            placeholder='Add answer'
            className='w-full p-1 mb-2 text-black rounded-md focus:outline-none focus:ring focus:ring-violet-300'
            />
            {errors.answerError && <p className='text-sm text-red-500'>Field is required</p>}
        </div>
        <div className='text-center'>
            <button className='bg-green-600 w-40 text-white shadow-lg px-6 py-2 mt-4 rounded-md hover:bg-green-700 duration-300 hover:scale-110'>
                Submit
            </button>
        </div>
      </form>
    </div>
</div>
  )
}

export default Instructor
