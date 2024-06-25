'use client'

import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { StakeSOLToPaperDog } from "./SolanaStakeTransaction"

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');


export const Solana = ({ address }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = 'https://solana-mainnet.rpc.grove.city/v1/1fdcca1ff43737458ada43f9';

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             * new UnsafeBurnerWalletAdapter(),
             */
            
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    // @ts-ignore
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div>
                        <div className="">
                            <div>
                                {isPhantomInstalled && (<div> 
                                    <div className="">
                                        <WalletMultiButton />
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                        <br />
                        <hr className="dashed w-full opacity-20"></hr>
                        <br />
                        <div className="text-center items-center align-center justify-center">
                            <StakeSOLToPaperDog address={address}/>
                        </div>
                    </div>
                    {/*<WalletDisconnectButton />*/}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};