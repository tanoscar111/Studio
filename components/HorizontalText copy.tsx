import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap";
// import DrawOnCanvas from '../components/DrawOnCanvas'

const HorizontalText = (props:any) => {
  const [position, setPosition] = useState({x:0, y:0})
  const [xOffSet, setXOffSet] = useState(0)
  const [showImage, setShowImage] = useState(false)

  let boxRef = useRef(null)
  let imageRef  = useRef(null)
  let canvas:any = null;
  let ctx:any = null;  
  let sx=0, sy=0, sw=510, sh=716, dx, dy, dw=300, dh=400;

  const drawingImage = () => {
    canvas  = document.getElementById('hover-image-canvas')
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; 
    ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.95;
    dx = position.x-150;
    dy = position.y-200;
    // draw rectangle
    ctx.drawImage(imageRef.current, sx, sy, sw, sh, dx, dy, dw, dh);
    
  }

  const showingImage = () => {
    canvas  = document.getElementById('hover-image-canvas')    
    setShowImage(true)
    drawingImage()
    canvas.style.opacity=1.0
  }

  const hiddenImage = () => {
    canvas  = document.getElementById('hover-image-canvas')    
    setShowImage(false)
    canvas.style.opacity=0
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
      setTimeout(() => { drawingImage() }, 50);      
    }
    gsap.to(boxRef.current, { x: -2000 + 0.1 * props.direction * props.step * ((xOffSet>2500)?(xOffSet-2500):0)});    
  });

  return (
    <>
      {
        <div className="grid-items w-full my-8">
          <div className="w-full relative overflow-hidden"
            onMouseEnter={() => showingImage()}
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