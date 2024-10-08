import React from 'react'
import "./Error.css"
import {Link} from "react-router-dom";

const Error = () => {
  return (
    <div className='Error_page'>
    <div >
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go Back to Home</Link>
  </div>
    </div>
  )
}

export default Error
