export const useHttpRequest = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl;
  let token: string | null;
  if (process.client) {
    token = localStorage.getItem("token");
  }

  const setAuthorizationHeader = (params: any) => {
    if (!params.headers) {
      params.headers = new Headers();
    }
    params.headers.set("Authorization", token);
  };

  return {
    async fetch(url: RequestInfo, params?: any): Promise<any> {
      if (!params) {
        params = {};
      }
      setAuthorizationHeader(params);

      const promise = new Promise((resolve, reject) => {
        resolve($fetch(API_URL + url, params));
      });

      promise.catch((res) => {
        if (res.status == 401) {
          navigateTo({ path: "/" });
        } else {
          return res.data;
        }
      });

      return promise;
    },
    
    async fetch_v2(url: RequestInfo, params?: any): Promise<any> {
      if (!params) {
        params = {};
      }
      setAuthorizationHeader(params);

      const promise = new Promise((resolve, reject) => {
        resolve($fetch(API_URL + url, params));
      });

      promise.catch((res) => {
        if (res.data.status == 401) {
          navigateTo({ path: "/" });
        } else {
          console.log(res);
          return res;
        }
      });

      return promise;
    },
  };
};