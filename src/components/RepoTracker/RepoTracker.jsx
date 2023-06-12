import React, { useContext, useState } from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext'
import Organisation from '../Organisation/Organisation'

export default function RepoTracker() {
    const { repos, setRepos } = useContext(RepositoryContext)
    const [newOrg, setNewOrg] = useState("")
    const addNewRepo = (event) => {
        event.preventDefault()
        for(let i=0;i<repos.length;i++){
            if(!newOrg){
                alert("Repository cannot be blank")
                return
            }
            if(repos[i].name===newOrg){
                alert("Repository already exists")
                return
            }
        }
        const newRepoList = [{
            "index": 0,
            "name": newOrg,
            "tags": []
        }, ...repos]
        for(let i=0;i<newRepoList.length;i++){
            newRepoList[i].index = i+1
        }
        setRepos(newRepoList)
        setNewOrg("")
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <form onSubmit={addNewRepo} className="flex py-2 sm:items-center w-full md:w-2/3 mx-auto">
                    <input type="text"
                        className='border-y-2 border-l-2 rounded-y rounded-l focus:border-y-2 focus:border-l-2 focus:border-rose-500 outline-none  px-2 w-full h-full'
                        value={newOrg}
                        onChange={e => setNewOrg(e.target.value)} />
                    <button className='bg-rose-500 px-2 py-1 rounded-r text-white'>
                        Add repository
                    </button>
                </form>
                {
                    repos.map(repo => {
                        return <Organisation
                            key={repo.index+repo.name}
                            index={repo.index}
                            heading={repo.name}
                            tags={repo.tags}
                            setTags={(tg) => {
                                setRepos(
                                    repos.map(rr => {
                                        if (rr.index == repo.index) {
                                            rr.tags = [...tg]
                                            return rr;
                                        } else {
                                            return rr;
                                        }
                                    })
                                )
                            }}
                            setHeading={
                                (heading) => {
                                    const tempRepos = 
                                    setRepos(
                                        repos.map(rr => {
                                            if (rr.index == repo.index) {
                                                rr.name = heading
                                                return rr;
                                            } else {
                                                return rr;
                                            }
                                        })
                                    )
                                }
                            }
                            deleteOrganisation={
                                () => {
                                    let temprepo = repos.filter(rr => {
                                        if (rr.index == repo.index) {
                                            return false
                                        }
                                        return true
                                    })
                                    for (let i = 0; i < temprepo.length; i++) {
                                        temprepo[i].index = (i + 1)
                                    }
                                    setRepos(temprepo)
                                }
                            }
                        ></Organisation>
                    })
                }
            </div>
        </section>
    )
}
