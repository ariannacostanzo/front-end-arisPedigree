import "./dogsListPage.scss";
import { useDogs } from "../../providers/dogsProvider";
import Loader from "../../assets/components/loader/Loader.jsx";
import placeholder from "../../../public/placehodler.jpg";
import { Link } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading.jsx";

const DogsListPage = () => {
  const { allDogs, loading } = useDogs();

  return (
    <>
      <div className="dogListPage">
        <Heading heading="Dog's List"></Heading>
        <div className="bg-white py-16">
          {loading ? (
            <Loader></Loader>
          ) : (
            <div className="p-4 container mx-auto flex flex-wrap justify-center">
              {allDogs.length === 0 && <div>No dogs found</div>}
              {allDogs.length > 0 &&
                allDogs.map((dog, i) => (
                  <div
                    key={`doglist${i}`}
                    className="dogCard-container basis-full md:basis-1/2 lg:basis-1/3 "
                  >
                    <div className="dogCard">
                      <figure className="dogCard-image">
                        <img src={dog.image ? dog.image : placeholder} alt="" />
                      </figure>
                      <div className="dogName">
                        <Link
                          to={`/dogDetail/${dog.id}`}
                          className="dogNameLink"
                        >
                          {dog.name}
                        </Link>
                        {dog.titles && (
                          <div className="dogTitle ">
                            <span className="bg-[#73e567] p-1 text-[#095b00] font-bold">
                              {dog.titles}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DogsListPage;
