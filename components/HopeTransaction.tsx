import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

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