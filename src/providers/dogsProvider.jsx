/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DogsContext = createContext();

const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allDogs, setAllDogs] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [filterQuery, setFilterQuery] = useState(null);

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/dogs");
      setDogs(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setMaleCount(response.data.maleCount);
      setFemaleCount(response.data.femaleCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/dogs/allDogs");
      setAllDogs(response.data.dogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; //questa dovrei poterla eliminare

  
  useEffect(() => {
    console.log(filterQuery)
  })

  useEffect(() => {
    fetchDogs();
    fetchAllDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        dogs,
        setDogs,
        loading,
        page,
        setLoading,
        setPage,
        totalPages,
        setTotalPages,
        fetchDogs,
        maleCount,
        setMaleCount,
        femaleCount,
        setFemaleCount,
        filterQuery,
        setFilterQuery
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
