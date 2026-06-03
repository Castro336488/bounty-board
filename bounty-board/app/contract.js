export const CONTRACT_ADDRESS = '0x7675D2932D72b3F76d8f3e2d27ABF90dd0178683'

export const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'

export const CONTRACT_ABI = [
  {
    name: 'postBounty',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'category', type: 'uint8' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'id', type: 'uint256' }],
  },
  {
    name: 'submitWork',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'bountyId', type: 'uint256' },
      { name: 'submissionUrl', type: 'string' },
    ],
    outputs: [{ name: 'submissionId', type: 'uint256' }],
  },
  {
    name: 'approveWork',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'bountyId', type: 'uint256' },
      { name: 'submissionId', type: 'uint256' },
    ],
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
    name: 'expireBounty',
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
          { name: 'submissionCount', type: 'uint256' },
          { name: 'category', type: 'uint8' },
          { name: 'deadline', type: 'uint256' },
        ],
      },
    ],
  },
  {
    name: 'getBountySubmissions',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'bountyId', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'solver', type: 'address' },
          { name: 'submissionUrl', type: 'string' },
          { name: 'approved', type: 'bool' },
        ],
      },
    ],
  },
]

export const USDC_ABI = []

export const STATUS = ['Open', 'Completed', 'Cancelled', 'Expired']
export const CATEGORIES = ['Dev', 'Design', 'Content', 'Testing', 'Research']