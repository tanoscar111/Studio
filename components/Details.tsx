import React from 'react'

const Details = (props:any) => {  
  const unmount = () => {
    props.remove(false)
  }
  return (
    <>
      <div id="hover-details" className="absolute top-0 left-0 w-full h-[100vh] bg-gray-500 opacity-100 z-10 ">
        <button onClick={unmount}>
          Close
        </button>
        <div className="w-96 h-96 bg-white mx-auto">
          testing : {props.value}
        </div>
      </div>
    </>       
  )
}

export default Details