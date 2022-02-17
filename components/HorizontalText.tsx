import React, {useState, useEffect, useRef} from 'react'
import HoverImageEffect from './HoverImageEffect'
import { gsap } from "gsap";
import { isMobile } from 'react-device-detect';

const HorizontalText = (props:any) => {
  const [xOffSet, setXOffSet] = useState(0)
  const temp = isMobile?1500:2500;
  let boxRef = useRef(null)
  let imageRef  = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {      
      setXOffSet(window.scrollY)
    })
  }, [])
  
  useEffect(() => {
    gsap.to(boxRef.current, { x: -2000 + 0.1 * props.direction * props.step * ((xOffSet>temp)?(xOffSet-temp):0)});    
  });
  
  const openDetails = (details:{ title: string; details: string; url: string }) => {    
    props.showdetail(details)
  }
  return (
    <>
      {
        <div className="grid-items w-full">
          <div className="w-full overflow-hidden" >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block">
              <div ref={boxRef} className="flex text-[50px] md:text-[100px] leading-[55px] md:leading-[110px]" >
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
                <HoverImageEffect text={props.text} imageRef={imageRef.current} openDetails={openDetails}/>
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