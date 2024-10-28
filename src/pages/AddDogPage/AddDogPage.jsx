/* eslint-disable react-hooks/exhaustive-deps */
import Heading from "../../assets/components/heading/Heading";
import { useAuth } from "../../providers/authProvider";
import "./addDogPage.scss";
import FormLabel from "./components/formLabel/FormLabel";
import { useBreed } from "../../providers/breedsProvider.jsx";
import { useCountry } from "../../providers/countriesProvider.jsx";
import Loader from "../../assets/components/loader/Loader.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosClient.js";
import { useNavigate } from "react-router-dom";
import placeholder from "../../../public/placehodler.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


//fixare upload imagini

const AddDogPage = () => {
  // variabili per riempire il form
  const { breeds, loading } = useBreed();
  const { countries } = useCountry();
  const { isLoggedIn, userId, token } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const [updatedUserId, setUpdatedUserId] = useState(userId);

  const [sires, setSires] = useState([]);
  const [dams, setDams] = useState([]);

  const [isTypingSire, setIsTypingSire] = useState(false);
  const [isTypingDam, setIsTypingDam] = useState(false);

  const [isSireSelected, setIsSireSelected] = useState(false);
  const [isDamSelected, setIsDamSelected] = useState(false);

  //devo fare tanti div quanti i risultati delle chiamate search per mostrare i cani e poi
  //selezionare e salvare l'id di sire e dam in formData ed inviarlo
  //fare l'upload immagini

  const [errorBags, setErrorBags] = useState({
    name: "",
    breed: "",
    country: "",
  });
  const navigate = useNavigate();

  //dati da inviare al backend

  const [formData, setFormData] = useState({
    breedId: "",
    name: "",
    titles: "",
    sireId: "",
    sire: "",
    dam: "",
    damId: "",
    sex: "true",
    size: "",
    sizeUnit: "cm",
    weight: "",
    weightUnit: "kg",
    dateOfBirth: "",
    dateOfDeath: "",
    color: "",
    countryId: "",
    breeder: "",
    kennel: "",
    owner: "",
    notes: "",
    image: null,
  });

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData, [name]:files[0]
      }))
    }

    if (name === "sire") {
      setIsSireSelected(false);
    } else if (name === "dam") {
      setIsDamSelected(false);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const choseSireId = (id, name) => {
    setFormData({
      ...formData,
      sireId: id,
      sire: name,
    });
    setSires([]);
    console.log(id, name);

    setIsTypingSire(true);
    setIsSireSelected(true);
  };

  const choseDamId = (id, name) => {
    setFormData({
      ...formData,
      damId: id,
      dam: name,
    });
    setDams([]);
    setIsTypingDam(true);
    setIsDamSelected(true);
  };

 

  const searchforFather = async () => {
    setSires([]);
    setIsTypingSire(true);
    const { sire } = formData;

    if (formData.breedId) {
      const url = `http://localhost:8000/dogs/findSire?breedId=${formData.breedId}&name=${sire}`;
      try {
        const res = await axios.get(url);
        setSires(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsTypingSire(false);
      }
    }
  };

  const searchForMother = async () => {
    setDams([]);
    setIsTypingDam(true);
    const { dam } = formData;

    if (formData.breedId) {
      const url = `http://localhost:8000/dogs/findDam?breedId=${formData.breedId}&name=${dam}`;
      try {
        const res = await axios.get(url);
        setDams(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsTypingDam(false);
      }
    }
  };

  //per ritardare la chiamata dopo che si scrive
  useEffect(() => {
    if (!isSireSelected && formData.sire) {
      setIsTypingSire(true);
      const getData = setTimeout(() => {
        searchforFather();
      }, 2000);

      return () => clearTimeout(getData);
    }
  }, [formData.sire, isSireSelected]);

  useEffect(() => {
    if (!isDamSelected && formData.dam) {
      setIsTypingDam(true);
      const getData = setTimeout(() => {
        searchForMother();
      }, 2000);
      return () => clearTimeout(getData);
    }
  }, [formData.dam, isDamSelected]);

  const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  useEffect(() => {
    setUpdatedUserId(userId);
  }, [userId]);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorBags({
      name: "",
      breed: "",
      country: "",
    });

    let {
      breedId,
      name,
      titles,
      sireId,
      damId,
      sex,
      size,
      sizeUnit,
      weight,
      weightUnit,
      dateOfBirth,
      dateOfDeath,
      color,
      countryId,
      breeder,
      kennel,
      owner,
      notes,
      image,
    } = formData;

    const dataToSend = {
      breedId: breedId ? parseInt(breedId) : null,
      name,
      slug: slugify(name),
      titles,
      sireId: sireId ? parseInt(sireId) : null,
      damId: damId ? parseInt(damId) : null,
      sex: sex === "true" ? true : false,
      size:
        size
          ? size + (sizeUnit ? ` ${sizeUnit}` : "")
          : null,
      weight:
        weight
          ? weight + (weightUnit ? ` ${weightUnit}` : "")
          : null,
      dateOfBirth: dateOfBirth,
      dateOfDeath: dateOfDeath,
      color,
      countryId: countryId ? parseInt(countryId) : null,
      breeder,
      kennel,
      owner,
      notes,
      userId,
      image,
    };

    console.log(dataToSend);

    //appendo i dati modificati nel formData
    const formDataToSend = new FormData();

    formDataToSend.append("breedId", dataToSend.breedId);
    formDataToSend.append("name", dataToSend.name);
    formDataToSend.append("slug", dataToSend.slug);
    formDataToSend.append("titles", dataToSend.titles);
    formDataToSend.append("sireId", dataToSend.sireId);
    formDataToSend.append("damId", dataToSend.damId);
    formDataToSend.append("sex", dataToSend.sex);
    formDataToSend.append("size", dataToSend.size);
    formDataToSend.append("weight", dataToSend.weight);
    formDataToSend.append("dateOfBirth", dataToSend.dateOfBirth);
    formDataToSend.append("dateOfDeath", dataToSend.dateOfDeath);
    formDataToSend.append("color", dataToSend.color);
    formDataToSend.append("countryId", dataToSend.countryId);
    formDataToSend.append("breeder", dataToSend.breeder);
    formDataToSend.append("kennel", dataToSend.kennel);
    formDataToSend.append("owner", dataToSend.owner);
    formDataToSend.append("notes", dataToSend.notes);
    formDataToSend.append("userId", dataToSend.userId);

    

    
    if (image) {
      formDataToSend.append("image", dataToSend.image); 
    }

    formDataToSend.forEach((value, key) => {
      console.log(`${key}: ${value}, Type: ${typeof value}`);

      
      if (value instanceof File) {
        console.log(`File Name: ${value.name}, File Type: ${value.type}`);
      }
    });

    try {
      const response = await axios.post("/dogs", formDataToSend, {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setErrorBags({});
      navigate(`/dogDetail/${response.data.id}`);
    } catch (error) {
      const errors = error.response.data.errors || [];
      console.log(error.response.data.errors);
      validation(errors);
    }

    //creare il cane, chiamata
  };

  const validation = (errors) => {
    setErrorBags((prevErrorBags) => {
      let newErrorBags = { ...prevErrorBags };

      errors.forEach((error) => {
        if (error.path === "name") {
          console.log(error.msg);
          // Aggiorna il campo 'name' con il messaggio di errore e così via
          newErrorBags.name = error.msg;
        } else if (error.path === "breedId") {
          newErrorBags.breed = error.msg;
        } else if (error.path === "countryId") {
          newErrorBags.country = error.msg;
        }
      });

      return newErrorBags;
    });
  };

  return (
    <>
      <div className="addDogPage">
        <Heading heading="Add new dog"></Heading>
        <div className=" bg-white text-black py-10">
          <div className="p-4 container mx-auto">
            {/* se non è loggato  */}
            {!isLoggedIn && (
              <div className="flex items-center justify-center">
                <div>
                  You have to register or login to add a dog
                  <div>
                    <button>
                      <Link to="/register">Register</Link>
                    </button>
                    <button>
                      <Link to="/login">Login</Link>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* se sta caricando  */}
            {loading && <Loader></Loader>}

            {/* se è loggato e ho caricato i dati */}
            {isLoggedIn && !loading && (
              // form
              <form
                encType="multipart/form-data"
                className="add-dog-form-container"
                onSubmit={(e) => submitForm(e)}
              >
                <div className="form-row">
                  {/* breed  */}
                  <div className="form-col">
                    <FormLabel forName="add-breed" label="Breed" />
                    <select
                      name="breedId"
                      id="add-breed"
                      onChange={handleChange}
                      value={formData.breedId}
                    >
                      <option value="-1">Select Breed</option>
                      {breeds.map((breed, i) => (
                        <option key={`form-select-breed${i}`} value={breed.id}>
                          {breed.name}
                        </option>
                      ))}
                    </select>
                    {errorBags.breed && (
                      <p className="error-text">{errorBags.breed}</p>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  {/* name  */}
                  <div className="form-col">
                    <FormLabel forName="add-name" label="Name" />
                    {errorBags.name && (
                      <p className="error-text">{errorBags.name}</p>
                    )}
                    <input
                      type="text"
                      name="name"
                      id="add-name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                  {/* titles  */}
                  <div className="form-col">
                    <FormLabel forName="add-titles" label="Titles" />
                    <input
                      type="text"
                      name="titles"
                      id="add-titles"
                      onChange={handleChange}
                      value={formData.titles}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col relative">
                    {/* sire  */}

                    <div className="flex items-baseline gap-3">
                      <FormLabel forName="add-sire" label="Sire" />
                      {isTypingSire && formData.sire && !isSireSelected && (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                        ></FontAwesomeIcon>
                      )}
                    </div>
                    {/* quello che appare dopo aver fatto la ricerca */}
                    {!isTypingSire && formData.sire && sires.length === 0 && (
                      <p className="tip">
                        There is no male dog called &#34;
                        <span>{formData.sire}</span>
                        &#34; in our database
                      </p>
                    )}

                    {!formData.breedId && (
                      <p className="tip">Insert a breed to choose a Sire</p>
                    )}
                    <input
                      type="text"
                      name="sire"
                      id="add-sire"
                      onChange={handleChange}
                      value={formData.sire}
                      disabled={!formData.breedId}
                    />
                    {/* i risultati della ricerca  */}
                    {sires.length > 0 && (
                      <div className="dogResults">
                        {sires.map((sire, i) => (
                          <div
                            className="dogResult"
                            key={`research-sire${i}`}
                            onClick={() => choseSireId(sire.id, sire.name)}
                          >
                            <img
                              src={sire.image ? sire.image : placeholder}
                              alt=""
                            />
                            <div>
                              <h3>{sire.name}</h3>
                              <p>{sire.titles ? sire.titles : ""}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* dam  */}
                  <div className="form-col relative">
                    <div className="flex items-baseline gap-3">
                      <FormLabel forName="add-dam" label="Dam" />
                      {isTypingDam && formData.dam && !isDamSelected && (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                        ></FontAwesomeIcon>
                      )}
                    </div>
                    {!isTypingDam && formData.dam && dams.length === 0 && (
                      <p className="tip">
                        There is no female dog called &#34;
                        <span>{formData.dam}</span>
                        &#34; in our database
                      </p>
                    )}
                    {!formData.breedId && (
                      <p className="tip">Insert a breed to choose a Dam</p>
                    )}
                    <input
                      type="text"
                      name="dam"
                      id="add-dam"
                      onChange={handleChange}
                      value={formData.dam}
                      disabled={!formData.breedId}
                    />
                    {/* i risultati della ricerca  */}
                    {dams.length > 0 && (
                      <div className="dogResults">
                        {dams.map((dam, i) => (
                          <div
                            className="dogResult"
                            key={`research-dam${i}`}
                            onClick={() => choseDamId(dam.id, dam.name)}
                          >
                            <img
                              src={dam.image ? dam.image : placeholder}
                              alt=""
                            />
                            <div>
                              <h3>{dam.name}</h3>
                              <p>{dam.titles ? dam.titles : ""}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  {/* sex  */}
                  <div className="form-col">
                    <FormLabel forName="add-sex" label="Sex" />
                    <select
                      name="sex"
                      id="add-sex"
                      value={formData.sex}
                      onChange={handleChange}
                    >
                      <option value="true" defaultValue>
                        Male
                      </option>
                      <option value="false">Female</option>
                    </select>
                  </div>
                  {/* size  */}
                  <div className="form-col">
                    <FormLabel forName="add-size" label="Size" />
                    <input
                      type="text"
                      name="size"
                      id="add-size"
                      onChange={handleChange}
                      value={formData.size}
                    />
                  </div>
                  <div className="form-col no-grow">
                    <select
                      name="sizeUnit"
                      id="size-unit"
                      className="smaller-select"
                      onChange={handleChange}
                      value={formData.sizeUnit}
                    >
                      <option value="cm" defaultValue>
                        cm
                      </option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                  {/* weight  */}
                  <div className="form-col">
                    <FormLabel forName="add-weight" label="Weight" />
                    <input
                      type="text"
                      name="weight"
                      id="add-weight"
                      onChange={handleChange}
                      value={formData.weight}
                    />
                  </div>
                  <div className="form-col no-grow">
                    <select
                      name="weightUnit"
                      id="weight-unit"
                      className="smaller-select"
                      onChange={handleChange}
                      value={formData.weightUnit}
                    >
                      <option value="kg" defaultValue>
                        kg
                      </option>
                      <option value="pound">pound</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  {/* date of birth  */}
                  <div className="form-col">
                    <FormLabel
                      forName="add-date-of-birth"
                      label="Date of birth"
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="add-date-of-birth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                    />
                  </div>
                  {/* date of death  */}
                  <div className="form-col">
                    <FormLabel
                      forName="add-date-of-death"
                      label="Date of death"
                    />
                    <input
                      type="date"
                      name="dateOfDeath"
                      id="add-date-of-death"
                      onChange={handleChange}
                      value={formData.dateOfDeath}
                    />
                  </div>
                  {/* color  */}
                  <div className="form-col">
                    <FormLabel forName="add-color" label="Color" />
                    <input
                      type="text"
                      name="color"
                      id="add-color"
                      onChange={handleChange}
                      value={formData.color}
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* land of standing  */}
                  <div className="form-col">
                    <FormLabel
                      forName="add-land-of-standing"
                      label="Land of standing"
                    />
                    <select
                      name="countryId"
                      id="add-land-of-standing"
                      onChange={handleChange}
                      value={formData.countryId}
                    >
                      <option value="-1">-</option>
                      {countries.map((country, i) => (
                        <option
                          key={`form-countries-death${i}`}
                          value={country.id}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errorBags.country && (
                      <p className="error-text">{errorBags.country}</p>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  {/* breeder  */}
                  <div className="form-col">
                    <FormLabel forName="add-breeder" label="Breeder" />
                    <input
                      type="text"
                      name="breeder"
                      id="add-breeder"
                      onChange={handleChange}
                      value={formData.breeder}
                    />
                  </div>
                  {/* kennel  */}
                  <div className="form-col">
                    <FormLabel forName="add-kennel" label="Kennel" />
                    <input
                      type="text"
                      name="kennel"
                      id="add-kennel"
                      onChange={handleChange}
                      value={formData.kennel}
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* owner  */}
                  <div className="form-col">
                    <FormLabel forName="add-owner" label="Owner" />
                    <input
                      type="text"
                      name="owner"
                      id="add-owner"
                      onChange={handleChange}
                      value={formData.owner}
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* notes  */}
                  <div className="form-col">
                    <FormLabel forName="add-notes" label="Notes" />
                    <textarea
                      onChange={handleChange}
                      value={formData.notes}
                      type="text"
                      name="notes"
                      id="add-notes"
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                    <FormLabel forName="add-image" label="Dog cover photo" />
                    <input
                      type="file"
                      name="image"
                      id="add-image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <button type="submit">Add dog</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AddDogPage;
