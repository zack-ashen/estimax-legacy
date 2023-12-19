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
  getProjects: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: propertyUrl + id + "/projects",
    });

    if (response.status === 200) {
      return { projects: response.data.projects };
    } else {
      return { error: response.data.error };
    }
  },
  getAll: async () => {
    const response = await api.request({
      method: "GET",
      url: propertyUrl,
    });
    if (response.status === 200) {
      return { properties: response.data.properties };
    } else {
      return { error: response.data.error };
    }
  },
};
