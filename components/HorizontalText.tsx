import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap";

const HorizontalText = (props:any) => {

  const [isScroll, setIsScroll] = useState(0)
  let boxRef = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      // (window.screenY>100)?
        setIsScroll(window.scrollY-100)
      // :
      //   setIsScroll(0)
    })
  }, [])
  
  useEffect(() => {
    gsap.to(boxRef.current, { x: -1000 + props.direction * props.step * isScroll });
  });
  return (
    <>
      {
        <div className="grid-items">
          <div className="w-full relative overflow-hidden">
            {/* <div className="text-center">{isScroll}</div> */}
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block">
              <div ref={boxRef} className="flex  text-[70px]">
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
                <div className="px-8">{props.text}</div>
              </div>
              <img className="content__img" src="img/img1.jpg" alt="img"/>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText