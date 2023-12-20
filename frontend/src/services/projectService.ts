import { api } from "./config/axiosConfigs";

const propertyUrl = "/project/";

export const ProjectService = {
  create: async (project: FormData) => {
    const response = await api.request({
      method: "POST",
      url: propertyUrl,
      data: project,
    });

    if (response.status === 200) {
      return { project: response.data.project };
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
      return { project: response.data.project };
    } else {
      return { error: response.data.error };
    }
  },

  search: async (query: SearchQuery, limit = 5) => {
    const response = await api.request({
      method: "GET",
      url: propertyUrl + "search",
      params: { query, limit },
    });

    if (response.status === 200) {
      return { projects: response.data.projects };
    } else {
      return { error: response.data.error };
    }
  },
};

type SearchQuery = {
  name?: string;
};
