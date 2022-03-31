import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { motion } from "framer-motion";

const DivisionLine = (props:any) => {
  const divisionLineRef= useRef<HTMLHeadingElement>(null)
  const [animation, setanimation] = useState(false)

  useEffect(() => {

    window.addEventListener("scroll", () => {
      if (!animation) {
        const clientHeight = document.documentElement.clientHeight;
        if(divisionLineRef.current){
          const dotTextSectionY = divisionLineRef.current.getBoundingClientRect().y;
          const dotTextSectionheight = divisionLineRef.current.getBoundingClientRect().height;
          if (clientHeight > dotTextSectionY + dotTextSectionheight + 100 ) {
            gsap.to(divisionLineRef.current, 1.5, { left: 0, opacity:1, ease: 'expo' });  
            setanimation(true)
          }
        }
        
      }
    })

  }, [animation]);

  const FadeOutAnimation = {
    exit : {
      x: -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <>
      <div className='w-full h-1 border-b relative -left-[2000px] opacity-0' style={{borderColor:props.color}} ref={divisionLineRef}/>
    </>
  )
}

export default DivisionLine