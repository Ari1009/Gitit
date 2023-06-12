import React, { useState } from 'react'
import ReactDom from 'react-dom'

export default function EditTags({ open, tags, close, setTags }) {
    if (!open) {
        return null
    }
    const [tempTags, setTempTags] = useState(tags)
    const [newTag, setNewTag] = useState("")
    const removeTempTag = (tag) => {
        setTempTags(
            tempTags.filter(tg => tag !== tg)
        )
    }
    const SaveChanges = () => {
        console.log(tempTags)
        setTags([...tempTags])
        close()
    }
    const CancelChanges = () => {
        setTempTags([...tags])
        close()
    }
    return ReactDom.createPortal(
        <>
            <div className='z-50 fixed top-0 bottom-0 left-0 right-0'
                style={{
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }}
                onClick={
                    CancelChanges
                }
                >

            </div>
            <div style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }} className='overflow-scroll z-50 fixed p-4 bg-white rounded h-96 w-80 m-auto text-black'>
                <h2 className='text-xl text-center bg-teal-500 text-white py-2 rounded'>Edit issue tags</h2>
                {
                    tempTags.map(tg => {
                        return (
                            <div className='flex border-b' key={tg}>
                                <h2 className='text-gray-600 px-2 py-1'>{tg}</h2>
                                <button onClick={() =>
                                    removeTempTag(tg)
                                }>
                                    <img src="delete.png" alt="" className='w-4' />
                                </button>
                            </div>
                        )
                    })
                }
                <input type="text" className='border-2 px-1 w-full rounded' value={newTag} onChange={
                    e => setNewTag(e.target.value)
                } />
                <button className='flex py-1 my-1 px-2 rounded bg-gray-200'
                    onClick={
                        () => {
                            let noDuplicates = true
                            tempTags.forEach(tg => {
                                if (tg === newTag) {
                                    noDuplicates = false
                                }
                            })
                            let noBlank = newTag === ''
                            if (noDuplicates && !noBlank) {
                                setTempTags([...tempTags, newTag])
                                setNewTag("")
                            } else {
                                console.log("duplicate/blank tags not allowed")
                            }
                        }
                    }>
                    <h2 className='pr-2'>Insert</h2>
                    <img src="add.png" alt="" className='w-4 my-auto' />
                </button>
                <div className="flex justify-between py-1">
                    <div className="w-1/2 pr-2" >
                        <button onClick={SaveChanges} className="w-full bg-sky-500 px-2 py-1 text-white rounded-lg">Done</button>
                    </div>
                    <div className="w-1/2 pl-2" >
                        <button onClick={CancelChanges} className="w-full bg-gray-200 px-2 py-1 rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('portal')
    )
}
