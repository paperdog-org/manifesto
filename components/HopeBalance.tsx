'use client'

import { FC, useEffect, useState, useCallback, useRef } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Connection } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

const HOPE_TOKEN = 'CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump'


const getTokenBalance = async (connection: Connection, publicKey: PublicKey) => {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
    )

    const hopeAccount = tokenAccounts.value.find(
        account => account.account.data.parsed.info.mint === HOPE_TOKEN
    )

    return hopeAccount ? hopeAccount.account.data.parsed.info.tokenAmount.uiAmount : 0
}

export const HopeBalance: FC = () => {
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const [balance, setBalance] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)
    const hasInitializedRef = useRef(false)
    const updateInProgressRef = useRef(false)

    const fetchBalance = async () => {
        if (!publicKey || updateInProgressRef.current) return
        
        updateInProgressRef.current = true
        try {
            setIsLoading(true)
            const amount = await getTokenBalance(connection, publicKey)
            setBalance(amount)
        } catch (error) {
            console.error('Error fetching HOPE balance:', error)
        } finally {
            setIsLoading(false)
            updateInProgressRef.current = false
        }
    }

    useEffect(() => {
        if (!publicKey || hasInitializedRef.current) return

        // Perform initial fetch
        hasInitializedRef.current = true
        fetchBalance()

        // Set up interval
        const intervalId = setInterval(fetchBalance, 12000)

        // Cleanup function
        return () => {
            clearInterval(intervalId)
            hasInitializedRef.current = false
        }
    }, [publicKey]) // Only re-run if wallet changes

    return (
        <div className="text-lg">
            {isLoading ? (
                <span>Loading HOPE balance...</span>
            ) : (
                <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} HOPE</span>
            )}
        </div>
    )
}