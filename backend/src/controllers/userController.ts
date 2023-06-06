import { Errors, Roles } from "../types";
import { IUser, User } from "../models/user";
import bcrypt from 'bcrypt';
import { ServerError } from "../middleware/errors";


/* 
*  returns a user or undefined depending on if the user was found.
*  searchValue is either the user's email or userId.
*  If useEmail is true the searchValue should be the user's email else the userId.
*/
export async function getUser(searchValue: string, useEmail:boolean=false): Promise<IUser | null> {
  const searchObj = useEmail ? { email: searchValue } : { uid: searchValue }

  const user = await User.findOne(searchObj);

  return user;
}

export async function createUser({email, role, password}: UserLight): Promise<IUser> {
  // Hash the password before saving it to the database
  let hashedPassword: string | undefined;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    role
  });

  // Save the user to the database
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new ServerError(Errors.RESOURCE_CREATION, 409);
  }

  return newUser;
}

export function updateUser() {

}

// User without id field
interface UserLight {
  email: string,
  role: Roles;
  password?: string;
}