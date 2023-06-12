import { React, useState } from 'react'
import Tags from '../Tags/Tags'
import EditTags from '../EditTags/EditTags'

export default function Organisation({ index, heading, tags, setTags, setHeading, deleteOrganisation}) {
    const [isEditModeActive, setEditMode] = useState(false)
    const [repoEdit, setRepoEdit] = useState(false)
    const [repo, setrepo] = useState(heading)
    const EditMode = () => {
        if (repoEdit === false) {
            setRepoEdit(true)
        } else {
            setHeading(repo)
            setRepoEdit(false)
        }
    }
    return (
        <div className="flex relative pt-10 pb-20 sm:items-center w-full md:w-2/3 mx-auto">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">{index}</div>
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">

                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                    {repoEdit ?
                        <input onChange={(e) => {
                            setrepo(e.target.value)
                        }} value={repo}
                            className="border-2 px-2 py-1"
                        ></input>
                        :
                        <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{heading}</h2>
                    }
                    <div>
                    <button onClick={EditMode} className="">
                        <img src={repoEdit ? "/checkmark.png" : "/edit.png"} alt="" className='h-8 p-1' />
                    </button>
                    <button onClick={()=>{
                        if(!repoEdit){
                            deleteOrganisation()
                        }else{
                            setRepoEdit(false)
                            setHeading(repo)
                            deleteOrganisation()
                        }
                    }} className="">
                        <img src="/delete.png" alt="" className='h-8 p-1' />
                    </button>
                    </div>
                    
                    <div className='flex flex-wrap leading-relaxed py-4'>
                        {
                            tags.map(tag => {
                                return <Tags tag={tag} key={tag}></Tags>
                            })
                        }
                    </div>
                    <div className='px-2'>
                        <button onClick={() => {
                            setEditMode(true)
                            console.log('edit mode')
                        }}
                            className="flex bg-cyan-500 px-2 py-1 rounded text-white">
                            <h2 className='h-fit my-auto'>Edit Tags</h2>
                            <img src="edit-white.png" alt="" className='h-8 p-1 my-auto' />
                        </button>
                    </div>

                    <EditTags open={isEditModeActive} close={() => setEditMode(false)} tags={tags} setTags={setTags}>
                    </EditTags>
                </div>
            </div>
        </div>
    )
}