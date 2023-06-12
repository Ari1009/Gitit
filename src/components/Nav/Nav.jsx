import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Nav() {
  const location = useLocation();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> */}
          <img src="/logo.png" alt="" />
          <span className="ml-3 text-xl">Gitit</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={"/repo-list"} className={`mr-5 ${location.pathname==='/repo-list'? "text-cyan-500": "hover:text-gray-900"} `}>Repo list</Link>
          <Link to={"/token"} className={`mr-5 ${location.pathname==='/token'? "text-cyan-500": "hover:text-gray-900"} `}>Set Token</Link>
        </nav>
        <Link to={"/"} className={`inline-flex items-center ${location.pathname==='/'? "bg-cyan-500 text-white": "bg-gray-100 hover:bg-gray-200"} border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0`}>Check issues
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </header>
  )
}

export default Nav