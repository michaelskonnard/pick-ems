import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    await axios
      .get('/auth/refresh', {
        withCredentials: true,
      })
      .then((response) => {
        setAuth((prev) => {
          // console.log('Previous', JSON.stringify(prev));
          // console.log('Token:',  response.data.token)
          return { ...prev, accessToken: response.data.token };
        });
        return response.data.token;
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };
  return refresh;
};

export default useRefreshToken;
