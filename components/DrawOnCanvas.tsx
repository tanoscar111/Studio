import React, {useState, useEffect} from 'react'

const CanvasImage = (props:any) => {
  let canvas:any = null;
  let ctx:any = null;
  if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener("DOMContentLoaded", function () {        
      canvas  = document.getElementById('hover-image-canvas')
 
      useEffect(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight; 
        // get context of the canvas
        ctx = canvas.getContext("2d");
      }, []);
      
      useEffect(() => {
        const r1Info = { x: 200, y: 300, w: 500, h: 500 };
        const r1Style = { borderColor: 'red', borderWidth: '5px' };
        drawRect(r1Info, r1Style); 
      }, []);
      
      // draw rectangle
      const drawRect = (info: { x: any; y: any; w: any; h: any; }, style = {}) => {
        const { x, y, w, h } = info;
        
     
        ctx.beginPath();
        ctx.strokeStyle = '#dddddd';
        ctx.lineWidth = '1px';
        ctx.rect(x, y, w, h);
        ctx.stroke();
      }
    });
  }
 
}

export default CanvasImage