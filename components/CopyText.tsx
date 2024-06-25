'use client'
import React, { useState, useEffect } from 'react';
import { CopyIcon } from '@chakra-ui/icons'
import { useClipboard, Button, useBreakpointValue } from '@chakra-ui/react'


const Copywriter = ({ text }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const buttonSize = useBreakpointValue(['xs', 'xl'])
  // Typing logic goes here
  useEffect(() => {
    setValue(text)
    return;
  }, [text]);
  

  return <span>
        <Button variant='ghost' size={buttonSize} onClick={onCopy}>{ text }&nbsp;<CopyIcon /></Button>
      </span>;
};

export default Copywriter;