import { api } from "./config/axiosConfigs";

const vendorUrl = "/user/";

export const UserService = {
  get: async (id: string) => {
    const response = await api.request({
      method: "GET",
      url: vendorUrl + id,
    });

    if (response.status === 200) {
      return { user: response.data.user };
    }
    return { error: response.data.error };
  },
};
