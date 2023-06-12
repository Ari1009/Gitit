import React, { useContext, useEffect, useState } from 'react'
import { RepositoryContext } from '../../contexts/RepositoryContext'
import IndividualIssue from '../IndividualIssue/IndividualIssue'
import Loading from '../Loading/Loading'
import NoIssues from '../NoIssues/NoIssues'

function IssueList() {
    const [loading, setLoading] = useState(false)
    const [tokenConnected, setTokenConnected] = useState(true)
    const {repos, issues,setIssues,token} = useContext(RepositoryContext)
    useEffect(()=> {
        const fetchData = async ()=>{
            if(!token){
                setTokenConnected(false)
                return
            }
            setLoading(true)
            const apiURL = 'https://api.github.com/graphql'
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              };
            try{
                var tempIssues = []
                for(let i=0; i<repos.length;i++){
                    const slash = repos[i].name.indexOf('/')
                    if(slash===-1){
                        continue
                    }
                    const owner = repos[i].name.substring(0,slash)
                    const repository = repos[i].name.substring(slash+1)
                    const query = `
                    query {
                        repository(owner: "${owner}", name: "${repository}"){
                            issues(filterBy: {states: OPEN, labels: ${JSON.stringify(repos[i].tags)}}, first: 100){
                                edges {
                                    node {
                                        number
                                        title
                                        url
                                        labels(first: 8){
                                            edges {
                                                node {
                                                    name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    `
                    // console.log(query)
                    const response = await fetch(apiURL, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({query: query})
                    })
                    console.log(response)
                    
                    
                    const data = await response.json()
                    if(data.errors){
                        console.log(data)
                        continue
                    }
                    var issuesReceived = data.data.repository.issues.edges.map(item=>{
                        return {
                            "repository": repos[i].name,
                            "name": item.node.title,
                            "url": item.node.url,
                            "number": item.node.number,
                            "labels": item.node.labels.edges.map(k=>k.node.name)
                        }
                    });
                    tempIssues = [...tempIssues, ...issuesReceived]
                }
                
                setIssues(tempIssues)
                setLoading(false)
            }catch(e){
                setTokenConnected(false)
                setLoading(false)
                console.log(e)
            }
        }
        fetchData()
    },[])
    
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1 className='text-2xl'>Issues</h1>
                <div>
                    
                {!loading && (tokenConnected?
                    issues.map(issue=>{
                        return <IndividualIssue 
                        name={issue.name}
                        url={issue.url}
                        repository={issue.repository}
                        tags={issue.labels}
                        key={issue.repository+issue.number}
                        ></IndividualIssue>
                    })
                    :
                    <NoIssues></NoIssues>
                )
                }
                {
                    loading && <Loading />
                }
            
                </div>
            </div>
        </section>
    )
}

export default IssueList