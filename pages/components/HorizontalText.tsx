import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { isMobile } from 'react-device-detect'
import Horizontal from './Horizontal'
import { motion } from "framer-motion";


const HorizontalText = (props:any) => {

  const [originScrollY, setOriginScrollY] = useState(0)  
  const [offsetLeft, setOffsetLeft] = useState(-1300)
  const [imageLeft, setImageLeft] = useState(650 + Number(props.step) * 30 )

  let boxRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let delta = window.scrollY-originScrollY
      let newoffset = offsetLeft + delta * props.step * 0.1
      if (newoffset<-1300-1900)
        newoffset = -1300
      if (newoffset>0)
        newoffset = -1300
      setOffsetLeft(newoffset)
      setOriginScrollY(window.scrollY)
    })
  }, [])
      
  useEffect(() => {    
    gsap.to(boxRef.current, 1, { 
      x: offsetLeft
    });
  },[offsetLeft]);

  
  const changeShowState = (value:boolean) => {
    
    if (isMobile) 
      return
    if(value){
      // setAutoPlay(props.index)
      props.changeCanvasImageState(props.index)
      return
    }
    else{
      // setAutoPlay(-1)
      props.changeCanvasImageState(-1)
      return
    }
  }

  return (
    <>
      {
        <div className="w-full relative overflow-hidden">
          <div ref={boxRef}>
            <div className="text-[50px] md:text-[88px] leading-[55px] md:leading-[70px] md:my-4 marquee-effect"
              onMouseEnter={() => changeShowState(true)}
              onMouseLeave={() => changeShowState(false)} 
            >
              <Horizontal text={props.text}/>
            </div>
          </div>
          <div className='absolute top-0.5 sm:hidden'  style={{left:imageLeft}} >
            <img src={props.url} className="w-[100px] h-[52px]" alt='project'/>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText