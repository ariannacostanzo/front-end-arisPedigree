/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DogsContext = createContext();

const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/dogs");
      setDogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        dogs,
        loading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

const useDogs = () => {
  const value = useContext(DogsContext);
  return value;
};

export { DogsProvider, useDogs };
