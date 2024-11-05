import "./dogsListPage.scss";
import { useDogs } from "../../providers/dogsProvider";
import Loader from "../../assets/components/loader/Loader.jsx";
import Heading from "../../assets/components/heading/Heading.jsx";
import DogListComponent from "../../assets/components/dogsListComponents/dogsListComponent.jsx";

const DogsListPage = () => {
  const { loading, dogs } = useDogs();

  return (
    <>
      <div className="dogListPage">
        <Heading heading="Dog's List"></Heading>
        <div className="bg-white py-16">
          {loading ? (
            <Loader></Loader>
          ) : (
            <div className="p-4 container mx-auto flex flex-wrap justify-center">
              <DogListComponent dogs={dogs}></DogListComponent>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DogsListPage;
