import React, {useState, useEffect} from 'react'

const FollowCursor = () => {  
  
  const FollowCursorInnerStyle = {
    fill: "var(--cursor-fill)",
    stroke: "var(--cursor-stroke)",
    strokeWidth: "var(--cursor-stroke-width)"
  };

  return (
    
      <circle className="cursor__inner" cx="25" cy="25" r="20" style={FollowCursorInnerStyle}></circle>
    
  )
}

export default FollowCursor