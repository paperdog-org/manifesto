'use client'

import { BaseError, parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { useState } from 'react';
import { wagmiContractConfig, WOOFContractConfig } from './contracts'
import { stringify } from '../utils/stringify'

export function WriteContract() {
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...WOOFContractConfig,
    functionName: 'buyWOOF'
  })
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const [amount, setAmount] = useState('')

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const amountIn = formData.get('amountIn') as string
          write({
            value: parseEther(amountIn)
          })
        }}
      >
        <input
        type="text"
        name="amountIn"
        className="form-control block mb-2 w-20 lg:w-full px-2 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="AMOUNT"
        onChange={(e) => setAmount(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Buy ETH
        </button>
      </form>
      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}