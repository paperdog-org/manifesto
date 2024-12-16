'use client'

import { FC, useState, useCallback, memo } from 'react'
import { HopeBalance } from './HopeBalance'
import { BuyHope } from './HopeBuy'

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
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-bold mb-2">Your Balance</h3>
                <HopeBalance />
            </div>
            
            <div>
                <h3 className="text-lg font-bold mb-2">Buy HOPE</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={swapAmount}
                        onChange={handleAmountChange}
                        placeholder="Amount in SOL"
                        className="px-3 py-2 border rounded-lg"
                    />
                    <BuyHope 
                        amount={swapAmount} 
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            </div>
        </div>
    )
}

export const HopeProtocol = memo(HopeProtocolComponent)