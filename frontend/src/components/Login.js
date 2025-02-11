import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({setLogin,setUser}) => {
  const [formData, setFormData] = useState({email: "", password: ""})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const clearForm = () => {
    setFormData({email: "", password: ""})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
      credentials: "include"
    })
    const result = await response.json();
    console.log(result)
    if(!response.ok)
      setError(result.message)
    else {
      clearForm()
      navigate("/")
      setUser(result.data)
    }
  }
  return (
    <div className='auth-container'>
      <h2>Login</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter email'/>
        <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password'/>
        <button>Submit</button>
        <p onClick={()=>setLogin(false)} className="toggle-auth">Do not have an account? SignUp</p>
      </form>
    </div>
  )
}

export default Login
