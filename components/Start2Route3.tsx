'use client'
import { useState, useEffect, useRef } from "react"


export default function Start2Route3() {

    const [btcPrice, setBTCprice] = useState("");
    const [ethPrice, setETHprice] = useState("");
    const [solPrice, setSOLprice] = useState("");

    

    useEffect(() => {
        fetch("../api/prices")
            .then((res) => res.json())
            .then((res) => {
                setBTCprice(res['BTC']); 
                setETHprice(res['ETH']);
                setSOLprice(res['SOL']);
            }
                )
    }, [])

    return (
        <main className="flex flex-col justify-between text-xs md:text-lg lg:w-full">
            
            <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-right">
                <a
                    href="/manifesto"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noreferrer"
                >
                    <h2 className={`mb-3 font-semibold text-left`}>
                    Yes, I'm ready{' '}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Let's GO
                    </p>
                </a>

                <a
                    href="/about"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 font-semibold text-right`}>
                    No?{' '}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-right lg:text-right`}>
                    wanna learn some more
                    </p>
                </a>
            </div>
        </main>
    )
}