import Manifesto from "../../components/Manifesto"
import OneTooltip from '../../components/Tooltip'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"

export default async function ManifestoRoute() {
    const joker = 1


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2">
            <div>
                <h1 className="text-xl opacity-70 font-bold">
                    <a href="/">PaperDog</a> 
                    <br />
                    &gt;&gt;&gt;<Typewriter text="Manifesto" delay={111} />
                </h1>
                <br />
                    <div className="text-center">
                            <OneTooltip content="you should write it down">
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
                <Manifesto />
                <div className="flex flex-col items-center justify-between font-bold py-3">
                                    <a
                                        className="group items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-9 py-5 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                        href = "/"
                                        rel="noopener noreferrer"
                                        >
                                            START
                                    </a>
                                </div>
                                <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                                        <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                                            <a
                                            className="bg-green-900 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-8 py-4 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            href = "/manifesto"
                                            rel="noopener noreferrer"
                                            >
                                                <p> NEW </p>
                                                &#x21bb;
                                            </a>
                                            <a
                                            className="opacity-30 bg-blue-900 group flex max-w-fit items-center justify-center text-center space-x-2 rounded-full border border-blue bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            >
                                                <p>
                                                passkey&#9919;
                                                <br />
                                                login
                                                </p>
                                            </a>
                                            <a
                                            className="opacity-80 bg-indigo-800 group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue bg-black px-6 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                            rel="noopener noreferrer"
                                            href = "/login"
                                            >
                                                <p>existing
                                                <br />
                                                login</p>
                                            </a>
                                        </div>
                                    </div>
            </div>
            <br/>
            <br/>

        </main>
    )
}