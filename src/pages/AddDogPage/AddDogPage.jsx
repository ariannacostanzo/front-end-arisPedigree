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

// per sireId e damId devo fare una chiamata al database di tutti i cani e cercare un cane che 
// abbia quel nome altrimenti bisogna lasciare il campo vuoto

const AddDogPage = () => {
  // variabili per riempire il form
  const { breeds, loading } = useBreed();
  const { countries } = useCountry();
  const { isLoggedIn, userId, token } = useAuth();
  

  // eslint-disable-next-line no-unused-vars
  const [updatedUserId, setUpdatedUserId] = useState(userId);

  const [sires, setSires] = useState([]);
  const [dams, setDams] = useState([]);

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
    sizeUnit: "",
    weight: "",
    weightUnit: "",
    dateOfBirth: "",
    dateOfDeath: "",
    color: "",
    countryId: "",
    breeder: "",
    kennel: "",
    owner: "",
    notes: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const searchforFather = async(e) => {

    
    
    const { value } = e.target;
    handleChange(e);

    if (formData.breedId) {
      const url = `http://localhost:8000/dogs/findSire?breedId=${formData.breedId}&name=${value}`;
      try {
        const res = await axios.get(url);
        setSires(res.data); 
        console.log(res.data); 
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(e.target.value);

    
  } 

  const searchForMother = async(e) => {

    console.log(e.target.value);
    handleChange(e);
  }

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
    const {
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

    console.log(formData);
    const dataToSend = {
      breedId: breedId ? parseInt(breedId) : null,
      name,
      slug: slugify(name),
      titles,
      sireId: sireId ? parseInt(sireId) : null,
      damId: damId ? parseInt(damId) : null,
      sex: sex === "true" ? true : false,
      size: size + " " + sizeUnit,
      weight: weight + " " + weightUnit,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
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

    try {
      const response = await axios.post("/dogs", dataToSend, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setErrorBags({});
      navigate("/dogDetail");
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
                  <div className="form-col">
                    {/* sire  */}

                    <FormLabel forName="add-sire" label="Sire" />
                    {!formData.breedId && (
                      <p className="tip">Insert a breed to choose a Sire</p>
                    )}
                    <input
                      type="text"
                      name="sire"
                      id="add-sire"
                      onChange={searchforFather}
                      value={formData.sire}
                      disabled={!formData.breedId}
                    />
                  </div>
                  {/* dam  */}
                  <div className="form-col">
                    <FormLabel forName="add-dam" label="Dam" />
                    {!formData.breedId && (
                      <p className="tip">Insert a breed to choose a Dam</p>
                    )}
                    <input
                      type="text"
                      name="dam"
                      id="add-dam"
                      onChange={searchForMother}
                      value={formData.dam}
                      disabled={!formData.breedId}
                    />
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
                      // onChange={(e) => handleChange(e)}
                      // value={formData.image}
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
