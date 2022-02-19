import React, {useState, useEffect, useRef} from 'react'


const Horizontal = (props:any) => {
  
  return (
    <>
        {
          props.direction===1?          
          <div className="marquee_effect-left">
            <div className='opacity-0'>{props.text}</div>
            <div className="marquee">
              <div className="marquee__inner">
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
              </div>
            </div>
          </div>
          :
          <div className="marquee_effect-right">
            <div className='opacity-0'>{props.text}</div>
            <div className="marquee">
              <div className="marquee__inner">
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
                <div className='marquee-item'>{props.text}</div>
              </div>
            </div>
          </div>
        }
    </>       
  )
}

export default Horizontal