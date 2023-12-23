import { api } from "./config/axiosConfigs";

const vendorUrl = "/vendors/";

export const VendorService = {
  search: async (
    query: SearchQuery,
    queryDetails: { page: number; limit?: number }
  ) => {
    const response = await api.request({
      method: "GET",
      url: vendorUrl + "search",
      params: { query, queryDetails },
    });

    return { vendors: response.data.vendors };
  },
  bids: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: vendorUrl + id + "/bids",
    });

    if (response.status === 200) {
      return { bids: response.data.bids };
    } else {
      return { error: response.data.error };
    }
  },
};

type SearchQuery = {
  name?: string;
  searchRadius?: number;
  numberOfBids?: number;
  timeLeftToBid?: number;
};
