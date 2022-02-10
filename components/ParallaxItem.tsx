import React, {useState, useEffect} from 'react'

const ParallaxItem = (props:any) => {  
  

  return (
    <div className="content__item relative w-[60%] mx-auto">
      <span className="content__item-number absolute text-[200px] -top-32 -right-20 opacity-20">{props.no}</span>
      <div className="relative overflow-hidden w-full h-[400px]">
        <div className="content__item-img absolute w-full h-[500px] bg-cover bg-center opacity-80" style={{backgroundImage: props.imgURL}}/>
      </div>
      <div className="absolute"></div>
      <h2 className="content__item-title relative text-110">{props.title}</h2>
      <p className="relative">{props.description}</p>
    </div>    
  )
}

export default ParallaxItem