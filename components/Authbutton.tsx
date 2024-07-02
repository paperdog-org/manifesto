'use client'
import React from 'react'
import Image from 'next/image'
//import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from "react"


function Authbutton() {
    //const { data: session } = useSession()

    const [goflag, setGoflag] = useState(false);

    const handleSignOut = async () => { 
        //signOut();
        setGoflag(false);
    }

    const username = 'paperdog23'
    const password = 'thisisthefinaltest'

    const handleLogin = async () => {
    try {
      const callbackUrl = '/protected'
      if (username) {
        //signIn('credentials', { username: username, password:password, callbackUrl })
        console.log('Connected to ' + username) 
        //console.log(session)
       return
      }
      else {
        throw Error
      }
    } catch (error) {
     window.alert(error)
    }
    }
    

    //if (!session && goflag)
    const handleTest = async () => { 
        setGoflag(true)
        handleLogin()
    }

    //session
    //<code className="font-mono font-bold">WOOF</code>
    if (false) {
        return (
            <>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                {username} 
                <br /> 
                <button onClick={() => {handleSignOut()}}>
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                             <a
                                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/pdognobgfocus.png"
                                    alt="PaperDog Logo"
                                    className="dark:invert"
                                    width={81}
                                    height={24}
                                    priority
                                    />
                                
                            </a>
                        
                    </div>
                </button>
                {username} 
                </div>
            </>
        );
    }

     //className="pointer-events-none flex place-items-center gap-2 p-3 lg:pointer-events-auto lg:p-0" rel="noopener noreferrer"
     //onClick={() => handleLogin()}
    return (
        <a >
            <div className="fixed bottom-0 p-5 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">      
            paperdog.org
            <br />
                <button onClick={() => {handleTest()}}> 
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"> 
                        <Image
                            src="/pdognobgfocus.png"
                            alt="PaperDog Logo"
                            className="dark:invert"
                            width={81}
                            height={24}
                            priority
                            />
                    </div>
                </button>
            paperdog.org
            </div>
        </a>
    )
}

export default function Pbutton() {
    return (
        <div className="flex flex-col justify-between p-11">
            <Authbutton />
        </div>
    )
}