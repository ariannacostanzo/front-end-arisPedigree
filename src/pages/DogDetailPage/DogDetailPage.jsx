/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading";
import axios from "../../utils/axiosClient.js";
import { useEffect, useState } from "react";
import "./dogDetailPage.scss";
import GeneralInfo from "./components/generalInfo.jsx";

const DogDetailPage = () => {

  let { id } = useParams();
  id = parseInt(id);
  const [dog, setDog] = useState([]);
  const fetchDog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dogs/${id}`);
        console.log(response.data);
        
        setDog(response.data);
      } catch (error) {
        console.error("Errore nel recupero dei dati del cane:", error);
      } 
  };

  

  useEffect(() => {
      fetchDog();
  }, [id]);


  return (
    <>
      <Heading heading={dog.name}></Heading>
      <div className="dogPedigreeCardcontainer">
        <div className="dogPedigreeCardNav">
          <ul className="flex items-center gap-7 flex-wrap">
            <li className="active">General Informations</li>
            <li>Pedigree Tree</li>
            <li>Offspring</li>
            <li>Siblings</li>
            <li>Videos</li>
          </ul>
        </div>
        <GeneralInfo dog={dog}></GeneralInfo>
      </div>
    </>
  );
};
export default DogDetailPage;
