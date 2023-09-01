import axiosConfig from "../API/axiosConfig";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosConfig.post(
      "/auth/refreshtoken",
      {},
      {
        withCredentials: true,
      }
    );

    console.log("Token refresh successful: " + response);

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response);
      console.log(response.data.token);
      return { ...prev, accessToken: response.data };
    });

    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
