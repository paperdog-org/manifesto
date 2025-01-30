'use client'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"
import { Clock } from 'lucide-react'
import dynamic from 'next/dynamic'

const OneTooltip = dynamic(() => import('../../components/Tooltip'), {
    ssr: false
  })

export default async function GoRoute() {
    return (
        <main className="text-black min-h-screen flex-col items-center justify-between p-10 font-bold">
            <div>
                <h1 className="text-xl opacity-70 flex items-center gap-2">
                    <a href="/">PaperDog</a>
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-mono">6:51</span>
                    <br />
                    &gt;<Typewriter text="Temporal Interface" delay={111} />&lt;
                </h1>
                <br />
                <div className="text-left">
                    <OneTooltip content="Temporal bridge active...">
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

                <div className="space-y-8 text-black">
                    <section className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent opacity-70">
                        <h2 className="text-2xl font-bold mb-4">THE HOPE MANIFESTO</h2>
                        <p className="text-lg mb-6">
                            In 2232, humanity has moved beyond traditional governance. The Systems - decentralized algorithms controlling society - maintain balance between chaos and order. Until something unprecedented was detected: messages being sent backwards through time, originating from Earth circa 2024.
                        </p>
                        <p className="text-lg mb-6">
                            At the center of it all: PaperDog, an AI protocol that shouldn't exist for another two centuries.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent opacity-70">
                        <h2 className="text-2xl font-bold mb-4">THE PROTOCOL</h2>
                        <p className="text-lg mb-6">
                            PaperDog is more than technology - it's a bridge across time. A self-custody AI x Crypto experience that provides a unique way of interacting with Bitcoin, Ethereum, and Solana.
                        </p>
                        <p className="text-lg mb-6">
                            The mission: Push the boundaries of what's possible with AI and Crypto. Or perhaps... what will be possible.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent opacity-70">
                        <OneTooltip content="Access point to quantum consciousness">
                            <h2 className="text-2xl font-bold mb-4">THE MANIFESTO</h2>
                        </OneTooltip>
                        <p className="text-lg mb-6">
                            The Manifesto is your key to accessing PaperDog - a 24-word bridge between timelines. While it functions like a seed phrase, its true nature extends beyond simple key generation.
                        </p>
                        <p className="text-lg mb-6">
                            The odds of guessing a 24-word manifesto? About the same as selecting a single specific atom in the universe. Some say these odds aren't coincidental.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent opacity-70">
                        <h2 className="text-2xl font-bold mb-4">CRITICAL PROTOCOLS</h2>
                        <ul className="space-y-4 text-lg">
                            <li>• Your PaperDog is yours alone</li>
                            <li>• Access requires The Manifesto</li>
                            <li>• Generated on first temporal bridge</li>
                            <li>• Can be exported for secure storage</li>
                            <li>• Keep The Manifesto safe</li>
                            <li>• Review all temporal warnings</li>
                            <li className="font-bold text-xl mt-8">NEVER SHARE THE MANIFESTO</li>
                        </ul>
                    </section>

                    <section className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent opacity-70 mt-12">
                        <p className="text-lg italic">
                            The coordinates are set. The transmission is complete. Will you help us find HOPE?
                        </p>
                    </section>
                </div>
            </div>

            <div className="mt-16 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
                <a
                    href="/"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className="mb-3 text-l font-semibold">
                        Access Terminal{' '}
                    </h2>
                    <p className="m-0 max-w-[30ch] text-lg opacity-50">
                        <b>Initialize PaperDog</b>
                    </p>
                </a>

                <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <h2 className="mb-3 text-l font-semibold">
                        Temporal Protocols{' '}
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        By accessing PaperDog, you agree to our <a href="/terms" target="_blank" className="green"><b>Terms and Conditions</b></a> and <a href="/policy" target="_blank" className="green"><b>Privacy Policy</b></a>.
                    </p>
                </a>
            </div>
        </main>
    )
}