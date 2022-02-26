import React,{useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import * as THREE from "three"

import FollowCursor from './components/FollowerCursor'
import Header from './components/Header'
import DotText from './components/DotText'
import HorizontalText from './components/HorizontalText'
import RisingAnimationText2 from './components/RisingAnimationText2'
import RisingAnimationText3 from './components/RisingAnimationText3'
import DetailsModal from './components/DetailsModal'
import ParallaxEffect from './components/ParallaxEffectThree'
import SmoothScroll from './components/SmoothScroll'
import TweenLite, {gsap} from 'gsap'

const color1 = '#000'
const color2 = '#e2e2e2'
// const Images=['img/img01.jpg', 'img/img02.jpg', 'img/img03.jpg', 'img/img04.jpg', 'img/img05.jpg', 'img/img06.jpg']

const Home: NextPage = () => {  
  const [isDark, setDark] = useState(true)   
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [DetailContent, setDetailContent] = useState({title:'initial', details:'initial', url:'img/img01.jpg'})
  const [showCanvasImage, setShowCanvasImage] = useState(false)
  const [canvasPlane, setCanvasPlane] = useState(new THREE.Mesh( new THREE.PlaneBufferGeometry(1, 1, 32, 32), new THREE.ShaderMaterial({ uniforms: { time: { value: 1.0 }, resolution: {value: new THREE.Vector2()}}})))
  const [scene, setScene] = useState(new THREE.Scene())
  const [indexTexture, setIndexTexture] = useState(0)
  const [viewport, setViewPort] = useState({width:0, height:0, aspectRatio:1})
  const [viewSize, setViewSize] = useState({distance:3, vFov:0, height:1, width:1})
  const [cursorPos, setPosition] = useState({x:0, y:0})
  const [uniforms, setUniforms] = useState({uTexture: {value: new THREE.Texture},uOffset: {value: new THREE.Vector2(0.0, 0.0)},uAlpha: {value: 1.0}})
  let mouse = new THREE.Vector2() 
  let camera: any
  let container: any

  const changeCanvasImageState = (value:number) =>{    
    if(value===-1)
    {
      setShowCanvasImage(false)      
      // while(scene.children.length > 0){ 
      //   scene.remove(scene.children[0]);
      // }
    }
    else{
      setIndexTexture(value)
      let _uniforms = uniforms
      const loader = new THREE.TextureLoader();
      loader.load(
        `img/img0${value}.jpg`,
        function ( _texture ) {
          _uniforms.uTexture.value = _texture
          setUniforms(_uniforms)
        },
        undefined,
        function ( err ) {
          console.error( 'error in texture loading');
        }
      )      
      setShowCanvasImage(true) 
    }
  }

  function threerender(){
    container = document.getElementById('hover-image-canvas')
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    container.appendChild( renderer.domElement )

    const viewport = {
      width : container.clientWidth,
      height : container.clientHeight,
      aspectRatio : container.clientWidth / container.clientHeight
    }
    
    camera = new THREE.PerspectiveCamera( 40, viewport.aspectRatio, 0.1, 100 )
    camera.position.set(0, 0, 3)
    
    const viewSize = {
      distance : camera.position.z,
      vFov : (camera.fov * Math.PI) / 180,
      height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
      width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
    }

    setViewPort(viewport)
    setViewSize(viewSize)
    renderer.setClearColor('#000000', 0)
    renderer.setSize(viewport.width, viewport.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    const loader = new THREE.TextureLoader();
    loader.load(
      `img/img0${indexTexture}.jpg`,
      function ( _texture ) {
        uniforms.uTexture.value = _texture
        const material1 = new THREE.ShaderMaterial({
          uniforms: uniforms,            
          vertexShader: `
            uniform vec2 uOffset;
            varying vec2 vUv;    
            vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
              float M_PI = 3.1415926535897932384626433832795;
              position.x = position.x + (sin(uv.y * M_PI) * offset.x);
              position.y = position.y + (sin(uv.x * M_PI) * offset.y);
              return position;
            }
    
            void main() {
              vUv = uv;
              vec3 newPosition = position;
              newPosition = deformationCurve(position,uv,uOffset);
              gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }`,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform float uAlpha;
            uniform vec2 uOffset;    
            varying vec2 vUv;
    
            vec3 rgbShift(sampler2D rgbTexture, vec2 uv, vec2 offset) {
              float r = texture2D(rgbTexture,vUv + uOffset).r;
              vec2 gb = texture2D(rgbTexture,vUv).gb;
              // float g= texture2D(rgbTexture,vUv).y;
              // float b= texture2D(rgbTexture,vUv).z;
              return vec3(r, gb);
            }
    
            void main() {
              vec3 color = rgbShift(uTexture,vUv,uOffset);
              gl_FragColor = vec4(color,uAlpha);
            }`,
          transparent: false
        })
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
        const Plane = new THREE.Mesh(geometry, material1)
        let imageRatio = _texture.image.naturalWidth/_texture.image.naturalHeight
        const scale = new THREE.Vector3(imageRatio, 1, 1)          
        Plane.scale.copy(scale)
        
        mouse.x = (cursorPos.x / viewport.width) * 2 - 1
        mouse.y = -(cursorPos.y / viewport.height) * 2 + 1
        
        let x = mouse.x * viewSize.width/2;
        let y = mouse.y * viewSize.height/2;

        Plane.position.set(x,y,0)
        setCanvasPlane(Plane)
        scene.add(Plane)
      },
      undefined,
      function ( err ) {
        console.error( 'error in texture loading');
      }
    ); 

    window.addEventListener( 'resize', onWindowResize );
    function onWindowResize() {
      container = document.getElementById('hover-image-canvas')
      
      const viewport = {
        width : container.clientWidth,
        height : container.clientHeight,
        aspectRatio : container.clientWidth / container.clientHeight
      }
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      const viewSize = {
        distance : camera.position.z,
        vFov : (camera.fov * Math.PI) / 180,
        height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
        width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
      }
      
      setViewPort(viewport)
      setViewSize(viewSize)
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    animate();
    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
  }
  
  useEffect(() => {
    // get normalized mouse position on viewport
    mouse.x = (cursorPos.x / viewport.width) * 2 - 1
    mouse.y = -(cursorPos.y / viewport.height) * 2 + 1
    
    let x = mouse.x * viewSize.width/2;
    let y = mouse.y * viewSize.height/2;
    const newPos = new THREE.Vector3(x, y,0)

    TweenLite.to(canvasPlane.position, 2, {
      x: x,
      y: y,
      ease: "Power4.easeOut",
      onUpdate: ()=>onPositionUpdate(newPos)
    })
  })

  const onPositionUpdate = (pos:any) => {
    // compute offset
    let offset = canvasPlane.position.clone().sub(pos).multiplyScalar(-0.2)
    uniforms.uOffset.value.x = offset.x
    uniforms.uOffset.value.y = offset.y
  }

  function AnimationText(){
    let animations = document.getElementsByClassName('animation-text1')
    if (animations.length>0){
      for(let i=0;i<animations.length;i++){
        let animation=animations[i]
        gsap.to(animation, 1.5, { rotate:0, top:0, ease: 'expo'});
        
      }
      
    }
  }

  useEffect(() => {
    if(typeof window !== "undefined"){
      threerender()
      AnimationText();
    }

    window.addEventListener("mousemove", (event: { clientX: number; clientY: number }) => {
      setPosition({x:event.clientX, y:event.clientY})      
    });    
  }, [])

  const OkDetailsModalhandle = () =>{ setShowDetailsModal(false) }
  const CloseDetailsModalhandle = () =>{ setShowDetailsModal(false) }
  const showDetailsModalhandle = (details:{ title: string; details: string; url: string }) =>{    
    setDetailContent(details)
    setShowDetailsModal(true)
  } 

  const buttonOverIn = () =>{
    let cursor = document.getElementById('cursor')
    if(cursor){
      gsap.to(cursor, { scale:4, opacity:0.3});
    }
  }

  const buttonOverOut = () =>{    
    let cursor = document.getElementById('cursor')
    if(cursor){
      gsap.to(cursor, { scale:1, opacity:1});
    }
  }

  const allow =
    <svg width="30" height="15" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="28" height="13" rx="6.5" fill={isDark?"#FF5C00":"#001AFF"} stroke={isDark?"#FF5C00":"#001AFF"} strokeWidth="2"/>
      <path className="arrow" fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill="white"/>
      <rect className="arrow" width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill="white"/>
      <rect className="arrow" width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49316)" fill="white"/>
    </svg>
  
  // const isSafariBrowser = () => { 
  //   console.log(navigator.userAgent)
  //   return (navigator.userAgent.indexOf('Safari') > -1)
  // }
  return (
    <>
      <Head>
        <title>Studio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SmoothScroll bkgroundColor={isDark?color1:color2} foreColor={isDark?color2:color1}>
        <div className="main-wrapper">
          <Header/>
          <div className="content">
            
            <section className="fluid__item fluid__item--home fluid__item--current text-[40px] md:text-[97px] leading-[50px] md:leading-[100px]">
              <div className="hidden md:block mt-32">
                <div className='animation-mask'>
                  <p className="animation-text1" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Independent</p>
                </div>
                <div className='animation-mask'>
                  <p className="animation-text1" >design&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;studio</p>
                </div>
                <div className='animation-mask'>
                  <div className='animation-text1'>
                    <div className="flex items-center">
                      <p className=" text-justify">based in</p>
                        <div className='text-white flex justify-center items-center relative'>                          
                          {isDark?
                            <img src='img/maskLeft.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>:
                            <img src='img/maskLeft1.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                          }
                          <button className={isDark?"animation-button border-2 border-gray-700 mx-[1px]":"animation-button blue-button border-2 border-gray-700 mx-[1px]"}
                            onMouseEnter={buttonOverIn} onMouseLeave={buttonOverOut}
                          >
                            <div className='btn-content h-[70px]' style={{color:isDark?'white':'black'}}>
                              <div className='btn-content-group'>
                                <div className='mx-2 text-16'>LET’S TALK</div><div className='mx-2'>{allow}</div>
                              </div>
                            </div>            
                          </button>                          
                          {isDark?
                            <img src='img/maskRight.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>:
                            <img src='img/maskRight1.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                          }
                        </div>
                      <p className="text-justify">los angeles</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden mt-10">
                <div className='animation-mask'><p className="animation-text1">Independent</p></div>
                <div className='animation-mask'><p className="animation-text1">design</p></div>
                <div className='animation-mask'><p className="animation-text1">studio</p></div>
                <div className='animation-mask'>
                  <div className='animation-text1'>
                    <div className='flex items-center'>
                      <p className=" text-justify  flex items-center">in</p>
                      {
                        isDark?
                        <button className="border-2 border-gray-800 px-3 mx-2 h-[36px] flex items-center rounded-full" onClick={ () => alert('clicked')}>
                          <span className="text-[16px]">LET’S TALK&nbsp;&nbsp;</span>
                          <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="28" height="13" rx="6.5" fill="#FF5C00" stroke="#FF5C00" strokeWidth="2"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill="black"/>
                            <rect width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill="black"/>
                            <rect width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49316)" fill="black"/>
                          </svg>
                        </button>
                        :
                        <button className="border-2 border-gray-800 px-3 mx-2 h-[36px] flex items-center rounded-full" onClick={ () => alert('clicked')}>
                          <span className="text-[16px]">LET’S TALK&nbsp;&nbsp;</span>
                          <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="28" height="13" rx="6.5" fill="#001AFF" stroke="#001AFF" strokeWidth="2"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill="white"/>
                            <rect width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill="white"/>
                            <rect width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49329)" fill="white"/>
                          </svg>
                        </button>
                      }
                      <p className=" text-justify  flex items-center">los</p>
                    </div>
                  </div>
                </div>                
                <div className='animation-mask'><p className="animation-text1  flex items-center">angeles</p></div>
              </div>
              <div className="h-[130px] md:h-[50px]"/>
              <DotText leftalign={true} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"/>
            </section>

            <section>
              <div className='md:hidden h-[100px]'/>
              <ParallaxEffect/>
            </section>

            <section className="mt-[50px] mb-[110px] md:mb-[250px]">
              <div className="h-[50px] hidden md:block"></div>
              <DotText leftalign={false} text="about" />
              <div className="h-[30px]"></div>

              <RisingAnimationText2/>
              
              <div className="md:flex justify-between items-center mt-4">
                <DotText leftalign={true} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."/>
                <div className="h-6 md:hidden"/>
                <div className="flex justify-center">
                  <div className='text-white flex justify-center items-center relative'>
                    
                    {isDark?
                      <img src='img/maskLeft.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>:
                      <img src='img/maskLeft1.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    }
                    <button className={isDark?"animation-button border-2 border-gray-700 mx-[1px]":"animation-button blue-button border-2 border-gray-700 mx-[1px]"}
                      onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}>
                      <div className='btn-content h-[70px]' style={{color:isDark?'white':'black'}}>
                        <div className='btn-content-group'>
                          <div className='mx-2 text-16'>OUR SERVICES</div><div className='mx-2'>{allow}</div>
                        </div>
                      </div>            
                    </button>                    
                    {isDark?
                      <img src='img/maskRight.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>:
                      <img src='img/maskRight1.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    }
                  </div>
                </div>
              </div>
            </section>

            <section className="horizontal-section" >
              <div style={{marginRight:'calc( ( 100vw - 1400px )/2)'}}>
                <DotText leftalign={false} text="SELECT&nbsp;PROJECTS" />
              </div>
              <div className="h-[16px] md:h-[30px]"></div>
              <HorizontalText step={-2.1} text="Project1" url={'img/img00.jpg'} index={0} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
              <HorizontalText step={ 2.1} text="Project2" url={'img/img01.jpg'} index={1} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
              <HorizontalText step={-1.2} text="Project3" url={'img/img02.jpg'} index={2} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
              <HorizontalText step={ 1.2} text="Project4" url={'img/img03.jpg'} index={3} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
              <HorizontalText step={-3.3} text="Project5" url={'img/img04.jpg'} index={4} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
              <HorizontalText step={ 3.3} text="Project6" url={'img/img05.jpg'} index={5} showdetail={showDetailsModalhandle} changeCanvasImageState={changeCanvasImageState}/>
            </section>

            <section className="mt-[110px] md:mt-[250px]  mb-[110px]">
              <RisingAnimationText3 isDark={isDark}/>
              <div className="h-10 md:hidden"/>
              <div className="w-full flex justify-end md:mt-4">
                <p className="hidden md:block text-14 w-[400px] mr-[150px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="text-14 w-full px-8 md:hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </section>

            <section className="md:flex justify-between items-center">
              <div className="flex items-center justify-center md:justify-start">
                <div className='text-white flex justify-center items-center relative mx-4 md:ml-16'>
                  {isDark?
                    <img src='img/maskLeft.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>:
                    <img src='img/maskLeft1.png' style={{height:'100%'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                  }
                  <button className={isDark?"animation-button mx-[1px]":"animation-button blue-button mx-[1px]"} onClick={() => setDark(!isDark)}
                    style={{border:isDark?'solid 2px #FF5C00':'solid 2px #0019FF'}} onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}
                  >
                    <div className='btn-content' style={{height:'56px !important', color:isDark?'white':'black'}}>
                      <div className='btn-content-group mx-4 text-[32px]'>
                        Dark/Light
                      </div>
                    </div>            
                  </button>                  
                  {isDark?
                    <img src='img/maskRight.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>:
                    <img src='img/maskRight.png' style={{height:'100%'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                  }
                </div>
                <p className="text-14 ml-12 hidden md:block ">DESIGN STUDIO<br/>LOS ANGELES</p>  
              </div>
              <p className="text-14 text-center mt-4 md:hidden pr-16">DESIGN STUDIO<br/>LOS ANGELES&nbsp;&nbsp;&nbsp;</p>  
              <div className="h-[75px] md:hidden"/>
              <p className="text-14 md:ml-6 text-center md:text-left">2022© STUDIO LLC. All Rights Reserved.</p>  
            </section>

            <section className="flex justify-center items-center -mx-16 pt-[100px] h-[120px] md:h-[120px] overflow-hidden">
              <p className="text-[180px] md:text-[240px] font-bold text-center">STUDIO©</p>  
            </section>
          </div>        
        </div>
      </SmoothScroll>
      <div id='hover-image-canvas' className="pointer-events-none" 
        style={{width:'100%', height:'100%', position:'fixed', left:0, top:0, zIndex:1, 
        opacity:showCanvasImage?1:0.0, transition:'opacity 0.3s ease-out' }}/>

      <DetailsModal show={showDetailsModal} handleClose={CloseDetailsModalhandle} bkColor={isDark?color1:color2} foreColor={isDark?color2:color1}>
        <div style={{height:'35vh', overflow:'auto'}} className="flex ml-0 mr-0">
          <div className='w-full'>
            <p className="text-center p-4 text-40">{DetailContent.title}</p>
            <p className="text-center p-8 text-20">{DetailContent.details}</p>
          </div>
        </div>
        <div style={{backgroundImage:`url(${DetailContent.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}} 
          className="absolute top-[40vh] md:-mx-10 w-full h-[60vh]"/>
      </DetailsModal>

      <div className="hidden md:block"><FollowCursor/></div>
      
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></Script>
      <Script src="./script/animationText.js"></Script> */}
    </>
  )
}
export default Home