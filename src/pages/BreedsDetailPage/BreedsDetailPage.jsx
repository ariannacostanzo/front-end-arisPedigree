/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Heading from "../../assets/components/heading/Heading";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosClient.js";
import Loader from "../../assets/components/loader/Loader.jsx";
import "./breedsDetailPage.scss";
import DogsFilteredBy from "../../assets/components/dogsFilteredBy/DogsFilteredBy.jsx";

const BreedsDetailPage = () => {
  let { breedSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [breed, setBreed] = useState(null);

  const fetchBreed = async () => {
    const url = `/breeds/${breedSlug}`;

    try {
      setIsLoading(true);
      const res = await axios.get(url);
      //console.log(res)
      setBreed(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBreed();
  }, []);

  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && breed && (
        <>
          <Heading heading={breed.name}></Heading>
          <div className="bg-white">
            <DogsFilteredBy filter={breed}></DogsFilteredBy>
          </div>
        </>
      )}
    </>
  );
};
export default BreedsDetailPage;
