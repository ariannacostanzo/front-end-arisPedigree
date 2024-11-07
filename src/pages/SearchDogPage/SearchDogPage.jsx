/* eslint-disable react-hooks/exhaustive-deps */
import Heading from "../../assets/components/heading/Heading";
import "./searchDogPage.scss";
import DogListComponent from "../../assets/components/dogsListComponents/dogsListComponent";
import { useBreed } from "../../providers/breedsProvider.jsx";
import { useDogs } from "../../providers/dogsProvider.jsx";
import { useEffect, useState } from "react";
import Loader from "../../assets/components/loader/Loader.jsx";
import axios from "axios";

//da aggiungere una select con il filtro per paese

const SearchDogPage = () => {
  const { breeds } = useBreed();
  const { maleCount, setMaleCount, femaleCount, setFemaleCount, dogs, loading, setLoading } = useDogs();
  const [filteredDogs, setFilteredDogs] = useState(dogs);
  const [filters, setFilters] = useState({
    sex: null,
    breed: null
  })

  const filterDogs = async (breed = null, sex = null) => {
    setLoading(true);
    let query = "http://localhost:8000/dogs";

    //se c'è un filtro aggiungo &
    if (breed || sex !== null) {
      query += "?";
    }

    //se c'è la razza l'aggiungo
    if (breed) {
      if (sex !== null) {
        query += "&";
      }
      query += `breed=${breed}`;
    }
    //se c'è la il sesso lo aggiungo
    if (sex !== null) {
      if (breed) {
        query += "&";
      }
      query += `sex=${sex}`;
    }

    try {
      const response = await axios.get(query);
      console.log(response)
      setFilteredDogs(response.data.data)
      setMaleCount(response.data.maleCount)
      setFemaleCount(response.data.femaleCount)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSexChange = (sexValue) => {
    setFilters((prev) => ({
      ...prev,
      sex: prev.sex === sexValue ? null : sexValue
    }))
  }

  const handleBreedChange = (breedValue) => {
    setFilters((prev) => ({
      ...prev,
      breed: breedValue === "none" ? null : breedValue
    }));
  }

   useEffect(() => {
     if (dogs) {
       setFilteredDogs(dogs);
     }
   }, [dogs]);

   useEffect(() => {
    filterDogs(filters.breed, filters.sex)
   },  [filters.breed, filters.sex])

  return (
    <>
      <Heading heading="Search for a dog"></Heading>
      <div className="bg-white search-for-a-dog-container">
        <div className="p-4 container mx-auto">
          {/* filtri  */}
          <h3>Filter & find</h3>
          <div className="flex gap-10 items-end">
            <div>
              <label htmlFor="breeds">Breed:</label>
              <div>
                <select
                  value={filters.breed || "none"}
                  name="breeds"
                  onChange={(e) => handleBreedChange(e.target.value)}
                >
                  <option value="none">Any</option>
                  {breeds.map((breed, i) => (
                    <option key={`search-dog-breed${i}`} value={breed.name}>
                      {breed.name} ({breed._count.dogs})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-10">
              <label htmlFor="sex">Sex:</label>
              <div className="flex gap-2">
                <>
                  <input
                    id="checkMale"
                    type="checkbox"
                    checked={filters.sex === true}
                    onChange={() => handleSexChange(true)}
                  />
                  <label htmlFor="checkMale">M ({maleCount})</label>
                </>

                <>
                  <input
                    id="checkFemale"
                    checked={filters.sex === false}
                    type="checkbox"
                    onChange={() => handleSexChange(false)}
                  />
                  <label htmlFor="checkFemale">F ({femaleCount})</label>
                </>
              </div>
            </div>
            <div>
              {(filters.breed || filters.sex !== null) && (
                <button
                  className="custom-btn"
                  onClick={() => {
                    setFilters({
                      sex: null,
                      breed: null,
                    });
                  }}
                >
                  Remove Filters
                </button>
              )}
            </div>
          </div>
          {/* dogs  */}
          <div className="py-10">
            {loading ? (
              <Loader></Loader>
            ) : (
              <DogListComponent dogs={filteredDogs}></DogListComponent>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchDogPage;
