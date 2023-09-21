

export interface User {
    uid: string;
    email: string;
    password?: string;
    role: Roles;
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

export enum Roles { 
    CONTRACTOR = 'Contractor', 
    HOMEOWNER = 'Homeowner' 
}