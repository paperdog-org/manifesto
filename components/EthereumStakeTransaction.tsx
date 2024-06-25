'use client'

import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransaction } from 'wagmi'
import { useState } from 'react';

import { stringify } from '../utils/stringify'

export function StakeTransaction({address}) {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction()
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  const [amount, setAmount] = useState('')

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const value = formData.get('value') as `${number}`
          sendTransaction({
            to: address,
            value: parseEther(value),
          })
        }}
      >
        <input
        type="text"
        name="value"
        className="text-center form-control block mb-2 w-20 lg:w-full px-2 py-2 font-normal text-white bg-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="AMOUNT"
        onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Stake ETH</button>
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
      
      <br></br>
      <hr className="dashed w-full opacity-20"></hr>
      <br></br>
    </div>
  )
}

//{isError && <div>Error: {error?.message}</div>}