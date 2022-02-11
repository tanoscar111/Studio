import React, {useState, useEffect} from 'react'

const ParallaxItem = (props:any) => {  
  

  return (

    <div className="content__item relative w-auto my-20">
      <span className="content__item-number absolute text-[200px] top-28 right-20 opacity-30">{props.no}</span>
      <div className="relative overflow-hidden w-full h-[500px]">
        <div className="content__item-img absolute w-full h-[500px] bg-cover bg-center opacity-80" style={{backgroundImage: props.imgURL}}/>
      </div>
      <div className="absolute"></div>
      <p className="relative text-right text-14 font-normal pl-[200px] pr-8 mt-4">{props.description}</p>
      <h2 className="content__item-title relative text-[150px] -mt-10">{props.title}</h2>
      
    </div>    
  )
}

export default ParallaxItem