/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useStorage from "../hooks/useStorage.jsx";
import axios from '../utils/axiosClient.js'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useStorage(false, "isLoggedIn");
  const [userName, setUserName] = useStorage('userName', 'userName')

  const login = async (payload) => {
    try {
      const { data: response } = await axios.post("/auth/login", payload);
      setUserName(response.data.name);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error)
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        userName
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
