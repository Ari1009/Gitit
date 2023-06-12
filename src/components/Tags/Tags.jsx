import React from 'react'

export default function Tags({tag}) {
  return (
    <div className='p-2'>
        <button className='bg-gray-200 py-2 px-3 rounded whitespace-nowrap text-sm'>{tag}</button>
    </div>
  )
}
