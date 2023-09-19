export interface User {
    uid: string,
    name: string,
    email: string,
    role: Roles
}

export enum Roles { 
    CONTRACTOR = 'Contractors', 
    HOMEOWNER = 'Homeowners' 
}