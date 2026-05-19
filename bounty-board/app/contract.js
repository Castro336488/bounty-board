export const CONTRACT_ADDRESS = '0x9b22577a97300326562D52D520CD6AaDE6506c72'

export const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'

export const CONTRACT_ABI = [
  {
    name: 'postBounty',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
    ],
    outputs: [{ name: 'id', type: 'uint256' }],
  },
  {
    name: 'submitWork',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'id', type: 'uint256' },
      { name: 'submissionUrl', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'approveWork',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'cancelBounty',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'getAllBounties',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'poster', type: 'address' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'reward', type: 'uint256' },
          { name: 'status', type: 'uint8' },
          { name: 'solver', type: 'address' },
          { name: 'submissionUrl', type: 'string' },
        ],
      },
    ],
  },
]

export const USDC_ABI = []

export const STATUS = ['Open', 'Submitted', 'Completed', 'Cancelled']