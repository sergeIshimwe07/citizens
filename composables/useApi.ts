import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;
   return axios.create({
    baseURL,
    headers: {
      Authorization: ``,
    },
  });
}


