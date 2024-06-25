'use client'
import React, { useState, useEffect } from 'react';
import Typewriter from "./Typewriter"


const Delay = ({ text, delay }) => {
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timeout)

  }, [show])

  if (!show) return null

  return <><Typewriter text={text}delay={100} /></>
  
};

export default Delay;