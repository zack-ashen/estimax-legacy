import { api } from "./config/axiosConfigs";

const vendorUrl = "/vendor/";

export const VendorService = {
  search: async (name: string, phoneNumber: string, limit: number) => {
    const response = await api.request({
      method: "GET",
      url: vendorUrl + "search",
      params: {
        name,
        phoneNumber,
        limit,
      },
    });

    return { vendors: response.data.vendors };
  },
};
