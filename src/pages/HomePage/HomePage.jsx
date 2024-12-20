import BreedsList from "./components/breedsList/BreedsList.jsx";
import CountryList from "./components/countryList/CountryList.jsx";
// import DogList from "./components/dogList/DogList.jsx";
import ExamplePedigree from "./components/examplePedigree/ExamplePedigree.jsx";
import Jumbo from "./components/jumbo/Jumbo.jsx";
import NewsAndDogs from "./components/newsAndDogs/NewsAndDogs.jsx";

const Home = () => {
  return (
    <>
      <div className="p-4 container mx-auto lg:min-h-[860px] xl:min-h-[1050px]">
        <Jumbo></Jumbo>
      </div>
      <ExamplePedigree></ExamplePedigree>
      <div className="p-4 container mx-auto">
        <NewsAndDogs></NewsAndDogs>
      </div>
      <div className="p-4 container mx-auto">
        <BreedsList></BreedsList>
      </div>
      <CountryList></CountryList>
      <div className="p-4 container mx-auto">
        {/* <DogList></DogList> */}
      </div>
    </>
  );
};
export default Home;
