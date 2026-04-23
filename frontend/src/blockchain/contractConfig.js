export const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "landlord",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "monthlyRent",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "securityDeposit",
        "type": "uint256"
      }
    ],
    "name": "PropertyListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "landlord",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tenant",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountPaid",
        "type": "uint256"
      }
    ],
    "name": "PropertyRented",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isAvailable",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isRented",
        "type": "bool"
      }
    ],
    "name": "PropertyUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getAllProperties",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contactNumber",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "monthlyRent",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "securityDeposit",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "landlord",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tenant",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isAvailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isRented",
            "type": "bool"
          }
        ],
        "internalType": "struct PropertyRental.Property[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contactNumber",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_monthlyRent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_securityDeposit",
        "type": "uint256"
      }
    ],
    "name": "listProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "markPropertyAvailable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "properties",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contactNumber",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "monthlyRent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "securityDeposit",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "landlord",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tenant",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isAvailable",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isRented",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "propertyCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "rentProperty",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
