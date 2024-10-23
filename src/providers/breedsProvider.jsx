/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BreedContext = createContext();

const BreedProvider = ({ children }) => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/breeds");
      setBreeds(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <BreedContext.Provider
      value={{
        breeds,
        loading,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};

const useBreed = () => {
  const value = useContext(BreedContext);
  return value;
};

export { BreedProvider, useBreed };
