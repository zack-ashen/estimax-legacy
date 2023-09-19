import { FilterQuery, UpdateQuery } from 'mongoose'
import Contractor, { IContractor } from '../models/contractor'


export const findContractors = async (filter: FilterQuery<IContractor>, offset?: number, limit?: number) => {
    const offsetAmt = offset || 0;
    let contractors = await Contractor.find(filter).skip(+offsetAmt).limit(limit ? +limit : 0);
    return contractors.map(contractor => contractor.toObject());
}

export const findContractor = async (uid: string) => {
    const contractor = await Contractor.findById(uid);
    return contractor ? contractor.toObject() : null;
}

export const updateContractor = async (uid: string, updateQuery: UpdateQuery<IContractor>) => {
    await Contractor.findByIdAndUpdate(uid, updateQuery)
}