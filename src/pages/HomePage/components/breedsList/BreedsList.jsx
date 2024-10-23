import { Link } from "react-router-dom";
import { useBreed } from "../../../../providers/breedsProvider";
import "./breedsList.scss";

const BreedsList = () => {
  const { breeds } = useBreed();
  return (
    <>
      <div className="breedListContainer">
        <h3 className="my-10">Breeds List</h3>
        <div id="breedsList">
          {breeds.length > 0 &&
            breeds.map((breed, i) => (
              <div
                key={`breedlisthomepage${i}`}
                className="basis-full md:basis-1/2 lg:basis-1/3 p-2 breedItem"
              >
                <Link to="/breedsDetail">{breed.name} &#40;0&#41;</Link>
              </div>
            ))}
        </div>
        {breeds.length === 0 && <div>No breeds found</div>}
      </div>
    </>
  );
};
export default BreedsList;
