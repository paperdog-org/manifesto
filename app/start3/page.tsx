import Delay from "../../components/Delay"
import Typewriter from "../../components/Typewriter"
import Image from 'next/image'
import OneTooltip from '../../components/Tooltip'
import Start2Route3 from '../../components/Start2Route3'
import { headers } from "next/headers"

export default async function Start3Route() {

    const ethaddress = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"paperdog2/ethaddress23", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.text()
    )

    const soladdress = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"paperdog2/soladdress23", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.text()
    )

    const btcaddress = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"paperdog2/btcaddress23", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.text()
    )


    return (
        <main className = "p-20">
            <div className="flex min-h-screen flex-col items-center text-center">
                <OneTooltip content="if you ever need more info, just look 4 around 4 a PaperDog. there's a lot of us =)">
                    <div className="flex w-23 cursor-default rounded-md transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
                        <Image
                        src="/pdognobgfocus.png"
                        alt="PaperDog Logo"
                        className="dark:invert"
                        width={111}
                        height={24}
                        priority
                        />
                    </div>
                </OneTooltip>
                
                <br />
                <br />
                <Typewriter text="PaperDog is a self-custody crypto solution." delay={100} />
                <br />
                <div className="p-2 text-sm text-center items-center justify-center align-center"><b>Bitcoin</b> <br/> { btcaddress }</div>
                <div className="p-2 text-sm text-center items-center justify-center align-center"><b>Ethereum</b> <br/> { ethaddress }</div>
                <div className="p-2 text-sm text-center items-center justify-center align-center"><b>Solana</b> <br/> { soladdress }</div>
                <br />
                <Delay text="To login, you need a username and password, but you will also need a Manifesto." delay={4800}/>
                <br />
                <br />
                <Delay text="Your Manifesto is a written declaration that gives you control of your PaperDog. " delay={14500}/>
                <br />
                <br />
                <Delay text="A secure login is generated for you but it can be anything you want it to be*" delay={24000}/>
                <br />
                <br />
                <Delay text=" Just make sure it is kept very safe* " delay={33711}/>
                <br />
                <br />
                <Delay text="**** are you ready? **** " delay={39039}/>
                <br />
                <br />
                
            <Start2Route3 />
            
            </div>
        </main>
    )
}