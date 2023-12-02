import { api } from "./config/axiosConfigs";

const locationUrl = "/location/";

export const LocationService = {
  search: async (value: string, type: "cities" | "address", limit: number) => {
    const response = await api.request({
      method: "GET",
      url: locationUrl + "search",
      params: {
        value,
        type,
        limit,
      },
    });

    return { locations: response.data.locations };
  },
};
