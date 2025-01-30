'use client'
import Image from 'next/image'
import { FC, useState, useCallback, memo } from 'react'
import { HopeBalance } from './HopeBalance'
import OneTooltip from './Tooltip'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, VersionedTransaction, Transaction, SystemProgram } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

const HOPE_TOKEN = 'CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump'

export async function sendHOPE({ 
    amount, 
    destinationAddress, 
    connection, 
    wallet 
}: { 
    amount: number,
    destinationAddress: string,
    connection: Connection,
    wallet: any
}) {
    try {
        const HOPE_MINT = new PublicKey('CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump');
        const destinationPubkey = new PublicKey(destinationAddress);

        // Get token accounts
        const senderTokenAccount = await getAssociatedTokenAddress(
            HOPE_MINT,
            wallet.publicKey
        );
        
        const destinationTokenAccount = await getAssociatedTokenAddress(
            HOPE_MINT,
            destinationPubkey
        );

        // Create transfer instruction
        const transferInstruction = createTransferInstruction(
            senderTokenAccount,
            destinationTokenAccount,
            wallet.publicKey,
            amount * (10 ** 9) // Adjust for decimals
        );

        // Create and send transaction
        const transaction = new Transaction().add(transferInstruction);
        transaction.feePayer = wallet.publicKey;
        
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await wallet.sendTransaction(transaction, connection, {
            minContextSlot,
        });

        await connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature
        });

        return {
            success: true,
            signature
        };

    } catch (error) {
        console.error('Error sending HOPE:', error);
        return {
            success: false,
            error
        };
    }
}


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
            console.log('going')

            // Convert amount to lamports, handling decimals
            const amountInLamports = Math.floor(parseFloat('44') * 1e6)
            if (isNaN(amountInLamports)) {
                throw new Error('Invalid amount')
            }

            // Get quote from Jupiter
            const quoteResponse = await fetch(`https://quote-api.jup.ag/v6/quote?` + 
                `inputMint=2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo` +
                `&outputMint=9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump` +
                `&amount=${amountInLamports}` +
                `&slippageBps=50`
            ).then(res => res.json())

            console.log(quoteResponse)

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

const HopeProtocolComponent: FC = () => {
    const [swapAmount, setSwapAmount] = useState('')

    const handleSuccess = useCallback(() => {
        setSwapAmount('')
    }, [])

    const handleError = useCallback((error: any) => {
        console.error('Swap failed:', error)
    }, [])

    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setSwapAmount(value)
        }
    }, [])

    return (
        
        <div className="space-y-4 text-white">
            <div className='items-center align-center align-middle'>
                <OneTooltip content="Temporal bridge active">
                    <Image
                        src="./pdognobgfocus.png"
                        alt="PaperDog Logo"
                        width={111}
                        height={24}
                        className="dark:invert"
                    />
                </OneTooltip>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-2">Your Balance</h3>
                <HopeBalance />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                    <BuyHope 
                        amount={swapAmount} 
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    <BuyHope 
                        amount={swapAmount} 
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    <BuyHope 
                        amount={swapAmount} 
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
            </div>
        </div>
    )
}

export const HopeProtocol = memo(HopeProtocolComponent)