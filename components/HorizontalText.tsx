import React, {useState, useEffect, useRef} from 'react'
import HoverImageEffect from './HoverImageEffect'
import { gsap } from "gsap";

const HorizontalText = (props:any) => {
  const [xOffSet, setXOffSet] = useState(0)

  let boxRef = useRef(null)
  let imageRef  = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setXOffSet(window.scrollY)
    })
  }, [])
  
  useEffect(() => {
    gsap.to(boxRef.current, { x: -2000 + 0.1 * props.direction * props.step * ((xOffSet>2500)?(xOffSet-2500):0)});    
  });

  
  return (
    <>
      {
        <div className="grid-items w-full my-8">
          <div className="w-full relative overflow-hidden"
          >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block">               
              <div ref={boxRef} className="flex text-[100px]" style={{fontFamily: 'fantasy'}}>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current}/>
              </div>
              <img ref={imageRef} className="content__img" src={props.url} alt="img"/>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText