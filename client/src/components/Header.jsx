import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location=useLocation();
  const navigate=useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    // console.log(`searchQuery is ${searchQuery}`)
    navigate(`/listings?${searchQuery}`);
  }
  useEffect(() => {
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromurl=urlParams.get('searchTerm');
    if(searchTermFromurl){
      setSearchTerm(searchTermFromurl);
    }
  }, [location.search])
  
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Ghardekho</span>
            <span className="text-slate-700">.com</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className="text-slate-600"></FaSearch>
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className={`p-1 hidden sm:inline text-slate-700 rounded-lg hover:underline ${location.pathname==='/'?'bg-teal-500 text-white active:bg-teal-600 font-bold':''}`}>
              Home
            </li>
          </Link>
          <Link to="/listings">
            <li className={`p-1 hidden sm:inline text-slate-700 rounded-lg hover:underline ${location.pathname==='/listings'?'bg-teal-500 text-white active:bg-teal-600 font-bold':''}`}>
              Listing
            </li>
          </Link>
          <Link to="/about">
            <li className={`p-1 hidden sm:inline text-slate-700 rounded-lg hover:underline ${location.pathname==='/about'?'bg-teal-500 text-white active:bg-teal-600 font-bold':''}`}>
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-9 w-9 object-cover"
              />
            ) : (
              <li className={`p-1  text-slate-700 rounded-lg hover:underline ${location.pathname==='/sign-in'?'bg-teal-500 text-white active:bg-teal-600 font-bold':''}`}>SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
