'use client'

import { FC, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, VersionedTransaction } from '@solana/web3.js'

const HOPE_TOKEN = 'CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump'

export const BuyHope: FC<{ 
    amount: string,
    onSuccess?: () => void,
    onError?: (error: any) => void 
}> = ({ amount, onSuccess, onError }) => {
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()
    const [isLoading, setIsLoading] = useState(false)

    const executeSwap = async () => {
        if (!publicKey || !amount) return

        try {
            setIsLoading(true)

            // Convert amount to lamports, handling decimals
            const amountInLamports = Math.floor(parseFloat(amount) * 1e9)
            if (isNaN(amountInLamports)) {
                throw new Error('Invalid amount')
            }

            // Get quote from Jupiter
            const quoteResponse = await fetch(`https://quote-api.jup.ag/v6/quote?` + 
                `inputMint=So11111111111111111111111111111111111111112` +
                `&outputMint=${HOPE_TOKEN}` +
                `&amount=${amountInLamports}` +
                `&slippageBps=50`
            ).then(res => res.json())

            if (!quoteResponse || quoteResponse.error) {
                throw new Error('Failed to get quote: ' + (quoteResponse?.error || 'Unknown error'))
            }

            // Get swap transaction
            const { swapTransaction } = await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: publicKey.toString(),
                    wrapAndUnwrapSol: true
                })
            }).then(res => res.json())

            if (!swapTransaction) {
                throw new Error('Failed to create swap transaction')
            }

            // Deserialize and execute transaction
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64')
            const transaction = VersionedTransaction.deserialize(new Uint8Array(swapTransactionBuf))

            // Send transaction
            const signature = await sendTransaction(transaction, connection, {
                skipPreflight: true,
                maxRetries: 2
            })

            console.log(`Transaction sent: https://solscan.io/tx/${signature}`)
            
            onSuccess?.()

            // Get latest blockhash for confirmation
            //const latestBlockhash = await connection.getLatestBlockhash()
            
            //try {
                // Wait for confirmation with timeout
            //    const confirmation = await Promise.race([
            //        connection.confirmTransaction({
            //            blockhash: latestBlockhash.blockhash,
            //            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            //            signature
            //        }),
            //        new Promise((_, reject) => 
            //            setTimeout(() => reject(new Error('Transaction confirmation timeout')), 30000)
            //        )
            //    ])

            //    console.log(`Swap successful: https://solscan.io/tx/${signature}`)
            //    onSuccess?.()
            //} catch (confirmError) {
                // Even if confirmation fails, the transaction might have succeeded
            //    console.warn('Confirmation error, but transaction might be successful:', confirmError)
            //    console.log(`Transaction link: https://solscan.io/tx/${signature}`)
                // Still trigger success since the transaction was sent
            //    onSuccess?.()
            //}

        } catch (error) {
            console.error('Error executing swap:', error)
            onError?.(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={executeSwap}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${
                isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
            }`}
        >
            {isLoading ? 'Processing...' : 'Buy HOPE'}
        </button>
    )
}