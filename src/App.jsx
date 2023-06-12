import { useEffect, useState } from 'react'
import './App.css'

import Nav from './components/Nav/Nav'
import RepoTracker from './components/RepoTracker/RepoTracker'
import IssueList from './components/IssueList/IssueList'
import { RepositoryContext } from './contexts/RepositoryContext'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AccessToken from './components/AccessToken/AccessToken'

function App() {
  const getRepoListFromLocalStorage = ()=>{
    let list = localStorage.getItem('repos')
    if(list){
      return JSON.parse(list)
    }else{
      return []
    }
  }
  const getTokenFromLocalStorage = ()=>{
    const localToken = localStorage.getItem('github-token')
    if(localToken){
      return localToken
    }else{
      return ''
    }
  }
  const [repos, setRepos] = useState(
    getRepoListFromLocalStorage()
  )
  useEffect(()=>{
    setRepos(getRepoListFromLocalStorage())
  },[])
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repos))
  }, [repos])
  const [issues, setIssues] = useState([
    // {
    // }
  ])
  const [token, setToken] = useState(getTokenFromLocalStorage())
  useEffect(()=>{
    localStorage.setItem('github-token', token)
  }, [token])

  return (
    <BrowserRouter>
      <Nav></Nav>
      <RepositoryContext.Provider value={{ repos, setRepos, issues, setIssues, token, setToken }}>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/repo-list" element={<RepoTracker />} />
          <Route path="/token" element={<AccessToken></AccessToken>} />
        </Routes>
      </RepositoryContext.Provider>


    </BrowserRouter>
  )
}

export default App
