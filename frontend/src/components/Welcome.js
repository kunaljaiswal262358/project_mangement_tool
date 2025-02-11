import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  
  return (
    <div className='welcome'>
      <h2>Welcome Kunal!</h2>
      <Link to={"/project"}>Add project</Link>
    </div>
  )
}

export default Welcome
