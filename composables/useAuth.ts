// import { useToast } from "primevue/usetoast";
import { useHttpRequest } from "./useHttpRequest";

export const useAuth = () => {
  // const toast = useToast()
  const http = useHttpRequest();
  const current_location = useCookie("current_location");
  const loading = ref(false);
  return {
    headers: () => ({ Authorization: `token` }),
    loading,
    login(email: any, password: any, isDistrict: any): void {
      loading.value = true;

      http
        .fetch("login", {
          method: "post",
          // headers: {
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Credentials": "true",
          // },
          body: { email, password, isDistrict },
        })
        .then((data: any) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("logger", JSON.stringify(data));
          navigateTo("/dashboard");
          console.log("login succeed");
        })
        .catch((data) => {
          useToast().error(data.data.message);
        })
        .finally(() => (loading.value = false));
    },

    testlogin(email: any, password: any, remember: any): void {
      const data = http
        .fetch("login", {
          method: "POST",
          //   mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
        .then((data) => {
          console.log("====================================");
          console.log(data);
          console.log("====================================");
          if (data.status == 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("logger", JSON.stringify(data.data));
            console.log("====================================");
            console.log("AHAHHHH");
            console.log("====================================");
            // navigateTo(current_location.value??"/dashboard")
            if (remember) {
              localStorage.setItem("userType", "1");
              window.location.href = "/students/" + data.data.ID;
            } else {
              window.location.href = "/dashboard";
              localStorage.setItem("userType", "0");
            }
            console.log("login succeed");
          }
        })
        .catch((data) => {
          console.log(data);
        })
        .finally(() => (loading.value = false));
    },
    checkLoginStatus: () =>
      http
        .fetch("verifyToken")
        .then((data: any) => {
          if (data.status == 200) {
            navigateTo(current_location.value ?? "/dashboard");
            console.log("login succeed");
          }
        })
        .catch(() => {
          navigateTo({ path: "/" });
        }),
  };
};
