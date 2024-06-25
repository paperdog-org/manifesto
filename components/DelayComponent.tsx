'use client'
import React, { useState, useEffect } from 'react';


const DelayComp = ({ comp, delay }) => {
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timeout)

  }, [show])

  if (!show) return null

  return (
    <div>
        <div className="text-container" dangerouslySetInnerHTML={{ __html: comp }} />
    </div>
  )
  
};

export default DelayComp;