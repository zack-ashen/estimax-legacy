import { UserType, Errors } from "../types";
import { User } from "../models/user";


/* 
*  returns a user or an error depending on if the user was found.
*  searchValue is either the user's email or userId.
*  If useEmail is true the searchValue should be the user's email else the userId.
*/
export async function getUser(searchValue: string, useEmail:boolean=false): Promise<UserType | Errors> {
  const searchObj = useEmail ? { email: searchValue } : { uid: searchValue }

  const user = await User.findOne(searchObj);
  if (!user)
    return Errors.USER_NOT_FOUND

  return user as UserType;
}

export async function createUser(user: UserType) {
  
}

export function updateUser(user: UserType) {

}