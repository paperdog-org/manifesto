'use client'

import { Alert, AlertIcon, AlertTitle, useBreakpointValue } from '@chakra-ui/react'
import  Bitcoin  from "./BitcoinConnect"
import { Solana } from "./SolanaConnect"
import { Ethereum } from './EthereumConnect'
import { StakeTransaction } from './EthereumStakeTransaction'



export default function Wallets({ btcaddress, ethaddress, soladdress }) {
    
    const alert = <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-60">
            <Alert status='warning' variant='subtle'>
                <AlertIcon boxSize={8}/>
                <AlertTitle>&nbsp;Web3 wallets not available on mobile. </AlertTitle>
            </Alert>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

    const nothing = 
        <div className="grid max-w-8xl w-full mb-0 grid-cols-3 py-3">          
            <div className="text-center items-center justify-center align-center py-2 px-3">
            <br/>
                <div className="w-full max-w-xl xl:px-0">
                    <div
                        className="mx-auto mt-5 items-center justify-center"
                    >
                        <Bitcoin address={btcaddress} />
                    </div>
                </div>
            </div>


            <div className="text-center items-center justify-center align-center py-2 px-3">
            <br/>
                <div className = "">
                    <div className="z-10 w-full px-0 xl:px-0">
                        <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                            <Ethereum />
                        </div>
                    </div>
                    <br />
                </div>
                
                <hr className="dashed w-full opacity-20"></hr>

                <div className="z-10 w-full px-0 xl:px-0">
                    <div className="mx-auto mt-6 flex justify-center opacity-90">
                        <StakeTransaction address={ethaddress} />
                    </div>
                
                </div>
            </div>




            <div className="text-center items-center justify-center align-center py-2 px-3">
            <br/>
                <div className="z-10 w-full max-w-xl px-0 xl:px-0">
                    <div
                        className="mx-auto mt-6 items-center justify-center space-x-5 opacity-90"
                    >
                        <Solana address={soladdress} />
                    </div>
                </div>
            </div>

        </div>

    const actuallyNothing = <></>

    const walletResp = useBreakpointValue([actuallyNothing, nothing])

    return (
        <>
            <hr className="dashed w-full opacity-20"></hr>
                { walletResp }
            <hr className="dashed w-full opacity-20"></hr>
            <br/>
        </>
    )
}
//
//<div className="text-left opacity-30">Web3 Wallets</div>

//
//