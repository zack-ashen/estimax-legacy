import { api } from "./config/axiosConfigs";

const organizationUrl = "/organization/";

export const OrganizationService = {
  getProperties: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: organizationUrl + id + "/properties",
    });

    if (response.status === 200) {
      return { properties: response.data.properties };
    } else {
      return { error: response.data.error };
    }
  },
  getProjects: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: organizationUrl + id + "/projects",
    });

    if (response.status === 200) {
      return { projects: response.data.projects };
    } else {
      return { error: response.data.error };
    }
  },
};
