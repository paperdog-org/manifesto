'use client'
import { useState, useEffect } from "react"

export default function ManifestoLogin() {

    const [manifestoID, setManifestoID] = useState("");
    const [manifestoIID, setManifestoIID] = useState("");
    const [manifestoIIID, setManifestoIIID] = useState("");
    const [manifestoIVD, setManifestoIVD] = useState("");


    const handleManifestoChange = (e) => {
        setManifestoID(e.target.value);
    };

    const handleManifestoIChange = (e) => {
        setManifestoIID(e.target.value);
    };

    const handleManifestoIIChange = (e) => {
        setManifestoIIID(e.target.value);
    };

    const handleManifestoIIIChange = (e) => {
        setManifestoIVD(e.target.value);
    };
    

    return (
        <main className="flex flex-col items-center justify-between font-bold">
            <br/>
            <br/>
            <br/>
            <div className = "text-left">
                
                <div className="p-2 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-l font-bold tracking-[-0.02em] text-black opacity-70 drop-shadow-sm [text-wrap:balance] md:text-m md:leading-[5rem]">
                    <div className="flex gap-8 justify-center">

                        <button
                        className="p-4 bg-blue-800 rounded text-white"
                        //onClick={retrieveManifestoI}
                        >
                        I
                        </button>

                        <input
                        className="p-3 border border-indigo-300 rounded text-black"
                        placeholder="PaperDog"
                        onChange={handleManifestoIChange}
                        value={manifestoIID}
                        />
                        
                    </div>
                </div>


                <div className="p-2 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-l font-bold tracking-[-0.02em] text-black opacity-70 drop-shadow-sm [text-wrap:balance] md:text-m md:leading-[5rem]">
                    <div className="flex gap-8 justify-center">
                        <button
                        className="p-2 bg-blue-800 rounded text-white px-3"
                        //onClick={retrieveManifestoI}
                        >
                        II
                        </button>


                        <input
                        className="p-3 border border-indigo-300 rounded text-black"
                        placeholder="Manifesto"
                        onChange={handleManifestoIIIChange}
                        value={manifestoIVD}
                        />
                    </div>
                </div>

            </div> 
            <br />
            { manifestoID } 
            <br />
            
        </main>
    )
}