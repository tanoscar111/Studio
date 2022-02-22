import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { isMobile } from 'react-device-detect'
import Horizontal from './Horizontal'

const HorizontalText = (props:any) => {
  const [originScrollY, setOriginScrollY] = useState(0)
  const [autoPlay, setAutoPlay] = useState(-1)
  const [offsetLeft, setOffsetLeft] = useState(-1800)
  
  let boxRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let delta = window.scrollY-originScrollY
      let newoffset = offsetLeft + delta * props.step * 0.1
      if (newoffset<-1800-1400)
        newoffset = -1800
      if (newoffset>0)
        newoffset = -1800
      setOffsetLeft(newoffset)
      setOriginScrollY(window.scrollY)
    })
  }, [])
      
  // useEffect(() => {
  //   if(autoPlay===props.index){
  //     // console.log('interval', autoPlay, props.index)
  //     let newoffset = offsetLeft + 0.5 * props.step * 0.1
  //     if (newoffset<-1800-1400)
  //       newoffset = -1800
  //     if (newoffset>0)
  //       newoffset = -1800
  //     gsap.to(boxRef.current, 0.5, { 
  //       x: newoffset,
  //     });
  //     setOffsetLeft(newoffset)
  //   }
  // },[offsetLeft]);

  useEffect(() => {    
    gsap.to(boxRef.current, 1, { 
      x: offsetLeft
    });
  },[offsetLeft]);
  
  const Clicked = () => {
    props.showdetail({
      title:props.text, 
      details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ", 
      url:props.url
    })
  }

  const changeShowState = (value:boolean) => {
    
    if (isMobile) 
      return
    if(value){
      // console.log(value)
      setAutoPlay(props.index)
      props.changeCanvasImageState(props.index)
      return
    }
    else{
      // console.log(value)
      setAutoPlay(-1)
      props.changeCanvasImageState(-1)
      return
    }
  }

  return (
    <>
      {
        <div className="w-full">
          <div className="w-full overflow-hidden" >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block relative horizontal-scroll"
              onClick={()=>Clicked()}
              onMouseEnter={() => changeShowState(true)}
              onMouseLeave={() => changeShowState(false)}              
            >
              <div ref={boxRef} data-scroll={0} className="text-[50px] md:text-[88px] leading-[55px] md:leading-[70px] md:my-4 scrolling-effect">
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;
              </div>
              <div className="absolute top-0 text-[50px] md:text-[88px] leading-[55px] md:leading-[70px] md:my-4 marquee-effect">
                <Horizontal text={props.text} step={props.step}/>
              </div>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText