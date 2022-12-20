export const DEPLOYED_ADDRESS = "0x27d127B3decD8170824eAec853fF1BF6b9a159d4";

export const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "keyword",
        type: "string",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "sendMoney",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "transactions",
    outputs: [
      {
        internalType: "string",
        name: "keyword",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];


export const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
    partialVisibilityGutter: 40
  },
  laptop: {
    breakpoint: {
      max: 1024,
      min: 769
    },
    items: 4,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 768,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
}

export const coinCardResponsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1440
    },
    items: 4,
    partialVisibilityGutter: 40
  },
  laptop: {
    breakpoint: {
      max: 1440,
      min: 769
    },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 768,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
}