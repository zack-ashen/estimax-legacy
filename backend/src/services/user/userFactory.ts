import Vendor, { IVendor } from "../../models/Vendor/vendor";
import PropertyManager, {
  IPropertyManager,
} from "../../models/propertyManager";
import { ILocationArea } from "../../models/sub-schema/locationArea";
import { Role } from "../../types";
import { PropertyManagerDto, VendorDto } from "../../types/dtos";
import LocationService from "../locationService";
import OrganizationService from "../organizationService";

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
    const vendorLocationArea: ILocationArea =
      await LocationService.locationAreaFromPlaceId(vendorDto.location);

    const vendor = new Vendor({
      ...vendorDto,
      location: vendorLocationArea,
    });
    await vendor.save();
    return vendor.toObject();
  }

  private static async createPropertyManager(
    pmDto: PropertyManagerDto
  ): Promise<IPropertyManager> {
    const organization = await OrganizationService.create({
      name: "Personal",
    });

    const pm = new PropertyManager({
      ...pmDto,
      organization: organization.id,
    });
    await pm.save();

    await organization.users.push(pm.id);

    return pm.toObject();
  }
}

export default UserFactory;
