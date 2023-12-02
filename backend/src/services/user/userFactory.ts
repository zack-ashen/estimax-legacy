import Vendor, { IVendor } from "../../models/Vendor/vendor";
import PropertyManager, {
  IPropertyManager,
} from "../../models/propertyManager";
import { Role } from "../../types";
import { PropertyManagerDto, VendorDto } from "../../types/dtos";

class UserFactory {
  public static async create(
    user: VendorDto | PropertyManagerDto
  ): Promise<IVendor | IPropertyManager> {
    switch (user.role) {
      case Role.VENDOR:
        return this.createVendor(user as VendorDto);
      case Role.PROPERTY_MANAGER:
        return this.createPropertyManager(user as PropertyManagerDto);
      default:
        throw new Error("Invalid user type");
    }
  }

  private static async createVendor(vendorDto: VendorDto): Promise<IVendor> {
    const vendor = new Vendor(vendorDto);
    await vendor.save();
    return vendor;
  }

  private static async createPropertyManager(
    pmDto: PropertyManagerDto
  ): Promise<IPropertyManager> {
    const pm = new PropertyManager(pmDto);
    await pm.save();
    return pm;
  }
}

export default UserFactory;
