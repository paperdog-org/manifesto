'use client'
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

function Authbutton() {
    const { data: session } = useSession()

    const username = 'paperdog23'
    const password = 'thisisthefinaltest'

    const handleLogin = async () => {
        try {
        const callbackUrl = '/'
        if (username) {
            signIn('credentials', { username: username, password:password, callbackUrl })
            console.log('Connected to ' + username) 
            console.log(session)
            return
        }
        else {
            throw Error
        }
        } catch (error) {
        window.alert(error)
        }
    }

    const handleSignOut = async () => { 
        signOut();
    }

    
    return (
        <a >
            <div className="fixed bottom-0 p-5 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">      
            paperdog.org
            <br />
                <button onClick={() => handleLogin()}> 
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"> 
                        <Image
                            src="./pdognobgfocus.png"
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