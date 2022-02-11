import React, {useState, useEffect} from 'react'
import { FaCircle } from "react-icons/fa"

const DotText = (props:any) => {

  return (
    <>
      {
        props.text===""?<></>:
        <div className={props.leftalign?"mx-2 flex text-14 font-normal":"pr-4 w-full flex justify-end text-18 font-normal"}>
          <div className={props.leftalign?"text-10 mt-1":"text-12 mt-1.5"}><FaCircle/></div>
          <div className={props.leftalign?"w-[500px] ml-3":"ml-3"}>{props.text}</div>
        </div>
      }
    </>       
  )
}

export default DotText