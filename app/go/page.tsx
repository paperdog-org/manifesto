import OneTooltip from '../../components/Tooltip'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"
import BootstrapCarousel from "../../components/Carousel";
export default async function GoRoute() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20 font-bold">
            <div>
                <h1 className="text-xl opacity-70">
                    Hi.
                    <br />
                    Welcome to PaperDog    
                    <br />
                    &gt;&gt;<Typewriter text="GO" delay={111} />
                </h1>
                <br />
                <BootstrapCarousel />
                
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    ok, let's GO!
                </h1>
                <br />
                    <div className="text-center">
                            <OneTooltip content="Hello!">
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
                    </div>
                <br />
                <br />
                <div className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    what's PaperDog?
                    <br />
                    <br />
                    <br />
                    PaperDog is a self-custody layer 3
                    <br />
                    <br /> 
                    <br /> 
                    Essentially, you get a cool phrase that gives you access to crypto
                    <br />
                    <br /> 
                    <br /> 
                    Today, PaperDog is live on Ethereum, Solana and Bitcoin
                    <br />
                    <br />
                    <br />
                    why use PaperDog?
                    <br />
                    <br />
                    <br />
                    PaperDog has Ethereum.
                    <br />
                    <br />
                    Ethereum is expensive
                    <br />
                    <br />
                    right now, a token swap costs $30.37 
                    <br />
                    <br />
                    you pay that every time you swap unless you use layer 2
                    <br />
                    <br />
                    but what if you only had to pay $9.36 and still land transactions on L1
                    <br />
                    <br />
                    if you did 10 swaps, 
                    <br />
                    you would save $230!
                    <br />
                    (and that's before talking about mev gains)
                    <br />
                    <br />
                    <br />
                    PaperDog has Solana.
                    <br />
                    <br />
                    Solana is cheap and fast
                    <br />
                    <br />
                    that also means it's cheap and fast for everyone (hackers, scammers, adn bots too)
                    <br />
                    <br />
                    but what if you could securely store your assets and reverse transactions*
                    <br />
                    <br />
                    and what if you could interact with anything and have the superpower to actually land transactions!
                    <br />
                    <br />
                    <br />
                    <br />
                    PaperDog has Bitcoin.
                    <br />
                    <br />
                    Bitcoin. Come on. Everyone wants Bitcoin and PaperDog has Bitcoin, inscriptions, ordinals, and runes(soon).
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    PaperDog gets you premium access to the three
                    <br />
                    <br />
                    and *shhh* you also get private addresses
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <u>anything else?</u>
                    <br />
                    <br />
                    <br />
                    only you have access to your PaperDog.
                    <br />
                    <br />
                    you can only access your PaperDog with your Manifesto.
                    <br />
                    <br />
                    you get a Manifesto (the cool phrase) on your 1st login.
                    <br />
                    <br />
                    so keep it safe.
                    <br />
                    <br />
                    there are always risks.
                    <br />
                    <br />
                    so please review any warnings.
                    <br />
                    <br />
                    especially before signing transactions* 
                    <br />
                    <br />
                    <br />
                    <br />
                    ...oh and one last thing
                    <br />
                    <br />
                    NEVER EVER SHARE YOUR MANIFESTO
                    <br />
                    <br />
                    really, don't ever do it
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    ready?
                </div>
            </div>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                    <OneTooltip content="set?">
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
                </div>
            </div>
            <br />
            <br />
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                    <a
                    className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-white px-9 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                    href = "/manifesto"
                    rel="noopener noreferrer"
                    >
                        <p>GO</p>
                    </a>
                </div>
            </div>
        </main>
    )
}