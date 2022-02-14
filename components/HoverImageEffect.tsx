import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap";

const HoverImageEffect = (props:any) => {
  const [position, setPosition] = useState({x:0, y:0})  
  const [showImage, setShowImage] = useState(false)
  
  let canvas:any = null;
  let ctx:any = null;  
  let sx=0, sy=0, sw=510, sh=716, dx, dy, dw=300, dh=400;

  const drawingImage = () => {
    canvas  = document.getElementById('hover-image-canvas')
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight; 
    ctx = canvas.getContext("2d");
    ctx.globalAlpha = 1.95;
    dx = position.x-150;
    dy = position.y-200;
    // draw rectangle
    ctx.drawImage(props.imageRef, sx, sy, sw, sh, dx, dy, dw, dh);
    
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
    window.addEventListener('pointermove', ({ clientX, clientY })=>{      
      setPosition({x:clientX, y:clientY})      
    });  
  }, [])
  
  useEffect(() => {
    if(showImage){
      setTimeout(() => { drawingImage() }, 50);      
    }   
  });

  
  return (
    <>
      <div className="mx-8 -my-6"
        onMouseEnter={() => showingImage()}
        onMouseLeave={() => hiddenImage()} 
      >{props.text}
      </div>
    </>       
  )
}

export default HoverImageEffect