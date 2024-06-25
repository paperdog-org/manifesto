import OneTooltip from '../../components/Tooltip'
import Image from 'next/image'
import Typewriter from "../../components/Typewriter"
import BootstrapCarousel from "../../components/Carousel";

export default async function PolicyRoute() {


    return (
        <main className="flex min-h-screen flex-col items-left justify-between p-20 font-bold bg-white">
            <div>
                <h1 className="text-xl opacity-70">
                    <a href="/">PaperDog</a>
                    <br />
                    &gt;<Typewriter text="Privacy Policy" delay={111} />&lt;
                </h1>
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                PENDING - NEED TO UPDATE
                </h1>
                <br />
                <br />
                PLEASE READ THE POLICY CAREFULLY.
                <br />
                <br />
                <br />
            </div>

        </main>
    )
}