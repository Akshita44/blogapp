import React from 'react'
import "./Loader.css"

function Loader() {
  return (
    <div className='loading-page'>
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading</span>
        </div>
    </div>
  )
}

export default Loader