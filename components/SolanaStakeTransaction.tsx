'use client'

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { useState, useEffect } from 'react';

export const StakeSOLToPaperDog = ({ address }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const ACCOUNT_ADDRESS = new PublicKey(address);

    const [amount, setAmount] = useState('')


    const onClick = async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const sendAmount = Number(amount) * 1000000000
        console.log('stake amount',amount)

        // 890880 lamports as of 2022-09-01
        const lamports = await connection.getMinimumBalanceForRentExemption(0);
        console.log('rent exemption',lamports)

        if (sendAmount < lamports) throw new Error('Amount must be greater than rent exemption')

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: ACCOUNT_ADDRESS,
                lamports: sendAmount,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        console.log('blockhash', blockhash)
        console.log('blocknumber', lastValidBlockHeight)
        
        try {
            const signature = await sendTransaction(transaction, connection, { minContextSlot });
        }
        catch(e) {
            console.error(e);
        }
        //await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
    };

    return (
        <div className="mx-auto flex justify-center opacity-90">
            <form
                onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const value = formData.get('value') as `${number}`
                }}
            >
                <input
                type="text"
                name="value"
                className="text-center form-control block mb-2 w-20 lg:w-full px-2 py-2 font-normal text-white bg-purple-800 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="AMOUNT"
                onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" onClick={onClick}>Stake SOL</button>

                <br></br>
                <br></br>
                <hr className="dashed w-full opacity-20"></hr>
                <br></br>
                
            </form>
        </div>
    );
};