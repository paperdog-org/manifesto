import { erc20ABI } from 'wagmi'

export const wagmiContractConfig = {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address',
        },
        { indexed: true, name: 'to', type: 'address' },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ name: 'tokenId', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'operator', type: 'address' },
      ],
      name: 'isApprovedForAll',
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ name: 'tokenId', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: '_data', type: 'bytes' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { name: 'operator', type: 'address' },
        { name: 'approved', type: 'bool' },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ name: 'interfaceId', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ name: 'tokenId', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ name: '', type: 'string' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const

export const usdcContractConfig = {
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  abi: erc20ABI,
} as const



export const WOOFContractConfig = {
  address: '0x7464a47f52B2c7bc86518917b2b36b612dB16983',
  abi: [{"name": "Transfer", "inputs": [{"name": "_from", "type": "address", "indexed": true}, {"name": "_to", "type": "address", "indexed": true}, {"name": "_value", "type": "uint256", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"name": "_owner", "type": "address", "indexed": true}, {"name": "_spender", "type": "address", "indexed": true}, {"name": "_value", "type": "uint256", "indexed": false}], "anonymous": false, "type": "event"}, {"stateMutability": "nonpayable", "type": "constructor", "inputs": [{"name": "_name", "type": "string"}, {"name": "_symbol", "type": "string"}, {"name": "_decimals", "type": "uint8"}, {"name": "_supply", "type": "uint256"}, {"name": "_price", "type": "uint256"}], "outputs": []}, {"stateMutability": "payable", "type": "function", "name": "buyWOOF", "inputs": [], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "transfer", "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "transferFrom", "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "approve", "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "increaseAllowance", "inputs": [{"name": "_spender", "type": "address"}, {"name": "_added_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "decreaseAllowance", "inputs": [{"name": "_spender", "type": "address"}, {"name": "_subtracted_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "mint", "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "outputs": [{"name": "", "type": "bool"}]}, {"stateMutability": "nonpayable", "type": "function", "name": "burn", "inputs": [{"name": "_value", "type": "uint256"}], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "burnFrom", "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "set_paperdog", "inputs": [{"name": "_paperdog", "type": "address"}], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "set_price", "inputs": [{"name": "_price", "type": "uint256"}], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "fetchETH", "inputs": [{"name": "_amount", "type": "uint256"}, {"name": "_to", "type": "address"}], "outputs": []}, {"stateMutability": "nonpayable", "type": "function", "name": "fetchWOOF", "inputs": [{"name": "_amount", "type": "uint256"}, {"name": "_to", "type": "address"}], "outputs": []}, {"stateMutability": "view", "type": "function", "name": "name", "inputs": [], "outputs": [{"name": "", "type": "string"}]}, {"stateMutability": "view", "type": "function", "name": "symbol", "inputs": [], "outputs": [{"name": "", "type": "string"}]}, {"stateMutability": "view", "type": "function", "name": "decimals", "inputs": [], "outputs": [{"name": "", "type": "uint8"}]}, {"stateMutability": "view", "type": "function", "name": "balanceOf", "inputs": [{"name": "arg0", "type": "address"}], "outputs": [{"name": "", "type": "uint256"}]}, {"stateMutability": "view", "type": "function", "name": "allowance", "inputs": [{"name": "arg0", "type": "address"}, {"name": "arg1", "type": "address"}], "outputs": [{"name": "", "type": "uint256"}]}, {"stateMutability": "view", "type": "function", "name": "totalSupply", "inputs": [], "outputs": [{"name": "", "type": "uint256"}]}, {"stateMutability": "view", "type": "function", "name": "paperdog", "inputs": [], "outputs": [{"name": "", "type": "address"}]}, {"stateMutability": "view", "type": "function", "name": "price", "inputs": [], "outputs": [{"name": "", "type": "uint256"}]}],
} as const