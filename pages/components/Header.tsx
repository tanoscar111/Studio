import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import {gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Header = (props:any) => {
  function AnimationText(){

    let animations = document.getElementsByTagName('a')
    
    CustomEase.create("cubic-bezier", ".19,1,.22,1")
    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i]
        gsap.fromTo(animation, 1,{y:"100px", opacity:0}, { opacity:1, y:0, ease: 'cubic-bezier' ,delay: (2 + (i / 6)) });

      }

    }

  }
  
  
  useEffect(() => {
    window.onload = () => {
      AnimationText()
    };   
  });
  
  const animation = {
    exit : {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [.19,1,.22,1]
      }
    },
  }
  
  return (
    <>

      <motion.div exit='exit' className="md:hidden">
        <motion.div id="header" className="w-full flex justify-between items-center uppercase top-0 left-0 py-11">
          <Link href="#">
            <motion.a variants={animation} className="text-24 font-bold">Studio&copy;</motion.a>
          </Link>
          
          <Link href="#">
            <motion.a variants={animation} className="text-14 font-normal" onClick={()=>alert('Design Studio')}>
              Design Studio
            </motion.a>
          </Link>
          
          <Link href="#">
            <motion.a variants={animation} className="text-14 font-normal">
              <FaBars/>
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>
      <div id="header" className="hidden md:block">
        <motion.div exit='exit' className="w-full flex justify-between uppercase top-0 left-0 py-11">
          <Link href="#">
            <motion.a variants={animation} className="text-24 font-bold">Studio&copy;</motion.a>
          </Link>
          
          <Link href="#">
            <motion.a variants={animation} className="text-14 font-normal leading-[22px]" onClick={()=>alert('Design Studio')}>
              Design Studio
              <div className="underline -mt-2">studio&#64;studio.com</div>
            </motion.a>
          </Link>
          
          <Link href="#">
            <motion.a variants={animation} className="text-14 font-normal">
              SERVICES  /  Work            
            </motion.a>
          </Link>
          
          <Link href="/about">
            <motion.a variants={animation} className="text-14 font-normal">
              About  /  CONTACT
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </>
  )

}
export default Header