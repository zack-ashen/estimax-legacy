import { UpdateQuery } from "mongoose"
import { Homeowner, IHomeowner } from "../models/homeowner"



export const updateHomeowner = async (uid: string, updateQuery: UpdateQuery<IHomeowner>) => {
    await Homeowner.findByIdAndUpdate(uid, updateQuery)
}