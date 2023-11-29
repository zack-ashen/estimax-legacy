import { Location } from './index';

export type Address = {
  unit?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export type Project = {
    id: string;
    name: string;
    homeownerId: string;
    description: string;
    category: string[];
    lowestBid: Bid;
    bids: Bid[];
    images: string[];
    location: Location;
    timeline: string;
    messages: Message[];
    invitedContractors: string[];
    status: string;
    winningBid: Bid;
    winningBidder: string;
  }


export interface Bid {
  contractorId: string;
  time: Date;
  amount: number;
  description: string;
  status: 'Accepted' | 'Overriden' | 'Declined' | 'Under Review';
  expiration: Date;
}

export type MessageText = {
  poster: string;
  posterName: string;
  timestamp: Date;
  messageText: string;
}

export type Message = {
  message: MessageText
  replies: MessageText[]
}
