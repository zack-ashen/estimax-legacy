import { IUser, User } from "../../models/user";

export class UserService {
  async getById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user ? await user.toObject() : null;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    return user ? await user.toObject() : null;
  }
}

export default new UserService();
