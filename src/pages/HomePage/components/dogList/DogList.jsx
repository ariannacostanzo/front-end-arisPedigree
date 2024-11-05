import "./doglist.scss";
import { useDogs } from "../../../../providers/dogsProvider.jsx";
import alphabet from "../../../../database/alphabeth.js";
import { Link } from "react-router-dom";
import Loader from "../../../../assets/components/loader/Loader.jsx";

const DogList = () => {
  const { dogs, loading } = useDogs();
  


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
                  <Link
                    to={`/dogDetail/${dog.id}`}
                    className="dogName"
                    onClick={() => window.scrollTo(0, 0)}
                  >
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
