'use client'
import { useState, useEffect, useRef } from "react"
import OneTooltip from './Tooltip'
import { useClipboard } from '@chakra-ui/react'


export default function Manifesto() {

    const [manifestoID, setManifestoID] = useState("");
    const [manifestoIID, setManifestoIID] = useState("");
    const [manifestoIIID, setManifestoIIID] = useState("");
    const [manifestoIVD, setManifestoIVD] = useState("");

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [Manifesto, setManifesto] = useState("");

    const theusername = `this is your Username. \n feel free to change it`//${ Manifesto }`
    const thepassword = `this is your password. \n feel free to change it`//${ Manifesto }`
    const theManifesto = `this is your Manifesto. \n change at your own risk`//${ Manifesto }`

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePassWordChange = (e) => {
        setPassWord(e.target.value);
    };

    const handleManifestoChange = (e) => {
        setManifesto(e.target.value);
    };

    useEffect(() => {
        setManifesto('paper '+'coming soon'+' dog'); 
        setPassWord('');
        setUserName('paperdog23');
        setManifestoID('eu8x2qwuholeiauk2yi2450s1xa97juy');
        setManifestoIID('0xF82b1554D28aBFf9c77c7E37c1413F83A91A4A2B')
        setManifestoIIID('6Nm9zcrfnuSSzjXNoL8YXCHohPUq2Znu3yeewkeggdMh');
        setManifestoIVD('1PjUKAYhoxLomSPvNQXdyo3FQDC4jEakJG');
        //fetch("../api/manifesto")
        //    .then((res) => res.json())
        //    .then((res) => {
        //    }
        //        )
    }, [])
    ;

    //const { onCopy, value, setValue, hasCopied } = useClipboard("");
    //<button className="text-white" onClick={onCopy}>{hasCopied ? "copied" : "copy"}</button>

    return (
        <main className="flex flex-col justify-between z-10 text-xs md:text-lg text-left">
            <div className="md:text-sm">
            This is your PaperDog Username and Manifesto. <br/>
            It allows access to your PaperDog. <br/>
            Please keep it safe. <br/> <br/>
            </div>
            <hr className="dashed w-full opacity-80"></hr>
            <div className = "text-left">      
                <div className="p-2 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-black  drop-shadow-sm [text-wrap:balance] md:text-m md:leading-[5rem]">
                    <div className="flex gap-8 justify-left">

                        <OneTooltip content={theusername}>
                            <div className="flex w-23 cursor-default rounded-md transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
                                <a
                                    className="p-3 bg-blue-900 rounded text-white px-4"
                                    //onClick={retrieveManifestoI}
                                    >
                                    PaperDog
                                </a>
                            </div>
                        </OneTooltip>

                        

                        <input
                        className="p-3 border border-indigo-300 rounded text-black px-11 text-left"
                        placeholder="Name"
                        onChange={handleUserNameChange}
                        value={userName}
                        />
                        
                    </div>
                </div>

                <hr className="dashed w-full opacity-80"></hr>

                <div className="p-2 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-black  drop-shadow-sm [text-wrap:balance] md:text-m md:leading-[5rem]">
                    <div className="flex gap-8 justify-left">

                        <OneTooltip content={theManifesto}>
                            <div className="flex w-23 cursor-default rounded-md transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100">
                                <a
                                    className="p-3 bg-blue-900 rounded text-white"
                                    //onClick={retrieveManifestoIII}
                                    >
                                    Manifesto
                                </a>
                            </div>
                        </OneTooltip>

                        <textarea 
                        className="p-3 border border-indigo-300 rounded text-black text-sm"
                        rows={ 8 }
                        cols={ 26 }
                        value = {Manifesto}
                        onChange={handleManifestoChange}
                        placeholder="Manifesto"
                        />
                    </div>
                </div>
            </div> 
            <hr className="dashed w-full opacity-80"></hr>
            <br />

            
        </main>
    )
}