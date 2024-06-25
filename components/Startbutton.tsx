'use client'
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'


function Startbutton() {
    const { data: session } = useSession()

    const handleSignOut = async () => { 
        signOut()
    }

    const address = '0x5dfc3C1e3FF34C6D8c7e0bD8B87763060cbE918e'

    const handleLogin = async () => {
    try {
      const callbackUrl = '/protected'
      if (address) {
        signIn('credentials', { address: address, callbackUrl })
        console.log('Connected to ' + address) 
       return
      }
      else {
        throw Error
      }
    } catch (error) {
     window.alert(error)
    }
    }
    
    const goflag = false

    if (!session && goflag)
    { 
      handleLogin()
    }

    if (session) {
        return (
            <>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                paperdog.eth
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
                                <code className="font-mono font-bold">WOOF</code>
                            </a>
                        
                    </div>
                </button>
                {session?.user?.name} 
                </div>
            </>
        );
    }

     //className="pointer-events-none flex place-items-center gap-2 p-3 lg:pointer-events-auto lg:p-0" rel="noopener noreferrer"
    return (
        //<a href= "/login">
            <div className="fixed bottom-0 p-5 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">      
            paperdog.org
            <br />
                <button onClick={() => handleLogin()}> 
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
        //</a>
    )
}

export default function Sbutton() {
    return (
        <div className="flex flex-col justify-between p-11">
            <Startbutton />
        </div>
    )
}