import { Errors, Roles } from "../types";
import { IUser, User } from "../models/user";
import bcrypt from 'bcrypt';
import { ServerError } from "../middleware/errors";
import Contractor, { IContractor } from "../models/contractor";
import { Homeowner, IHomeowner } from "../models/homeowner";
import { PlaceAutocompleteResponseData, PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { parseLocationAreaData, parseLocationData } from "../util/maps";


/* 
*  returns a user or undefined depending on if the user was found.
*  searchValue is either the user's email or userId.
*  If useEmail is true the searchValue should be the user's email else the userId.
*/
export async function getUser(searchValue: string, useEmail:boolean=false): Promise<IContractor | IHomeowner | null> {
  if (useEmail)
    return await User.findOne({ email: searchValue })
  
  const user = await User.findById(searchValue);
  return user ? user.toObject() : null;
}

export async function createUser(user: IUser): Promise<IContractor | IHomeowner> {
  const { password, role } = user;

  // Hash the password before saving it to the database
  let hashedPassword: string | undefined;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const buildNewUser = async () => {
    if (role === Roles.CONTRACTOR) {
      const location = (user as IContractor).location as { [key: string] : any };

      const parsedLocationData = await parseLocationAreaData(location as PlaceAutocompleteResult);

      console.log(parsedLocationData)
      
      return new Contractor({
        ...user,
        location: parsedLocationData,
        password: hashedPassword
      });
    }
    return new Homeowner({
        ...user,
        password: hashedPassword
      });
  }

  const newUser = await buildNewUser();

  // Save the user to the database
  try {
    await newUser?.save();
    return newUser.toObject();
  } catch (err) {
    throw new ServerError(Errors.RESOURCE_CREATION + ': ' + err, 409);
  }
}

export function updateUser() {

}