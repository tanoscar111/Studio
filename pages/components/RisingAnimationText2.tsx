import React, {useState, useEffect, useRef} from 'react'
import Script from 'next/script'
import { TweenMax } from "gsap"

const RisingAnimationText2 = () => {
  const classesName1 = "text-justify opacity-0"
  const classesName2 = "text-justify animation-text2 opacity-0"
  const [showText, setShowText]= useState(false)
  const risingRef1= useRef<HTMLHeadingElement>(null)
  const opacityRef1= useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    window.document.addEventListener('scroll', getPageYScroll);
  },[]);
    
  useEffect(() => {
    if(showText){
      TweenMax.to(opacityRef1.current, 10.0, { ease:'Power0.easeNone', opacity:1});
    }
  },[showText]);
  
  const getPageYScroll = () => {
    if(risingRef1.current){
      if(window.pageYOffset>(risingRef1.current.offsetTop-window.innerHeight/2)){
        setShowText(true)        
      }
    }
  }

  return (
    <div ref={risingRef1}>
      <div className='text-[38px] leading-[50px] md:text-[76px] md:leading-[86px]'>
        <p ref={opacityRef1} className={showText?classesName2:classesName1} >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore                  
        </p>
      </div>
      {
        showText?<Script src="./script/animationText2.js"></Script>:<></>
      }
    </div>  
  )
}

export default RisingAnimationText2