/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const CountryContext = createContext();

const CountryProvider = ({ children }) => {

const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(true);

    
const fetchCountries = async () => {
    setLoading(true);
    try {
        const response = await axios.get("http://localhost:8000/countries");
        setCountries(response.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchCountries();
}, [])

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

const useCountry = () => {
  const value = useContext(CountryContext);
  return value;
};

export { CountryProvider, useCountry };
