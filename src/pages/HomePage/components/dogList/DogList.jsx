import "./doglist.scss";
import { useDogs } from "../../../../providers/dogsProvider.jsx";
import alphabet from "../../../../database/alphabeth.js";
import { Link } from "react-router-dom";

const DogList = () => {
  const { dogs } = useDogs();

  return (
    <>
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
                className={`basis-full md:basis-1/2 lg:basis-1/3  dog-container ${i % 2 === 0 ? "" : 'grid-even'}`}
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
      </div>
    </>
  );
};
export default DogList;
