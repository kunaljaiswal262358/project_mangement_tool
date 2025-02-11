import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({user, setUser}) => {
  const handleClick = async () => {
    const response = await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
    if(response.ok)
      setUser(null)
  }
  
  const fetchProfile = async () => {
    const response = await fetch("http://localhost:5000/user/profile", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
    let result = await response.json()
    if(response.ok)
      setUser(result)
  }

  useEffect(()=> {
    fetchProfile()
  },[])
  
  return (
    <>
      <header>
        <nav>
            <ul>
                <li><Link to={"/"} className='nav-links'>Home</Link></li>
                <li><Link to={"/project"} className='nav-links'>Add Project</Link></li>
                <li><a className='nav-links' href="#">Progress</a></li>
                {!user && <li><Link to={"/auth"} className='nav-links'>Login</Link></li>}
                {user && <li><Link onClick={()=>handleClick()} className='nav-links'>Logout</Link></li>}
            </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
