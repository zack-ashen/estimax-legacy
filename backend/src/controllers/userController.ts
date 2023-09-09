import { Errors, Roles } from "../types";
import { IUser, User } from "../models/user";
import bcrypt from 'bcrypt';
import { ServerError } from "../middleware/errors";
import Contractor, { IContractor } from "../models/contractor";
import { Homeowner, IHomeowner } from "../models/homeowner";
import { Icon } from "aws-sdk/clients/quicksight";


/* 
*  returns a user or undefined depending on if the user was found.
*  searchValue is either the user's email or userId.
*  If useEmail is true the searchValue should be the user's email else the userId.
*/
export async function getUser(searchValue: string, useEmail:boolean=false): Promise<IContractor | IHomeowner | null> {
  if (useEmail)
    return await User.findOne({ email: searchValue })
  
  return await User.findById(searchValue)
}

export async function createUser(user: IUser): Promise<IContractor | IHomeowner> {
  const { password, role } = user;

  // Hash the password before saving it to the database
  let hashedPassword: string | undefined;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const buildNewUser = () => {
    if (role === Roles.CONTRACTOR) {
      return new Contractor({
        ...user,
        password: hashedPassword
      }) as IContractor;
    }
    return new Homeowner({
        ...user,
        password: hashedPassword
      }) as IHomeowner;
  }

  const newUser = buildNewUser();
  

  // Save the user to the database
  try {
    await newUser?.save();
    return newUser;
  } catch (err) {
    throw new ServerError(Errors.RESOURCE_CREATION, 409);
  }
}

export function updateUser() {

}