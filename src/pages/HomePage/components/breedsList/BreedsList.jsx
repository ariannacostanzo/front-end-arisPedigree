import { Link } from "react-router-dom";
import { useBreed } from "../../../../providers/breedsProvider";
import "./breedsList.scss";

const BreedsList = () => {
  const { breeds } = useBreed();
  return (
    <>
      <div className="breedListContainer">
        <h3 className="text-2xl text-red-400">Breeds List</h3>
        <div id="breedsList">
          {breeds.length > 0 &&
            breeds.map((breed, i) => (
              <div
                key={`breedlisthomepage${i}`}
                className="basis-full lg:basis-1/3 p-2 "
              >
                <Link to="/breedsDetail">{breed.name} </Link>
              </div>
            ))}
        </div>
        {breeds.length === 0 && <div>No breeds found</div>}
      </div>
    </>
  );
};
export default BreedsList;
