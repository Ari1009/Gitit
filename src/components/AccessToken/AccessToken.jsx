import React, { useContext, useState } from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext'

export default function AccessToken() {
    const { token, setToken } = useContext(RepositoryContext)
    const [tempToken, setTempToken] = useState(token)
    const [message, setMessage] = useState('')
    const addToken = (e)=>{
        e.preventDefault()
        setToken(tempToken)
        setMessage('Access token set')
    }
    return (
        <section className="text-gray-600 body-font">
            <form onSubmit={addToken} className='container px-5 py-24 mx-auto flex'>
                <div className='bg-gray-200 mx-auto px-4 py-8 rounded-lg'>
                    <h1 className='text-2xl py-4'>Enter your Github access token</h1>
                    <div className='text-sky-600'>
                        {message}
                    </div>
                    <input aria-placeholder='enter' className=' focus:border-gray-500 my-2 rounded-lg outline-none border-b-4 border-2 border-gray-400 bg-transparent py-2 px-1 w-full' type="password" value={tempToken} onChange={
                        (e) => {
                            setMessage('')
                            setTempToken(e.target.value)
                            }
                        } />
                    <button className='my-2 bg-green-500 py-2 px-3 text-white rounded hover:bg-green-600'>Add Token</button>
                </div>
            </form>
        </section>
    )
}
