'use client'

import { useAccount, useDisconnect } from 'wagmi'
import React from 'react'


export function Disconnect() {
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}
      </div>
    </div>
  )
}