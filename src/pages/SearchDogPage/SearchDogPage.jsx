import Heading from "../../assets/components/heading/Heading";
import "./searchDogPage.scss";
import DogListComponent from "../../assets/components/dogsListComponents/dogsListComponent";
import {useBreed} from '../../providers/breedsProvider.jsx';

const SearchDogPage = () => {

  const {breeds} = useBreed();
  return (
    <>
      <Heading heading="Search for a dog"></Heading>
      <div className="bg-white search-for-a-dog-container">
        <div className="p-4 container mx-auto">
          <h3>Filter & find</h3>
          <div className="flex gap-10 items-end">
            <div>
              <label htmlFor="breeds">Breed:</label>
              <div>
                <select name="breeds">
                  <option value="none">Any</option>
                  {breeds.map((breed, i) => (
                    <option key={`search-dog-breed${i}`} value={breed.name}>{breed.name} ({breed._count.dogs})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-10">
              <label htmlFor="sex">Sex:</label>
              <div className="flex gap-2">
                <input type="checkbox" />M
                <input type="checkbox" />F
              </div>
            </div>
          </div>
          <DogListComponent></DogListComponent>
        </div>
      </div>
    </>
  );
};
export default SearchDogPage;
