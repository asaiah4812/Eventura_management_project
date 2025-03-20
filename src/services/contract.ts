import { ethers } from "ethers";

// Define error types
interface EthereumError extends Error {
  code?: string | number;
  data?: unknown;
  message: string;
}

// Define Ethereum provider interface
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: () => void) => void;
  removeListener: (event: string, callback: () => void) => void;
}

// Update the global declaration
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const CONTRACT_ADDRESS = "0xf0a909393495fd3d19F61a11d4ce854586635851";

const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
    ],
    name: "EventCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "organizer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eventDateTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalTickets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "saleDeadline",
        type: "uint256",
      },
    ],
    name: "EventCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
    ],
    name: "EventUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "organizer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
    ],
    name: "TicketsPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
    ],
    name: "cancelEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_eventDateTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_saleDeadline",
        type: "uint256",
      },
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eventCounter",
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "eventRegistrations",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        internalType: "bool",
        name: "refunded",
        type: "bool",
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
    name: "events",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "organizer",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "eventDateTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ticketsSold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "saleDeadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "canceled",
        type: "bool",
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
    name: "fundsCollected",
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
        name: "_eventId",
        type: "uint256",
      },
    ],
    name: "getEvent",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "organizer",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "eventDateTime",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ticketPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalTickets",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ticketsSold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "saleDeadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "canceled",
            type: "bool",
          },
        ],
        internalType: "struct Eventura.Event",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_buyerName",
        type: "string",
      },
    ],
    name: "registerForEvent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ticketsBought",
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
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_eventDateTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_saleDeadline",
        type: "uint256",
      },
    ],
    name: "updateEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userEvents",
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
        name: "_eventId",
        type: "uint256",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class EventuraContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(provider: ethers.providers.Web3Provider) {
    this.signer = provider.getSigner();
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      this.signer
    );
  }

  async createEvent(
    title: string,
    description: string,
    eventDateTime: number,
    location: string,
    ticketPrice: number,
    totalTickets: number,
    saleDeadline: number
  ) {
    try {
      const tx = await this.contract.createEvent(
        title,
        description,
        eventDateTime,
        location,
        ethers.utils.parseEther(ticketPrice.toString()),
        totalTickets,
        saleDeadline,
        { gasLimit: 3000000 }
      );
      await tx.wait();
      return tx;
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error creating event:", ethError);
      throw new Error(ethError.message || "Failed to create event");
    }
  }

  async getEvent(eventId: number) {
    try {
      const event = await this.contract.getEvent(eventId);
      return {
        ...event,
        ticketPrice: ethers.utils.formatEther(event.ticketPrice),
      };
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error getting event:", ethError);
      throw ethError;
    }
  }

  async registerForEvent(
    eventId: number,
    buyerName: string,
    ticketPrice: string
  ) {
    try {
      const tx = await this.contract.registerForEvent(eventId, buyerName, {
        value: ethers.utils.parseEther(ticketPrice),
      });
      await tx.wait();
      return tx;
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error registering for event:", ethError);
      throw ethError;
    }
  }

  async cancelEvent(eventId: number) {
    try {
      const tx = await this.contract.cancelEvent(eventId);
      await tx.wait();
      return tx;
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error canceling event:", ethError);
      throw ethError;
    }
  }

  async withdrawFunds(eventId: number) {
    try {
      const tx = await this.contract.withdrawFunds(eventId);
      await tx.wait();
      return tx;
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error withdrawing funds:", ethError);
      throw ethError;
    }
  }

  async getEventCounter() {
    try {
      return await this.contract.eventCounter();
    } catch (error: unknown) {
      const ethError = error as EthereumError;
      console.error("Error getting event counter:", ethError);
      throw ethError;
    }
  }
}
