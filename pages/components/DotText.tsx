import React from 'react'
import { FaCircle } from "react-icons/fa"

const DotText = (props:any) => {
  const Style = {
    fontFamily:'SpaceMono'
  }
  return (
    <>
      {
        props.text===""?<></>:
        <div className={props.leftalign?"mx-2 flex text-14 font-normal":"pr-2 w-full flex justify-end text-18 font-normal"}>
          <div className={props.leftalign?"text-10 mt-1":"text-12 mt-1.5"}><FaCircle/></div>
          <div className={props.leftalign?"w-full md:w-[600px] ml-3":"ml-3"} style={Style}>{props.text}</div>
        </div>
      }
    </>       
  )
}

export default DotText