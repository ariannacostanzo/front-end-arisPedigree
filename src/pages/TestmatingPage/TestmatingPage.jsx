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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const Testmating = () => {

  const navigate = useNavigate();

  const { reduceStr } = useUtils();

  // Lista delle razze
  const { breeds } = useBreed();

  const [breedId, setBreedId] = useState("");
  const [sire, setSire] = useState("")
  const [dam, setDam] = useState("")

  const [sires, setSires] = useState([]);
  const [dams, setDams] = useState([]);

  const [isTypingSire, setIsTypingSire] = useState(false);
  const [isTypingDam, setIsTypingDam] = useState(false);

  const [noSires, setNoSires] = useState(false);
  const [noDams, setNoDams] = useState(false);

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
        if (error.response?.data?.message === "No dogs found for this breed") {
          setNoSires(true);
        }
        console.log(error.response.data.message)
        console.error(error);
      } finally {
        setIsTypingSire(false);
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

        if (error.response?.data?.message === "No dogs found for this breed") {
          setNoDams(true)
        }

        console.error(error);
      } finally {
        setIsTypingDam(false);
      }
    }
  }, 2000),
    [breedId]
  );


  /**
   * Funzione che gestisce la select e gli input
   * @param {Event} e Evento scatenato dagli input
   */
  const handleChange = (e) => {

    const { name, value } = e.target;

    switch (name) {

      case "breedId":
        setBreedId(value);
        setSire("")
        setDam("")
        break;

      case "sire":
        setSires([]);
        setNoSires(false);
        if (value.trim().length >= 3) {
          setIsTypingSire(true)
        }
        setSire(value);
        fetchSires(value);
        break;

      case "dam":
        setDams([]);
        setNoDams(false);
        if (value.trim().length >= 3) {
          setIsTypingDam(true)
        }
        setDam(value);
        fetchDams(value);
        break;

      default:
        break;
    }

  }

  /**
   * Funzione che fa un redirect alla pagina AddDogPage inviando breedId, dam e sire nello state
   * da recuperare con useLocation
   */
  const generateTestmating = () => {
    if (!(typeof sire === "object" && typeof dam === "object")) return;

    navigate("/add-new-dog", { state: { breedId, dam, sire } })
  }

  return (
    <>
      <Heading heading="Testmating"></Heading>
      <div className="bg-white">

        <div className="px-3 py-14 container mx-auto">

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
              <FormLabel forName="input-sire" label="Sire" isMandatory>

                {/* Spinner caricamento */}
                {isTypingSire && typeof sire === "string" && sire && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                  />
                )}

                {/* quello che appare dopo aver fatto la ricerca */}
                {noSires && (
                  <p className="tip">
                    There is no male dog called &#34;
                    <span>{sire}</span>
                    &#34; in our database
                  </p>
                )}
              </FormLabel>

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
              <FormLabel forName="input-dam" label="Dam" isMandatory >

                {/* Spinner caricamento */}
                {isTypingDam && typeof dam === "string" && dam && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                  />
                )}

                {/* quello che appare dopo aver fatto la ricerca */}
                {noDams && (
                  <p className="tip">
                    There is no female dog called &#34;
                    <span>{dam}</span>
                    &#34; in our database
                  </p>
                )}
              </FormLabel>
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

            {/* Immagine centrale e Bottone Conferma */}
            <div className="testmating-col flex justify-between items-center basis-1/4 md:basis-1/3">
              <figure>
                <img src={xImage} alt="" />
              </figure>

              <button
                className={`testmating-btn ${typeof sire === "object" && typeof dam === "object" ? "" : "disabled"}`}
                onClick={generateTestmating}
              >
                Generate
                <FontAwesomeIcon
                  icon={faCheck}
                />
              </button>
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