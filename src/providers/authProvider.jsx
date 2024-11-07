import { createContext, useContext, useEffect} from "react";
import useStorage from "../hooks/useStorage.jsx";
import axios from '../utils/axiosClient.js';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useStorage(false, "isLoggedIn");
  const [token, setToken] = useStorage(null, "token");
  const [user, setUser] = useStorage(null, "user");

  const login = async (payload) => {
    try {
      const { data: response } = await axios.post("/auth/login", payload);
      setUser(response.data)
      setToken(response.token)
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error)
    } 
  };
  const logout = () => {
    setUser(null)
    setToken(null)
    setIsLoggedIn(false);
    localStorage.clear()
  };

  useEffect(() => {
    // console.log(user)
  }, [user])
   

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        user,
        setUser,
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
