import OneTooltip from '../../components/Tooltip'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"

export default async function GoRoute() {


    return (
        <main className="text-black min-h-screen flex-col items-center justify-between p-10 font-bold">
            <div>
                <h1 className="text-xl opacity-70">
                    <a href="/">PaperDog</a>
                    <br />
                    &gt;<Typewriter text="About" delay={111} />&lt;
                </h1>
                <br />
                <br />
                <br />
                    <div className="text-left">
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
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                what's PaperDog?
                </h1>
                <br />
                <div className="text-black bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    PaperDog is a self-custody AI x Crypto experience.
                    <br />
                    <br />
                    PaperDog provides a unique way of interacting with Bitcoin, Ethereum, and Solana. 
                    <br />
                    <br />
                    PaperDog simplifies the process of engaging with the help of revolutionary AI technology. 
                    <br />
                    <br />
                    PaperDog is more than just a piece of technology. It is a movement.
                    <br />
                    <br />
                    The mission here: Push AI and Crypto to its limits.
                    <br /> 
                    <br /> 
                    <br /> 
                    <br />
                    <br />
                    <OneTooltip content="A manifesto is a written declaration of the intentions, motives, or views of the issuer, be it an individual, group, political party, or government. ">
                    <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    What's The Manifesto?
                    </h1>
                    </OneTooltip>
                    <br />
                    <br />
                    The Manifesto is how you gain access to the PaperDog experience.
                    <br />
                    <br />
                    One of the most difficult aspects of engaging with crypto is that one must be able to secure their own private keys. 
                    <br /> <br /> 
                    If the keys are lost, one loses access to their assets and funds. 
                    <br /> 
                    <br /> 
                    As of 2024, the most user friendly way to store private keys is through <u>seed phrases</u>. 
                    <br /> 
                    <br /> 
                    Essentially, you get a cool set of 12 to 24 words that work like a password to give you access to crypto. 
                    <br /><br />
                    In practice, it can be done using almost any phrase, but the seed phrase is used to ensure that the odds of identifying those exact words in the correct order would be almost entirely impossible - at least in a probabilistic sense. 
                    <br />
                    <br /> 
                    For example, the odds of guessing a 12-word seed phrase is 1 in 5,444,517,870,735,015,415,413,993,718,908,291,383,296.
                    <br /> 
                    <br /> 
                    I won't write down the odds of guessing a 24-word seed phrase because it'd be about the same odds as correctly picking a single atom in the universe.
                    <br /> 
                    <br /> 
                    Crazy how math works sometimes.
                    <br /> 
                    <br /> 
                    <br /> 
                    Most crypto wallets use seed phrases 
                    including MetaMask, Phantom, and Leather as well as hardware wallets like Trezor and Ledger.
                    <br /> 
                    <br /> 
                    PaperDog also uses seed phrases, but it is called The Manifesto.
                    <br /> 
                    <br /> 
                    The Manifesto is not just a seed phrase.
                    <br /> 
                    <br /> 
                    Yes, a 24-word seed phrase is generated as The Manifesto.
                    <br /> 
                    <br /> 
                    But, The Manifesto can be anything that is sufficiently random. 
                    <br /> 
                    <br /> 
                    And, The Manifesto can even be recovered if saved.
                    <br /> 
                    <br /> 
                    <br /> 
                    <br />
                    <br />
                    <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                    Anything else?
                    </h1>
                    <br />
                    <br />
                    only you have access to your PaperDog.
                    <br />
                    <br />
                    you can only access your PaperDog with The Manifesto.
                    <br />
                    <br />
                    The Manifesto is created on your 1st login.
                    <br />
                    <br />
                    you can export and save it for storage. 
                    <br />
                    <br />
                    we recommend writing it down by hand with a paper and pen but you can do whatever you want.
                    <br />
                    <br />
                    just make sure to keep The Manifesto safe and secure.
                    <br />
                    <br />
                    because anyone can use your PaperDog with The Manifesto.
                    <br />
                    <br />
                    <br />
                    also, please review any warnings.
                    <br />
                    <br />
                    especially before signing transactions.
                    <br />
                    <br />
                    <br />
                    ...oh and one last thing.
                    <br />
                    <br />
                    NEVER EVER SHARE THE MANIFESTO
                    <br />
                    <br />
                    really, don't ever do it.
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
                <a
                    href="/"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-l font-semibold`}>
                    Go To{' '}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-lg opacity-50`}>
                    <b>PaperDog</b>
                    </p>
                </a>

                <a

                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

                    
                >
                    <h2 className={`mb-3 text-l font-semibold`}>
                    Please Read{' '}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    By using PaperDog, you agree to our <a href="/terms" target="_blank" className="green"><b >Terms and Conditions</b></a> and <a href="/policy" target="_blank" className="green"><b>Privacy Policy</b></a>.
                    </p>
                </a>
            </div>
        </main>
    )
}