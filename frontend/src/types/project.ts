

export type Project = {
    id: string;
    name: string;
    homeownerId: string;
    description: string;
    category: string[];
    lowestBid: Bid;
    bids: Bid[];
    images: string[];
    location: string;
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


export type ProjectDraft = Omit<Project, 'id'>