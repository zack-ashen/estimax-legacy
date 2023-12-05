import { IPropertyManager } from "../../models/propertyManager";
import { IUser, User } from "../../models/user";
import { Role } from "../../types";

export class UserService {
  async getById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user ? await user.toObject() : null;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    return user ? await user.toObject() : null;
  }

  getOrgId(user: IUser): string | undefined {
    if (user.role === Role.PROPERTY_MANAGER) {
      const pm = user as IPropertyManager;
      return pm.organization?.toString();
    }
  }
}

export default new UserService();
