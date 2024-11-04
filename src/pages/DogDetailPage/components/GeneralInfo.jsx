import placeholder from "/placehodler.jpg";
import './generalInfo.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from '../../../assets/components/loader/Loader.jsx'

const GeneralInfo = ({dog, isLoading}) => {

const renderDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(newDate);
  return formattedDate;
};

  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && (
        <>
          <h2>{dog.name}</h2>
          <div className="md:flex gap-4">
            <div className="left-content basis-1/3">
              <img src={dog.image ? dog.image : placeholder} alt="" />
              <p>
                Created by: <span>{dog.user?.name || "Unknown"}</span>
              </p>
              <p>
                Views: <span>{dog.views}</span>{" "}
              </p>
            </div>
            <div className="right-content basis-2/3 flex-grow md:flex gap-6">
              <div className="basis-2/4">
                <p>
                  Breed:{" "}
                  <span className="text-[#E89F41]">
                    {dog.breed ? dog.breed.name : "//"}
                  </span>
                </p>
                <p>
                  Title:{" "}
                  <span
                    className={`${
                      dog.titles ? "bg-[#73e567] p-1 text-[#095b00]" : ""
                    }`}
                  >
                    {dog.titles ? dog.titles : "//"}
                  </span>
                </p>
                <p>
                  Sex:{" "}
                  <span>
                    {dog.sex ? (
                      <span>
                        <FontAwesomeIcon
                          icon={faMars}
                          className="text-[#0902a9]"
                        ></FontAwesomeIcon>{" "}
                        male
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          icon={faVenus}
                          className="text-[#e55998]"
                        ></FontAwesomeIcon>{" "}
                        female
                      </span>
                    )}
                  </span>
                </p>
                <p>
                  Date of Birth:{" "}
                  <span>
                    {dog.dateOfBirth ? renderDate(dog.dateOfBirth) : "//"}
                  </span>
                </p>
                <p>
                  Colour: <span>{dog.colour ? dog.colour : "//"}</span>
                </p>
                <p className="flex items-center gap-2">
                  Land of standing:
                  {dog.country && (
                    <>
                      <img
                        src={`https://flagsapi.com/${dog.country.code}/flat/32.png`}
                        alt=""
                      />
                      <span>{dog.country ? dog.country.name : "//"}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="basis-2/4">
                <p>
                  Sire:{" "}
                  <span>
                    {dog.sire ? (
                      <Link to={`/dogDetail/${dog.sire.id}`} className="link">
                        {dog.sire.name}
                      </Link>
                    ) : (
                      "//"
                    )}
                  </span>
                </p>
                <p>
                  Dam:{" "}
                  <span>
                    {dog.dam ? (
                      <Link to={`/dogDetail/${dog.dam.id}`} className="link">
                        {dog.dam.name}
                      </Link>
                    ) : (
                      "//"
                    )}
                  </span>
                </p>
                <p>
                  Weight:{" "}
                  {dog.weight && (
                    <span>{dog.weight.trim() ? dog.weight : ""}</span>
                  )}
                  {!dog.weight && <span>&#8725;&#8725;</span>}
                </p>
                <p>
                  Size:{" "}
                  {dog.size && <span>{dog.size.trim() ? dog.size : "//"}</span>}
                  {!dog.size && <span>&#8725;&#8725;</span>}
                </p>
                <p>
                  Date of Death:{" "}
                  <span>
                    {dog.dateOfDeath ? renderDate(dog.dateOfDeath) : "//"}
                  </span>
                </p>
                <p>
                  Owner: <span>{dog.owner ? dog.owner : "//"}</span>
                </p>
                <p>
                  Breeder: <span>{dog.breeder ? dog.breeder : "//"}</span>
                </p>
                <p>
                  Kennel: <span>{dog.kennel ? dog.kennel : "//"}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:flex items-center justify-center">
            <div>
              <p>Notes:</p>
              <div className="notes-container w-[100%] md:w-[60%] lg:w-[600px]">
                {dog.notes}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default GeneralInfo;
