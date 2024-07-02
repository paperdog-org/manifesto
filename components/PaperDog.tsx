'use client'
import { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import useSWR from 'swr'
import Copywriter from "./CopyText"
import Pbutton from './Authbutton'
import OneTooltip from './Tooltip'
import Typewriter from "./Typewriter"
import OneTool from './OneTool'
import Wallets from './Wallets'
import { SendBitcoin } from './SendBitcoin'
import Footer from './Footer'
//import { signIn, signOut, useSession } from 'next-auth/react'
import { ManifestoHome } from './ManifestoHome'
import { Stack } from '@chakra-ui/react'

export default function PaperDog() {
    //const { data: session, status } = useSession()

    const [btcPrice, setBTCprice] = useState("");
    const [ethPrice, setETHprice] = useState("");
    const [solPrice, setSOLprice] = useState("");
    const [latestTS, setLatestTS] = useState("");

    const fetcher = (url: any) => fetch(url).then((res) => res.json()).then((res) => {
                setBTCprice(res['BTC']); 
                setETHprice(res['ETH']);
                setSOLprice(res['SOL']);
                setLatestTS(res['LTS']);
            }
        )

    const { data, error, isLoading } = useSWR('../api/prices', fetcher,{refreshInterval: 10})

    const exportManifesto = () => {
        fetch("../api/export")
            .then((res) => res.json())
            .then((res) => console.log(res))
    };

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

    const [btcBalance, setBTCbalance] = useState("0");
    const [ethBalance, setETHbalance] = useState("0");
    const [solBalance, setSOLbalance] = useState("0");
    const [latestBTS, setLatestBTS] = useState("");


    const csvData =[
        ['chain', 'address', 'privatekey'] ,
        ['paperdog', JSON.stringify(nuserName).replace(/\"/g, ""), JSON.stringify(Nanifesto).replace(/\"/g, "")] ,
        ['ethereum', JSON.stringify(npII).replace(/\"/g, ""), JSON.stringify(npkII).replace(/\"/g, "")] ,
        ['solana', JSON.stringify(npIII).replace(/\"/g, ""), JSON.stringify(npkIII).replace(/\"/g, "")] ,
        ['bitcoin', JSON.stringify(npIV).replace(/\"/g, ""), JSON.stringify(npkIV).replace(/\"/g, "")],
      ];

    
    
    const theTip = `PaperDog is an AI x Crypto experince on Bitcoin, Ethereum and Solana. This is only the beginning`//${ Manifesto }`

    //onClick={retrieveManifesto}
    if (start == 'START') {
        return (
            <div>
              
              <main className="flex min-h-screen flex-col items-center justify-between p-20">
                
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full">
                    <a href="/PaperDog_Part0.pdf" download="manifesto">
                        <Image
                            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                            src="/paperdog3.png"
                            alt="PaperDog Header"
                            width={545}
                            height={337}
                        />
                    </a>
                </div>
        
        
                <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                    <button
                        className="group max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-7 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                        rel="noopener noreferrer"
                        
                    >
                        <b>{ start }</b>
                    </button>
                </div>
                
        
                <div>
                  <h1
                    className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-40 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem] md:px-20"
                  >
                    <br></br>
                    You have the strength, power, and courage to make your dreams come true. 
                    <br></br>
                    <br></br>
                    <br></br>
                    You can bring your ideas and visions into reality. 
                    <br></br>
                    <br></br>
                    <br></br>
                    You have the knowledge and resources.
                    <br></br>
                    <br></br>
                    <br></br>
                    And now you have HOPE
                    <br></br>
                    <br></br>
                  </h1>
                </div>
        
        
        
                
                <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                  <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                    <OneTooltip content="Are you ready?">
                      <div className="flex w-23 cursor-default items-center justify-center rounded-md px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
                        <Image
                          src="/pdognobgfocus.png"
                          alt="PaperDog Logo"
                          className="dark:invert"
                          width={111}
                          height={24}
                        />
                      </div>
                    </OneTooltip>
                  </div>
                </div>
              
                <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                  <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                    <a
                      className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-white px-7 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                      href = "/start"
                      rel="noopener noreferrer"
                    >
                      <b>START</b>
                    </a>
                  </div>
                </div>
        
        
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
        
                <br></br>
                <br></br>
              </main>
              <Pbutton />
            </div>
          );
}
    return (
        <main className="">
            <div className="p-3 font-bold opacity-80">
                <h1 className="text-xl opacity-70">
                    <a href="/">PaperDog</a>
                    <br />
                    <div className=''>
                    &gt;&gt;&gt;<Typewriter text="HOPE 100" delay={111} />
                    </div>
                </h1>
            </div>
            <div className="flex min-h-screen flex-col justify-between items-center p-5 bg-green">
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full">
                    <Stack>
                        <OneTool content={theTip}>
                            <Image
                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                src="/paperdog3.png"
                                alt="PaperDog Header"
                                width={250}
                                height={337}
                            />
                        </OneTool>
                        <ManifestoHome csvData={csvData}/>
                    </Stack>
                </div>
                
                <br/>
                <div className="flex flex-col justify-between text-xs md:text-lg lg:w-full">
                    <div className="max-w-8xl w-full">
                        <div className="align-center justify-center items-center text-center opacity-50">
                            <b>
                                BTC:<Copywriter text={npIV} />
                                <br />
                                ETH:<Copywriter text={npII} />
                                <br />
                                SOL:<Copywriter text={npIII} />
                            <br />
                            </b>
                        </div>
                    </div>

                    
                    
                    <br/>
                    <hr className="dashed w-full opacity-30"></hr>
                    <div className="text-left opacity-30">Genesis</div>


                    
                    
                    <div className="grid max-w-8xl w-full mb-0 grid-cols-3 py-3">
                        <div className="text-center items-center justify-center align-center py-2 px-3">
                            <b>BITCOIN</b>
                            <br />
                            <br />
                            <div
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                }}
                            >
                                <a target="_blank" href = "https://www.coingecko.com/en/coins/bitcoin ">
                                    <Image
                                        src="/Bitcoin.svg"
                                        alt="Bitcoin Logo"
                                        className="dark:invert"
                                        width={42}
                                        height={22}
                                        priority
                                    />
                                </a>
                            </div>
                            <br />
                            { btcPrice }
                            <br />
                            { btcBalance } BTC
                            <br />
                            <br />
                            
                        </div>

                        <div className="text-center items-center justify-center align-center py-2 px-3">
                            <b>ETHEREUM</b>
                            <br />
                            <br />
                            <div
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                }}
                            >
                                
                                <a target="_blank" href = "https://www.coingecko.com/en/coins/ethereum ">
                                    <Image
                                        src="/ethereum-eth-logo.svg"
                                        alt="Ethereum Logo"
                                        className="dark:invert"
                                        width={25}
                                        height={18}
                                        priority
                                    />
                                </a>
                            </div>
                            <br />
                            { ethPrice }
                            <br />
                            { ethBalance } ETH
                            <br />
                            <br />
                            
                        </div>

                        <div className="text-center items-center justify-center align-center py-2 px-3">
                            <b>SOLANA</b>
                            <br />
                            <br />
                            <div
                                style={{
                                display: "flex",
                                justifyContent: "center",
                                }}
                            >
                                <a target="_blank" href = "https://www.coingecko.com/en/coins/solana">
                                    <Image
                                        src="/solanaLogoMark.svg"
                                        alt="Solana Logo"
                                        className=""
                                        width={47}
                                        height={40}
                                        priority
                                    />
                                </a>
                            </div>
                            <br />
                            { solPrice }
                            <br />
                            { solBalance } SOL
                            <br />
                            <br />
                            
                        </div>

                    </div>

                    <Wallets btcaddress={npIV} ethaddress={npII} soladdress={npIII} />
                    


                    

                    
                    
                    <br/>
                    <br/>
                    <div className="text-right opacity-30">Last Close : {latestTS}</div>

                    <hr className="dashed w-full opacity-30"></hr>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={exportManifesto}>
                        <div className="text-3xl hover:bg-gray-200 hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                            &oplus;
                        </div>
                    </button>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="opacity-80 mx-auto mt-2 flex items-center justify-center space-x-5">
                        <button
                            className="group max-w-fit items-center justify-center space-x-2 rounded-full  px-20 py-1 text-sm text-black transition-colors hover:bg-white hover:text-black"
                            rel="noopener noreferrer"
                        >
                            <b>&nbsp;&nbsp;WOOF&nbsp;&nbsp;WOOF&nbsp;&nbsp;</b>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}