export interface User {
  uid: string;
  email: string;
  password?: string;
  role: Role;
  name: string;
  bio?: string;
  profilePhoto?: string;
  messages?: MessageThread;
}

export interface MessageThread {
  recipient: string;
  messages: Message[];
  projectId?: string;
}

export interface Message {
  messageText: string;
  timestamp: Date;
  sender: boolean;
}

export enum Role {
  VENDOR = "vendor",
  PROPERTY_MANAGER = "propertyManager",
}
