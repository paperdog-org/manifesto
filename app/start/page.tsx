import Delay from "../../components/Delay"
import Typewriter from "../../components/Typewriter"
import Image from 'next/image'
import OneTooltip from '../../components/Tooltip'
import Start2Route2 from '../../components/Start2Route'


export default async function StartRoute() {

    return (
        <main className = "p-20">
            <div className="flex min-h-screen flex-col items-center text-center">
                <OneTooltip content="Welcome to PaperDog">
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
                <Typewriter text="PaperDog is a self-custody AI x Crypto experience." delay={111} />
                <br />
                <br />
                <Delay text="To access your PaperDog, you need a username and a special password called The Manifesto." delay={6000}/>
                <br />
                <br />
                <Delay text="The Manifesto is a written declaration that gives you control of your PaperDog." delay={15551}/>
                <br />
                <br />
                <Delay text=" Just make sure The Manifesto is kept very very safe. " delay={24000}/>
                <br />
                <br />
                <Delay text="**** are you ready? **** " delay={33701}/>
                <br />
                <br />
            
            <Start2Route2 />

            </div>
        </main>
    )
}