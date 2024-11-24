/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading";
import axios from "../../utils/axiosClient.js";
import { useEffect, useState } from "react";
import "./dogDetailPage.scss";
import GeneralInfo from "./components/generalInfo.jsx";
import PedigreeTree from "./components/PedigreeTree.jsx";
import Offspring from "./components/Offspring.jsx";
import Siblings from "./components/Siblings.jsx";
// import Videos from "./components/Videos.jsx";

const DogDetailPage = () => {
  let { id } = useParams();
  id = parseInt(id);
  const [dog, setDog] = useState([]);
  const [showCard, setShowCard] = useState({
    shown: 0,
  });
  const [isLoading, setIsLoading] = useState(false)

  const fetchDog = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/dogs/${id}`);

      setDog(response.data);
    } catch (error) {
      console.error("Errore nel recupero dei dati del cane:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchDog();
  }, [id]);

  const displayCard = (index) => {
    setShowCard({
      shown: index,
    });
  };

  return (
    <>
      <Heading heading={dog.name}></Heading>
      <div className="dogPedigreeCardcontainer">
        <div className="dogPedigreeCardNav">
          <ul className="flex items-center  flex-wrap">
            <li
              className={`${showCard.shown === 0 ? "active" : ""}`}
              onClick={() => {
                displayCard(0);
              }}
            >
              General Informations
            </li>
            <li
              className={`${showCard.shown === 1 ? "active" : ""}`}
              onClick={() => {
                displayCard(1);
              }}
            >
              Pedigree Tree
            </li>
            <li
              className={`${showCard.shown === 2 ? "active" : ""}`}
              onClick={() => {
                displayCard(2);
              }}
            >
              Offspring
            </li>
            <li
              className={`${showCard.shown === 3 ? "active" : ""}`}
              onClick={() => {
                displayCard(3);
              }}
            >
              Siblings
            </li>
            {/* <li
              className={`${showCard.shown === 4 ? "active" : ""}`}
              onClick={() => {
                displayCard(4);
              }}
            >
              Videos
            </li> */}
          </ul>
        </div>
        <div className="dogPedigreeCard">
          {showCard.shown === 0 && (
            <GeneralInfo dog={dog} isLoading={isLoading}></GeneralInfo>
          )}
          {showCard.shown === 1 && <PedigreeTree dog={dog}></PedigreeTree>}
          {showCard.shown === 2 && <Offspring dog={dog}></Offspring>}
          {showCard.shown === 3 && <Siblings dog={dog}></Siblings>}
          {/* {showCard.shown === 4 && <Videos></Videos>} */}
        </div>
      </div>
    </>
  );
};
export default DogDetailPage;

