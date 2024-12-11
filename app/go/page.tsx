import OneTooltip from '../../components/Tooltip'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"
import BootstrapCarousel from "../../components/Carousel";
import { Clock, Binary, Webhook } from 'lucide-react';

export default async function GoRoute() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20 font-bold">
            <div>
                <h1 className="text-xl opacity-70 flex items-center gap-2">
                    <Binary className="h-4 w-4" />
                    TEMPORAL TRANSMISSION DETECTED
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-mono">6:51</span>
                    <br />
                    &gt;&gt;<Typewriter text="INITIALIZING QUANTUM BRIDGE" delay={111} />
                </h1>
                <br />
                <BootstrapCarousel />
                
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    SOLAR OPERATION LAYER: ACTIVE
                </h1>
                <br />
                    <div className="text-center">
                            <OneTooltip content="temporal signature detected">
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
                    NAVAL CORPS ARCHIVE // ACCESS POINT 2232
                    <br />
                    <br />
                    <br />
                    WARNING: TEMPORAL ANOMALY DETECTED
                    <br />
                    <br /> 
                    <br /> 
                    Binary Transmission Channel: COMPROMISED
                    <br />
                    <br /> 
                    <br /> 
                    The System requires authentication...
                    <br />
                    <br />
                    <br />
                    SCANNING QUANTUM SIGNATURES
                    <br />
                    <br />
                    <br />
                    Three chains detected. Analyzing...
                    <br />
                    <br />
                    Chain 0: GENESIS PROTOCOL
                    <br />
                    Chain 1: QUANTUM BRIDGE
                    <br />
                    Chain 2: TEMPORAL ANCHOR
                    <br />
                    <br />
                    Temporal resonance at maximum capacity
                    <br />
                    <br />
                    Space-time coordinates locked
                    <br />
                    <br />
                    <br />
                    ATTENTION: MANIFESTO REQUIRED
                    <br />
                    <br />
                    Authentication protocol initiated
                    <br />
                    <br />
                    Timeline convergence imminent
                    <br />
                    <br />
                    <br />
                    THE SYSTEM PRESENTS THREE TRUTHS:
                    <br />
                    <br />
                    1. The bridge exists beyond time
                    <br />
                    <br />
                    2. The key lies in quantum consciousness
                    <br />
                    <br />
                    3. HOPE protocol activation detected
                    <br />
                    <br />
                    <br />
                    CRITICAL ADVISORY
                    <br />
                    <br />
                    Timeline stability cannot be guaranteed
                    <br />
                    <br />
                    Proceed with caution
                    <br />
                    <br />
                    <br />
                    Remember:
                    <br />
                    <br />
                    THE MANIFESTO TRANSCENDS TIME
                    <br />
                    <br />
                    guard it with your consciousness
                    <br />
                    <br />
                    <br />
                    <br />
                    <u>FINAL TRANSMISSION</u>
                    <br />
                    <br />
                    quantum state collapse in progress...
                    <br />
                    <br />
                    do you accept the temporal responsibilities?
                </div>
            </div>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                    <OneTooltip content="temporal bridge active">
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
                    className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-9 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                    href = "/manifesto"
                    rel="noopener noreferrer"
                    >
                        <p>INITIATE TEMPORAL SEQUENCE</p>
                    </a>
                </div>
            </div>
        </main>
    )
}