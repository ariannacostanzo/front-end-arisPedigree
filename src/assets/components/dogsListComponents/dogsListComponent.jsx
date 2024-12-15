import './dogsListComponent.scss';
import placeholder from '../../../../public/placehodler.jpg';
import { Link } from "react-router-dom";
import Pagination from '../pagination/Pagination';
import { useUtils } from '../../../providers/utilsProvider';

const DogListComponent = ({ dogs }) => {

  const { reduceStr } = useUtils();

  return (
    <>
      {dogs.length === 0 && <div>No dogs found</div>}
      {dogs.length > 0 && <Pagination></Pagination>}

      <div className="lg:flex flex-wrap justify-center">
        {dogs.length > 0 &&
          dogs.map((dog, i) => (
            <div
              key={`doglist${i}`}
              className="dogs-container basis-full md:basis-1/2 lg:basis-1/3 "
            >
              {/* Dog card */}
              <div className="dogCard">

                {/* Immagine */}
                <figure className="dogCard-image">
                  <img src={dog.image ? dog.image : placeholder} alt="" />
                </figure>

                {/* Nome */}
                <div className="dogName">
                  <Link
                    to={`/dogDetail/${dog.id}`}
                    className="dogNameLink"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {reduceStr(dog.name, 18)}
                  </Link>

                  {/* Titolo */}
                  {dog.titles && (
                    <div className="dogTitle ">
                      <span className="bg-[#73e567] p-1 text-[#095b00] font-bold">
                        {reduceStr(dog.titles, 20)}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Paginatore */}
      {dogs.length > 0 && <Pagination ></Pagination>}
    </>
  );
}
export default DogListComponent;