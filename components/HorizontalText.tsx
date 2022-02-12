import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap";
// import DrawOnCanvas from '../components/DrawOnCanvas'

const HorizontalText = (props:any) => {
  const [position, setPosition] = useState({x:0, y:0})
  const [xOffSet, setXOffSet] = useState(0)
  const [showImage, setShowImage] = useState(false)

  let boxRef = useRef(null);
  let imageRef  = useRef(null)
  let canvas:any = null;
  let ctx:any = null;
  
  const drawingImage = () => { 
    canvas  = document.getElementById('hover-image-canvas')
    canvas.style.opacity=1.0
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; 
    ctx = canvas.getContext("2d");
  
    let sx=0, sy=0, sw=510, sh=716, dw=300, dh=400;
    
    // draw rectangle
    ctx.drawImage(imageRef.current, sx, sy, sw, sh, position.x-150, position.y-200, dw, dh);
  }

  const hiddenImage = () => {
    canvas.style.opacity=0
    setShowImage(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setXOffSet(window.scrollY)
    })

    window.addEventListener('pointermove', ({ clientX, clientY })=>{      
      setPosition({x:clientX, y:clientY})      
    });  
  }, [])
  
  useEffect(() => {
    if(showImage){
      console.log(props.text + "  :  " + showImage)      
      drawingImage()
    }
    gsap.to(boxRef.current, { x: -2000 + 0.1 * props.direction * props.step * ((xOffSet>2500)?(xOffSet-2500):0)});    
  });

  return (
    <>
      {
        <div className="grid-items w-full my-4">
          <div className="w-full relative overflow-hidden"
            onMouseEnter={() => setShowImage(true)}
            onMouseLeave={() => hiddenImage()}            
          >
            <a aria-label="link" target="_blank" rel="noopener" draggable="true" className="link w-inline-block">
              <div ref={boxRef} className="flex text-[100px]">
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
                <div className="mx-8 -my-6">{props.text}</div>
              </div>
              <img 
                ref={imageRef} 
                className="content__img" src={props.url} alt="img"/>
            </a>
          </div>
        </div>
      }
    </>       
  )
}

export default HorizontalText