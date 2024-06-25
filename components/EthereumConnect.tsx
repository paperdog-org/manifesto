'use client'
//import { Layout, Text, Page, Button, Link, Code } from '@vercel/examples-ui'
import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
//import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { WriteContract } from './WriteContract';

export function Ethereum() {
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  //const { data: session } = useSession()

  //const handleLogin = async () => {
  //  try {
  //    const callbackUrl = '/protected'
  //    if (address) {
  //      signIn('credentials', { address: address, callbackUrl })
  //      console.log('Connected to ' + address) 
  //      return
  //    }
  //    if (error) {
  //      throw error
  //    }
  //  } catch (error) {
  //    window.alert(error)
  //  }
  //}

  //if (isConnected && !session)
  //  { 
  //    handleLogin()
  //  }

  
  const handleLogout = async () => {
    disconnect()
    //signOut()
  }

  const displayname = address?.slice(0, 6) + '..' + address?.slice(-3)

  return (
    <div>
      <div>
        {isConnected && (
          <div>
            <div className="items-center justify-center">
              <button onClick={() => handleLogout()}>
                <a
                      className="group flex max-w-fit items-center justify-center rounded-full border border-black bg-black px-3 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/ethereum-eth-logo.svg"
                        alt="Ethereum Logo"
                        className="dark:invert"
                        width={20}
                        height={23}
                        priority
                      />
                      &nbsp;
                     {  displayname }
                    </a>
              </button>
            </div>
          </div>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
                <a
                  className="group flex items-center justify-center rounded border border-black bg-black px-3 py-2 text-med text-white transition-colors hover:bg-white hover:text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isLoading && (<div><b>Connecting ...</b></div>)}
                  {!isLoading && (<div><b>Select Wallet</b></div>)}
                  
                </a>
            </button>
          ))}
      </div>
    </div>
    
  )
}

//{isLoading && x.id === pendingConnector?.id && ' (connecting)'}
//{error && <div>{(error as BaseError).shortMessage}</div>}