import React,{useRef, useEffect, useState} from 'react'
import { FaCircle } from "react-icons/fa"
import { motion } from "framer-motion";
import { gsap } from "gsap"
import {CustomEase} from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

const DotText = (props:any) => {

  const [animation, setanimation] = useState(false)
  const dotTextref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (props.scrollAnimation){
      window.addEventListener("scroll", () => {
        if (!animation){
          const clientHeight = document.documentElement.clientHeight;
          
          if (dotTextref.current){
            const dotTextSectionY = dotTextref.current.getBoundingClientRect().y;
            const dotTextSectionheight = dotTextref.current.getBoundingClientRect().height;
            CustomEase.create("cubic-bezier", ".19,1,.22,1")
            if (clientHeight > dotTextSectionY + (dotTextSectionheight * 2) / 3) {

              gsap.to(dotTextref.current, 2 , {opacity:1,y:0 , ease:'cubic-bezier'}) 

              setanimation(true)          
            }
          }
          
        }
        
      })
    }else{
      gsap.to(dotTextref.current, 1, {opacity:1,y:0 , ease:'cubic-bezier',delay:2.9})           
    }
  },[animation]);
  
  return (
    <>
      <motion.div exit={{
          y: 100,
          opacity: 0,
          transition: {
            duration: 1,
            ease: [.19,1,.22,1]
          }
        }}
        ref={dotTextref} style={{opacity:0, }} 
        className="px-2 w-full flex justify-start overflow-hidden">
          <FaCircle className="mt-1.5 text-10"/>
          <div className="w-full ml-3 h-auto" style={{fontFamily:'SpaceMono'}}>{props.text}</div>
      </motion.div>
    </>       
  )
}

export default DotText