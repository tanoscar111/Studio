import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap";
import { isMobile } from 'react-device-detect';
import Horizontal from './Horizontal';

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
        <div className="w-full">
          <div className="w-full overflow-hidden" >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block relative horizontal-scroll"
              onClick={()=>Clicked()}
              onMouseEnter={() => changeShowState(true)}
              onMouseLeave={() => changeShowState(false)}
            >
              <div ref={boxRef} className="text-[50px] md:text-[100px] leading-[55px] md:leading-[110px] scrolling-effect">
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
              <div className="absolute top-0 text-[50px] md:text-[100px] leading-[55px] md:leading-[110px] marquee-effect">
                <Horizontal text={props.text} direction={props.direction}/>
              </div>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText