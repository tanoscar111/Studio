import React, {useState, useEffect, useRef} from 'react'
import Script from 'next/script'
import { TweenMax } from "gsap"

const RisingAnimationText3 = (props:any) => {
  const classesName1 = "opacity-0"
  const classesName2 = "animation-text3 "
  const [showText, setShowText]= useState(false)
  const risingRef3= useRef<HTMLHeadingElement>(null)
  const opacityRef3= useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    window.document.addEventListener('scroll', getPageYScroll);
  },[]);
    
  useEffect(() => {
    if(showText){
      console.log('opacity')
      TweenMax.to(risingRef3.current, 5.0, { ease:'Power0.easeNone', opacity:1});
    }
  },[showText]);
  
  const getPageYScroll = () => {
    if(risingRef3.current){
      if(window.pageYOffset>(risingRef3.current.offsetTop-window.innerHeight/2)){
        setShowText(true)        
      }
    }
  }

  return (
    <div ref={risingRef3} className="opacity-0">
      <div ref={opacityRef3}  className="md:flex items-center justify-center text-[100px] md:text-[170px] leading-[100px] md:leading-[170px] font-normal">
        <div className={showText?classesName2:classesName1}>Let’s</div>
        <div className="md:hidden w-full text-right">
          <div className={showText?classesName2:classesName1}>work</div>
        </div>
        <div className="h-6 md:hidden"></div>
        <div className="flex justify-center ">
          {
            props.isDark?
            <button className="button-next button--telesto mx-4 border-white" onClick={ () => alert('clicked')}>
              <span><span className="relative">
                  <svg width="112" height="46" viewBox="0 0 112 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.65625 25.6875L0.65625 20.3125L106.406 20.3125V25.6875L0.65625 25.6875Z" fill="#FF5C00"/>
                    <rect width="33.7833" height="5.63055" transform="matrix(0.737805 -0.675013 -0.737805 -0.675013 87.0625 45.8438)" fill="#FF5C00"/>
                    <rect width="33.7835" height="5.63058" transform="matrix(-0.737843 -0.674972 -0.737843 0.674972 111.988 22.9611)" fill="#FF5C00"/>
                  </svg>                                       
              </span></span>
            </button>
            :
            <button className="button-next button--telesto telesto-blue mx-4 border-black" onClick={ () => alert('clicked')}>
              <span><span className="relative">
                <svg width="112" height="46" viewBox="0 0 112 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.65625 25.6875L0.65625 20.3125L106.406 20.3125V25.6875L0.65625 25.6875Z" fill="#0019FF"/>
                  <rect width="33.7833" height="5.63055" transform="matrix(0.737805 -0.675013 -0.737805 -0.675013 87.0625 45.8438)" fill="#0019FF"/>
                  <rect width="33.7835" height="5.63058" transform="matrix(-0.737843 -0.674972 -0.737843 0.674972 111.988 22.9611)" fill="#0019FF"/>
                </svg>
              </span></span>
            </button>
          }
        </div>
        <div className="hidden md:block">
          <div className={showText?classesName2:classesName1}>work</div>
        </div>
      </div>      
      {
        showText?<Script src="./script/animationText3.js"></Script>:<></>
      }
    </div>  
  )
}

export default RisingAnimationText3