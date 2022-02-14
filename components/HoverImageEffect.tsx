
import React, {useState, useEffect, useRef} from 'react'


const HoverImageEffect = (props:any) =>{
  
  // const [position, setPosition] = useState({x:0, y:0})

  useEffect(() => {
    window.addEventListener('pointermove', ({ clientX, clientY })=>{      
      // setPosition({x:clientX, y:clientY})
      // props.setPos({x:clientX, y:clientY})
    });  
  }, [])
  return (
    <>
      <div className="flex text-[100px]" style={{fontFamily: 'fantasy'}}
      // onMouseEnter={() => showingImage()} onMouseLeave={() => hiddenImage()} 
      >
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
        <div className="mx-8 -my-6"> {props.text} </div>
      </div>
    </>       
  )

}

export default HoverImageEffect