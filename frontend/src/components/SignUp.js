import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = ({setLogin}) => {
  const [formData, setFormData] = useState({name: "", email: "", password: "", confirmPassword: "", role: ""})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const clearForm = () => {
    setFormData({name: "", email: "", password: "", confirmPassword: "", role: ""})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
    const result = await response.json();
    if(!response.ok)
      setError(result.message)
    else {
      clearForm()
      setLogin(true)
      navigate("/auth")
    }
  }
  return (
    <div className='auth-container'>
      <h2>SignUp</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name' />
        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter email'/>
        <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password'/>
        <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password'/>
        <select name="role" id="role" value={formData.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>
        <button>Submit</button>
        <p onClick={()=>setLogin(true)} className="toggle-auth">Already have an account? Login</p>
      </form>
    </div>
  )
}


export default SignUp
