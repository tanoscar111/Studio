import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"

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
      AnimationText();
    }
  },[showText]);
  
  function AnimationText(){
    let animations = document.getElementsByClassName('animation-text2')
    if (animations.length>0){
      for(let i=0;i<animations.length;i++){
        let animation=animations[i]
        gsap.to(animation, 1.5, { rotate:0, top:0, ease: 'expo'});
        
      }
      
    }
  }
  const getPageYScroll = () => {
    if(risingRef1.current){
      if(window.pageYOffset>(risingRef1.current.offsetTop-window.innerHeight/2)){
        setShowText(true)        
      }
    }
  }

  return (
    <div ref={risingRef1}>
      <div className='hidden md:block text-[76px] leading-[86px]'>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem&nbsp;&nbsp;ipsum&nbsp;&nbsp;dolor&nbsp;&nbsp;sit&nbsp;&nbsp;amet,
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>            
            consectetur&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;adipiscing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elit,
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            sed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;do&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eiusmod&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tempor
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            incididunt&nbsp;&nbsp;ut&nbsp;&nbsp;labore&nbsp;&nbsp;et&nbsp;&nbsp;dolore
          </div>
        </div>
      </div>
      <div className='md:hidden text-[38px] leading-[50px]'>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            Lorem ipsum
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            dolor sit amet,
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            consectetur
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            adipiscing elit,
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            sed do eiusmod
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            tempor
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            incididunt ut
          </div>
        </div>
        <div className='animation-mask2'>
          <div className='animation-text2'>
            labore et dolore
          </div>
        </div>
      </div>
    </div>  
  )
}

export default RisingAnimationText2