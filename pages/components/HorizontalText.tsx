import React, {useState, useEffect, useRef} from 'react'
import HoverImageEffect from './HoverImageEffect'
import { gsap } from "gsap";
import { isMobile } from 'react-device-detect';

const HorizontalText = (props:any) => {
  const [xOffSet, setXOffSet] = useState(0)
  const temp = isMobile?1000:1700;
  let boxRef = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {      
      setXOffSet(window.scrollY)
    })
  }, [])
  
  useEffect(() => {
    gsap.to(boxRef.current, { x: -2000 + 0.1 * props.direction * props.step * ((xOffSet>temp)?(xOffSet-temp):0)});    
  });
  
  const Clicked = () => {
    props.showdetail({
      title:props.text, 
      details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ", 
      url:props.url
    })
  }
  const changeShowState = (value:boolean) => {
    if(value) props.changeCanvasImageState(props.index)
    else props.changeCanvasImageState(-1)
  }
  return (
    <>
      {
        <div className="grid-items w-full">
          <div className="w-full overflow-hidden" >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block"
              onClick={()=>Clicked()}
              onMouseEnter={() => changeShowState(true)}
              onMouseLeave={() => changeShowState(false)}
            >
              <div ref={boxRef} className="flex text-[50px] md:text-[100px] leading-[55px] md:leading-[110px]">
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
                {props.text}&nbsp;&nbsp;&nbsp;
              </div>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText