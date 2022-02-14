import React from 'react';
// import SplitText from '@moxy/react-split-text';

const SplitTextAnimation = (props:any) => {  


  return (
    <>
      {/* <SplitText className="word"> */}
        <p className="text-justify"
          style={{fontSize:props.fontSize, lineHeight:`${props.fontSize}px`}}>
          {props.text}
        </p>
      {/* </SplitText> */}
    </>       
  )
}

export default SplitTextAnimation