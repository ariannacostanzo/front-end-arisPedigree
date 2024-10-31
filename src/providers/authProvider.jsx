import { createContext, useContext, useEffect} from "react";
import useStorage from "../hooks/useStorage.jsx";
import axios from '../utils/axiosClient.js';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useStorage(false, "isLoggedIn");
  const [userName, setUserName] = useStorage('userName', 'userName')
  const [userId, setUserId] = useStorage(null, 'userId')
  const [token, setToken] = useStorage(null, "token");

  const login = async (payload) => {
    try {
      const { data: response } = await axios.post("/auth/login", payload);
      console.log(response)
      setUserName(response.data.name);
      setUserId(response.data.id)
      setToken(response.token)
      console.log(response.data.id);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error)
    }
  };
  const logout = () => {
    setUserId(null)
    setUserName(null)
    setToken(null)
    setIsLoggedIn(false);
    localStorage.clear()
  };

  useEffect(() => {
  }, [userId])
   

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        userName,
        setUserName,
        userId,
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("Non sei dentro all'auth Provider");
  }
  return value;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
