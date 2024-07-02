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
    Center,
    useBreakpointValue,
    Image
  } from '@chakra-ui/react'
import { CSVLink } from "react-csv"
import { QRCode } from 'react-qrcode-logo';
import { ManifestoView } from './ManifestoView'
import { AccountView } from './AccountView'


export function ManifestoHome({csvData}) {
    const OverlayTwo = () => (
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
      )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayTwo />)
    const [size, setSize] = useState('lg')

    const [userName, setUserName] = useState('paperdog23')
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')
    const [token, setToken] = useState('')
    const [qr, setQR] = useState('paperdog23')
    const [manifesto, setManifesto] = useState('')
    const [password, setPassword] = useState('')
    const [npkII, setNpkII] = useState("");
    const [npkIII, setNpkIII] = useState("");
    const [npkIV, setNpkIV] = useState("");
    const [npII, setNpII] = useState("");
    const [npIII, setNpIII] = useState("");
    const [npIV, setNpIV] = useState("");
    const [p2status, setP2status] = useState("");

    const retrieveManifesto = async () => {
        setManifesto('coming soon'); 
        setPassword('');
        setUserName('paperdog23');
        setQR('paperdog23')
        setNpII('0xf2E3519936cb9044b29A30F63357E243A32a9108');
        setNpkII('');
        setNpIII('DCfVtnrMMauFZFCygG5AoXPjQP1nQFcqdZGMxNkfPtAb');
        setNpkIII('');
        setNpIV('1J4ta3m48YS1vmMyFREiaHftACSEyVmy3E');
        setNpkIV('');
        setP2status('coming soon');
    };

    const onBTC = async () => {
        setAddress(npIV);
        setToken('BTC');
        setQR(npIV);
    }

    const onETH = async () => {
        setAddress(npII);
        setToken('ETH');
        setQR(npII);
    }

    const onSOL = async () => {
        setAddress(npIII);
        setToken('SOL');
        setQR(npIII);
    }

    const onPPD = async () => {
        setAddress('');
        setToken('');
        setQR(userName);
    }

    const onRealClose = async () => {
        onClose();
        setUserName('');
        setAddress('');
        setToken('');
        setBalance('');
        setQR('')
    }

    const textSize = useBreakpointValue(['text-xs', 'text-sm'])

     // <ModalCloseButton />
    return (
        <div className='text-center'>
            <Button
                size='lg'
                variant='ghost'
                _hover={{bg: 'none'}}
                onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                    retrieveManifesto()
                }}
            ><div className='opacity-60'>&oplus;</div>
                <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            src="/paperdogmanifesto.png"
                            alt="PaperDog Manifesto"
                            width={181}
                            height={34}
                            
                        />
            <div className='opacity-60'>&oplus;</div>
            </Button>

            <Modal isCentered size={size} isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                {overlay}
                <ModalContent color="#eeece2" bg="gray.800">

                            <ModalHeader>
                                <ModalCloseButton onClick={onRealClose} />
                                <br/>
                                <Center>
                                PaperDog 
                                </Center>
                                <Center>
                                <button onClick={onPPD}>&oplus; {userName} &oplus;</button>
                                </Center>

                                <div className='items-center text-center justify-center'>
                                    <AccountView />
                                </div>
                                
                            </ModalHeader>
                           

                            <ModalBody pb={6}>
                                <div className="grid max-w-8xl w-full grid-cols-3 ">
                                    <div className="text-center items-center justify-center align-center">
                                        <Button colorScheme='orange' size='md' onClick={onBTC}>
                                            Bitcoin
                                        </Button>
                                    </div>
                                    <div className="text-center items-center justify-center align-center">
                                        <Button colorScheme='blue' size='md'onClick={onETH}>
                                            Ethereum
                                        </Button>
                                    </div>
                                    <div className="text-center items-center justify-center align-center">
                                        <Button colorScheme='purple' size='md' onClick={onSOL}>
                                            Solana
                                        </Button>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <b>Address</b>
                                <br/>
                                <div className={textSize}>
                                    { address }
                                </div>
                                
                                <br/>
                                <Center>
                                <QRCode value={qr} eyeRadius={11} qrStyle={"dots"} bgColor={'#eeece2'} logoImage={"/paperdog.png"} logoPaddingStyle={'circle'} removeQrCodeBehindLogo={true}/>
                                </Center>
                                <br/>
                                <b>Balance</b>
                                <br/>
                                100&nbsp;HOPE
                                <br/>
                                { balance }&nbsp;{ token }
                                
                                
                            </ModalBody>

                        <ModalFooter>

                            <ManifestoView />
                            
                            <Button size='sm' color='white' bg='red.600' mr={3}>
                                <CSVLink data={csvData} className="text-center">
                                    <div className="text-center"><b>Export</b></div>
                                </CSVLink>
                            </Button>

                            <Button size='sm' onClick={onRealClose}>Close</Button>
                        </ModalFooter>

                </ModalContent>
            </Modal>
        </div>
    )
}