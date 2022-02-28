import React,{useRef, useEffect} from 'react'
import { FaCircle } from "react-icons/fa"
import { gsap } from "gsap"

const DotText = (props:any) => {
  const Style = {
    fontFamily:'SpaceMono'
  }
  const fadeinRef = useRef<HTMLHeadingElement>(null)  

  useEffect(() => {
    window.document.addEventListener('scroll', getPageYScroll);
  },[]);
  
  const getPageYScroll = () => {
    if(fadeinRef.current){
      if((window.pageYOffset+window.innerHeight-fadeinRef.current.clientHeight)>fadeinRef.current.offsetTop){        
        setTimeout(() => {
          gsap.to(fadeinRef.current, 2, {opacity:1, ease:'power4.out'})          
        }, 2000);
      }
    }
  }
  return (
    <>
      <div ref={fadeinRef} style={{opacity:0}}>
        {
          props.text===""?<></>:
          <div className={props.leftalign?"mx-2 flex text-14 font-normal":"pr-2 w-full flex justify-end text-18 font-normal"}>
            <div className={props.leftalign?"text-10 mt-1":"text-12 mt-1.5"}>
              <FaCircle/>
            </div>
            <div className={props.leftalign?"w-full md:w-[600px] ml-3 ":"ml-3"} style={Style}>{props.text}</div>
          </div>
        }
      </div>
    </>       
  )
}

export default DotText