import React from 'react'
import IndividualTag from '../IndividualTag/IndividualTag'

export default function IndividualIssue({name, url, repository, tags}) {
  return (
    <a href={url} target="_blank">
    <div className='bg-cyan-500 my-10 rounded-tl-2xl border border-cyan-400 rounded-br drop-shadow-sm hover:drop-shadow-md ease-in-out duration-200'>
        <div className='text-white py-2 text-sm px-1'>
            {repository}
        </div>
        <div className='bg-gray-100 text-xl py-2 px-3 rounded-tl'>
            <h1>{name}</h1>
            <div className='mt-2'>
                {tags &&
                    tags.map(tag=> (
                        <IndividualTag heading={tag} key={tag}></IndividualTag>
                    ))
                }
            </div>
        </div>

    </div>
    </a>
  )
}
