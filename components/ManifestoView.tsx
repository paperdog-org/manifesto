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
import ManifestoLogin from "./ManifestoLogin"
import Hope from "./HopeManifesto"

export function ManifestoView() {
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
        fetch("../api/manifesto")
            .then((res) => res.json())
            .then((res) => {
                setStart('NEW');
                setNanifesto(res['Manifesto']); 
                setNpassWord(res['password']);
                setNuserName(res['username']);
                setNanifestoID(res['manifestoID']);
                setNanifestoIID(res['manifestoIID'])
                setNanifestoIIID(res['manifestoIIID']);
                setNanifestoIVD(res['manifestoIVD']);
                setNpII(res['ethManifesto']);
                setNpkII(res['ethPManifesto']);
                setNpIII(res['solManifesto']);
                setNpkIII(res['solWManifesto']);
                setNpIV(res['btcManifesto']);
                setNpkIV(res['btcWManifesto']);
                setP2status(res['status']);
            })
    };

    return (
        <div className='py-4'>
            <Button
                size='sm'
                color='white'
                variant='ghost'
                bg='#234c88' 
                mr={3}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <div className="text-center"><b>&oplus;&nbsp;THE•HOPE•MANIFESTO&nbsp;&oplus;</b></div>
            </Button>

            <Modal blockScrollOnMount={false} isCentered size={size} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>

                            <ModalHeader>THE•HOPE•MANIFESTO</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                                
                                <Hope />

                            </ModalBody>

                        <ModalFooter>

                        </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}