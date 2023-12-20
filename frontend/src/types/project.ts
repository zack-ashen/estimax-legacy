export type Address = {
  unit?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  property: {
    id: string;
    name: string;
  };
  expirationDate: Date;
  dynamicBidding: boolean;
  public: boolean;
  status: string;
  bids: string[];
  invitedVendors: string[];
};

export interface Bid {
  contractorId: string;
  time: Date;
  amount: number;
  description: string;
  status: "Accepted" | "Overriden" | "Declined" | "Under Review";
  expiration: Date;
}

export type MessageText = {
  poster: string;
  posterName: string;
  timestamp: Date;
  messageText: string;
};

export type Message = {
  message: MessageText;
  replies: MessageText[];
};
