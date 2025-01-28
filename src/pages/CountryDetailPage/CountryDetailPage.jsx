/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Heading from "../../assets/components/heading/Heading";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosClient.js";
import Loader from "../../assets/components/loader/Loader.jsx";
import DogsFilteredBy from "../../assets/components/dogsFilteredBy/DogsFilteredBy.jsx";

const CountryDetailPage = () => {
  let { countrySlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState(null);

  const fetchCountry = async () => {
    const url = `/countries/${countrySlug}`;

    try {
      setIsLoading(true);
      const res = await axios.get(url);
      //console.log(res);
      setCountry(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && country && (
        <>
          <Heading heading={country.name}></Heading>
          <div className="bg-white">
            <DogsFilteredBy filter={country}></DogsFilteredBy>
          </div>
        </>
      )}
    </>
  );
};
export default CountryDetailPage;
