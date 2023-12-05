import { api } from "./config/axiosConfigs";

const propertyUrl = "/property/";

export const PropertyService = {
  create: async (property: any) => {
    const response = await api.request({
      method: "POST",
      url: propertyUrl,
      data: property,
    });

    if (response.status === 200) {
      return { property: response.data.property };
    } else {
      return { error: response.data.error };
    }
  },
  get: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: propertyUrl + id,
    });

    if (response.status === 200) {
      return { property: response.data.property };
    } else {
      return { error: response.data.error };
    }
  },
};
