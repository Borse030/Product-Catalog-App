import React from 'react'
import { TailSpin } from 'react-loader-spinner';
import "./Loader.css";


const Loader = () => {
  return (
    <div className="loader-container">
    <TailSpin // React Loader Spinner component
        height="100"
        width="100"
        color="#007bff"
        ariaLabel="loading"
    />
</div>
  )
}

export default Loader
