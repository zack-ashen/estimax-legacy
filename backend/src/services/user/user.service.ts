import { Types } from "mongoose";
import { IPropertyManager } from "../../models/propertyManager.model";
import { IUser, User } from "../../models/user.model";
import { Role } from "../../types";

export class UserService {
  async getById(id: Types.ObjectId): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({ email });
    if (user) return user;
  }

  getOrgId(user: IUser): string | undefined {
    if (user.role === Role.PROPERTY_MANAGER) {
      const pm = user as IPropertyManager;
      return pm.organization?.toString();
    }
  }
}

export default new UserService();
