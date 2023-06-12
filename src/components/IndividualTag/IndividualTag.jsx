import React from 'react'

export default function IndividualTag({heading}) {
  return (
    <div  className={`${heading.length%2==0? 'bg-amber-400': 'bg-teal-400'} mr-2 mt-1 inline-block text-white rounded-full px-3 py-1 text-sm`}>
        <h1 className='whitespace-nowrap'>{heading}</h1>
    </div>
  )
}
