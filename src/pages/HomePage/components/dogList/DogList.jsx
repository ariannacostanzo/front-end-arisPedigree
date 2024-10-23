import "./doglist.scss";
import { useDogs } from "../../../../providers/dogsProvider.jsx";
import alphabet from "../../../../database/alphabeth.js";
import { Link } from "react-router-dom";
import Loader from "../../../../assets/components/loader/Loader.jsx";
// import axios from "axios";
// import { useEffect, useState } from "react";

const DogList = () => {
  const { dogs, loading } = useDogs();
  // const { dogs, setDogs, setPage, setTotalPages } = useDogs();
  // const { dogs, page, totalPages } = useDogs();

  // const [bulletNumbers, setBulletNumbers] = useState([]);
  // const [maxPages, setMaxPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(page)

  // const createBullets = () => {
  //   setMaxPages(totalPages > 5 ? 5 : totalPages);
  //   setBulletNumbers([]);

  //   //se due pagine indietro non esistono torno 1
  //   const startPage = Math.max(setCurrentPage(currentPage- 2, 1));
  //   //se due pagine avanti non esistono torno il totale pagine
  //   const endPage = Math.min(
  //     setCurrentPage(currentPage + 2,
  //     totalPages)
  //   );

  //   for (let i = startPage; i <= endPage; i++) {
  //     bulletNumbers.push(i);
  //   }
  // }

  // useEffect(() => {
  //   createBullets()
  // }, [])

  // const fetchDogs = async () => {
  //   console.log('funziona')
  //   try {
  //     const response = await axios.get("http://localhost:8000/dogs?page=2");
  //     setDogs(response.data.data);
  //     setPage(response.data.page);
  //     setTotalPages(response.data.totalPages);
  //     //   console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="dogsListContainer">
          <h3>Breeds & dogs</h3>
          <h5>In our database</h5>
          <div className="alp-container">
            {alphabet.map((letter, i) => (
              <div key={`alphabet-letter${i}`} className="letter-container">
                {letter.letter}
              </div>
            ))}
          </div>
          <div id="dogsList">
            {dogs.length > 0 &&
              dogs.map((dog, i) => (
                <div
                  key={`dogListHomepage${i}`}
                  className={`basis-full md:basis-1/2 lg:basis-1/3  dog-container ${
                    i % 2 === 0 ? "" : "grid-even"
                  }`}
                >
                  <Link to="/dogDetail" className="dogName">
                    {dog.name}
                  </Link>
                  {dog.breed.name && (
                    <p className="dogBreed">
                      Breed: <span>{dog.breed.name}</span>
                    </p>
                  )}

                  <p className="dogCountry">
                    {dog.country.name && dog.country.name}
                  </p>
                </div>
              ))}

            {dogs.length === 0 && <div>No dogs found</div>}
          </div>
          <div className="bullet-container">
            <span>1</span>
            <span>2</span>
          </div>
        </div>
      )}
    </>
  );
};
export default DogList;
