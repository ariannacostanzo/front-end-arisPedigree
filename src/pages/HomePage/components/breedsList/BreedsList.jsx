import { Link } from "react-router-dom";
import { useBreed } from "../../../../providers/breedsProvider";
import "./breedsList.scss";
import Loader from "../../../../assets/components/loader/Loader";
import { useEffect } from "react";
const BreedsList = () => {
  const { breeds, loading } = useBreed();

  useEffect(() => {
    console.log(breeds)
  })
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="breedListContainer">
          <h3 className="my-10">Breeds List</h3>
          <div id="breedsList">
            {breeds.length > 0 &&
              breeds.map((breed, i) => (
                <div
                  key={`breedlisthomepage${i}`}
                  className="basis-full md:basis-1/2 lg:basis-1/3 p-2 breedItem"
                >
                  <Link to="/breedsDetail">
                    {breed.name} &#40;{breed._count.dogs}&#41;
                  </Link>
                </div>
              ))}
          </div>
          {breeds.length === 0 && <div>No breeds found</div>}
        </div>
      )}
    </>
  );
};
export default BreedsList;
