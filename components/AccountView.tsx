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
  } from '@chakra-ui/react'
import Manifesto from "./Manifesto"
import ManifestoLogin from "./ManifestoLogin"

export function AccountView() {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.700'
          backdropFilter='blur(10px)'
        />
      )


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [size, setSize] = useState('xl')

    const initialRef = useRef(null)

    const [nanifestoID, setNanifestoID] = useState("");
    const [nanifestoIID, setNanifestoIID] = useState("");
    const [nanifestoIIID, setNanifestoIIID] = useState("");
    const [nanifestoIVD, setNanifestoIVD] = useState("");

    const [nuserName, setNuserName] = useState("");
    const [npassWord, setNpassWord] = useState("");
    const [Nanifesto, setNanifesto] = useState("");

    const [npkII, setNpkII] = useState("");
    const [npkIII, setNpkIII] = useState("");
    const [npkIV, setNpkIV] = useState("");
    const [npII, setNpII] = useState("");
    const [npIII, setNpIII] = useState("");
    const [npIV, setNpIV] = useState("");

    const [p2status, setP2status] = useState("");
    const [start, setStart] = useState("START");

    const addresses = {btcaddress: npIV, ethaddress: npII, soladdress: npIII}

    const retrieveManifesto = async () => {

    };

    const changeManifesto0 = async () => {
        setFlag("0")
    }
    const changeManifesto1 = async () => {
        setFlag("1")
    }

    const [flag, setFlag] = useState("0")

    if (flag === "1")
        return (
            <div className='py-4'>
                <Button
                    size='xs'
                    color='#234c88'
                    variant='ghost'
                    bg='white' 
                    mr={3}
                    onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}
                >
                    <div className="text-center"><b>Account Settings</b></div>
                </Button>
    
                <Modal blockScrollOnMount={false} isCentered size={size} isOpen={isOpen} onClose={onClose}>
                    {overlay}
                    <ModalContent>
    
                                <ModalHeader>PaperDog Login</ModalHeader>
                                <ModalCloseButton />
    
                                <ModalBody pb={6}>
                                    
                                    <ManifestoLogin />

                                    <div className="flex flex-col items-center justify-between font-bold py-3">
                                        <a
                                            className="group items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-9 py-5 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            href = "./"
                                            rel="noopener noreferrer"
                                            >
                                                START
                                        </a>
                                    </div>
                                    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                                        <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                                            <button
                                            className="bg-green-900 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-8 py-4 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            onClick={changeManifesto0}
                                            >
                                                <p> NEW </p>
                                                &#x21bb;
                                            </button>
                                            <a
                                            className="opacity-30 bg-blue-900 group flex max-w-fit items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            >
                                                <p>
                                                passkey
                                                <br />
                                                &#9919;login
                                                </p>
                                            </a>
                                            <a
                                            className="opacity-30 bg-indigo-800 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-7 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            >
                                                <p>text
                                                <br />
                                                login</p>
                                            </a>
                                        </div>
                                    </div>
    
                                </ModalBody>
    
                            <ModalFooter>
    
                            </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        )

    return (
        <div className='py-4'>
            <Button
                size='xs'
                color='#234c88'
                variant='ghost'
                bg='white' 
                mr={3}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <div className="text-center"><b>Account Settings</b></div>
            </Button>

            <Modal blockScrollOnMount={false} isCentered size={size} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>

                            <ModalHeader>PaperDog Account</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                                
                                <Manifesto />
                                <div className="flex flex-col items-center justify-between font-bold py-3">
                                    <a
                                        className="group items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-9 py-5 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                        href = "./"
                                        rel="noopener noreferrer"
                                        >
                                            START
                                    </a>
                                </div>
                                <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                                        <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                                            <button
                                            className="opacity-30 bg-green-900 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-8 py-4 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            onClick={retrieveManifesto}
                                            >
                                                <p> NEW </p>
                                                &#x21bb;
                                            </button>
                                            <a
                                            className="opacity-30 bg-blue-900 group flex max-w-fit items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            >
                                                <p>
                                                passkey
                                                <br />
                                                &#9919;login
                                                </p>
                                            </a>
                                            <a
                                            className="opacity-80 bg-indigo-800 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            onClick={changeManifesto1}
                                            >
                                                <p>existing
                                                <br />
                                                login</p>
                                            </a>
                                        </div>
                                    </div>

                            </ModalBody>

                        <ModalFooter>

                        </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}