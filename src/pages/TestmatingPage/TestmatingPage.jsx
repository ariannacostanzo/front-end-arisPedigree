import { useState, useCallback } from "react";
import Heading from "../../assets/components/heading/Heading";
import { useBreed } from "../../providers/breedsProvider";
import FormLabel from "../AddDogPage/components/formLabel/FormLabel";
import axios from "../../utils/axiosClient.js";
import { debounce } from "lodash";
import placeholder from "../../assets/images/dog-silhouette.png"
import xImage from "../../assets/images/x.png"
import "./testmatingPage.scss";
import { useUtils } from "../../providers/utilsProvider.jsx";

import DogCard from "./components/dogCard/DogCard.jsx";


const Testmating = () => {

  const { reduceStr } = useUtils();

  // Lista delle razze
  const { breeds } = useBreed();

  const [breedId, setBreedId] = useState("");
  const [sire, setSire] = useState("")
  const [dam, setDam] = useState("")

  const [sires, setSires] = useState([]);
  const [dams, setDams] = useState([]);

  /**
   * Funzione che fetcha i cani maschi per razza
   */
  const fetchSires = useCallback(debounce(async (value) => {

    // Se value trimmato è infieriore a 3 caratteri blocco la funzione
    if (value.trim().length < 3) {
      setSires([]);
      return;
    }

    if (breedId) {
      const url = `http://localhost:8000/dogs/findSire?breedId=${breedId}&name=${value}`;
      try {
        const res = await axios.get(url);
        setSires(res.data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  }, 2000),
    [breedId]
  );

  /**
   * Funzione che fetcha i cani femmine per razza
   */
  const fetchDams = useCallback(debounce(async (value) => {

    // Se value trimmato è infieriore a 3 caratteri blocco la funzione
    if (value.trim().length < 3) {
      setSires([]);
      return;
    }

    if (breedId) {
      const url = `http://localhost:8000/dogs/findDam?breedId=${breedId}&name=${value}`;
      try {
        const res = await axios.get(url);
        setDams(res.data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  }, 2000),
    [breedId]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "breedId":
        setBreedId(value);
        if (!value) {
          setSire("")
          setDam("")
        }
        break;
      case "sire":
        setSire(value);
        fetchSires(value);
        break;
      case "dam":
        setDam(value);
        fetchDams(value);
        break;
      default:
        break;
    }

  }

  return (
    <>
      <Heading heading="Testmating"></Heading>
      <div className="bg-white">

        <div className="p-4 container mx-auto">

          <div className="testmating-row justify-between">

            <div className="testmating-col flex basis-9/12 lg:basis-6/12 md:mr-[200px]">
              {/* Breed Select */}
              <FormLabel forName="select-breed" label="Breed" isMandatory />
              <select
                name="breedId"
                id="select-breed"
                onChange={handleChange}
                value={breedId}
              >
                <option value="">Select Breed</option>
                {breeds.map((breed, i) => (
                  <option
                    key={`breed-option-${i}`}
                    value={breed.id}
                  >
                    {breed.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sire Input */}
            <div className="testmating-col flex basis-9/12 sm:basis-5/12 relative">
              <FormLabel forName="input-sire" label="Sire" isMandatory />
              <input
                type="text"
                name="sire"
                id="input-sire"
                onChange={handleChange}
                value={typeof sire === "string" ? sire : sire.name}
                disabled={!breedId}
                placeholder="Search sire..."
              />

              {/* Risultati della ricerca */}
              {sires.length > 0 && (
                <div className="dogResults">
                  {sires.map((sire, i) => (
                    <div
                      className="dogResult"
                      key={`research-sire${i}`}
                      onClick={() => {
                        setSire(sire)
                        setSires([])
                      }}
                    >
                      <img
                        src={sire.image ? sire.image : placeholder}
                        alt=""
                      />
                      <div>
                        <h3>{sire.name}</h3>
                        <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                          {sire.titles ? sire.titles : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dam Input */}
            <div className="testmating-col relative flex basis-9/12 sm:basis-5/12">
              <FormLabel forName="input-dam" label="Dam" isMandatory />
              <input
                type="text"
                name="dam"
                id="input-dam"
                onChange={handleChange}
                value={typeof dam === "string" ? dam : dam.name}
                disabled={!breedId}
                placeholder="Search dam..."
              />

              {/* Risultati della ricerca  */}
              {dams.length > 0 && (
                <div className="dogResults">
                  {dams.map((dam, i) => (
                    <div
                      className="dogResult"
                      key={`research-dam${i}`}
                      onClick={() => {
                        setDam(dam)
                        setDams([])
                      }}
                    >
                      <img
                        src={dam.image ? dam.image : placeholder}
                        alt=""
                      />
                      <div>
                        <h3>{reduceStr(dam.name, 12)}</h3>
                        <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                          {dam.titles ? reduceStr(dam.titles, 13) : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sire Card */}
            <div className="testmating-col basis-1/3">
              <DogCard dog={sire} />
            </div>

            {/* Immagine centrale */}
            <div className="testmating-col basis-1/4 md:basis-1/3">
              <figure>
                <img src={xImage} alt="" />
              </figure>
            </div>

            {/* Dog Card */}
            <div className="testmating-col basis-1/3">
              <DogCard dog={dam} />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
export default Testmating;