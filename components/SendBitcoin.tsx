'use client'
import { useState, useEffect, useRef } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'

export function SendBitcoin() {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.700'
          backdropFilter='blur(10px)'
        />
      )


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [size, setSize] = useState('sm')

    const initialRef = useRef(null)

    return (
        <div className='py-4'>
            <Button
                size='xs'
                variant='ghost'
                _hover={{bg: 'none'}}
                onClick={() => {
                setOverlay(<OverlayOne />)
                onOpen()
                }}
            >
                <div className="mx-auto mt-2 flex items-center justify-center opacity-90">
                    <a
                        className="bg-orange-400 group items-center justify-center rounded-full border border-black bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                        rel="noopener noreferrer"
                    >
                        <b>SEND</b>
                    </a>
                </div>
            </Button>

            <Modal blockScrollOnMount={false} isCentered size={size} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>

                            <ModalHeader>Send Bitcoin</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                                <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input ref={initialRef} placeholder='19pg2LANYjMoEUi38Xmv4ZB1dzi8iBcNwt' />
                                </FormControl>

                                <FormControl mt={4}>
                                <FormLabel>Amount in BTC</FormLabel>
                                <Input placeholder='0.001' />
                                </FormControl>
                            </ModalBody>

                        <ModalFooter>
                        <Button colorScheme='orange' mr={3}>
                            Send
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                            <ModalCloseButton />
                        </ModalFooter>

                </ModalContent>
            </Modal>
        </div>
    )
}