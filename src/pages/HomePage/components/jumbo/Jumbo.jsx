import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./jumbo.scss";
import { faDog, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Jumbo = () => {

const handleScrollTo = (e, id) => {
  e.preventDefault();
  e.stopPropagation();
  const target = document.getElementById(id);
  const offset = target.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
  
}
  return (
    <>
      <div className="jumbo">
        <div>
          <h1>
            Free Pedigree <br /> for Dogs of all breeds
          </h1>
          <p>
            ArisPedigree online’s database offers free pedigree reports for dogs
            of all breeds,
            <br /> from all over the world. You can start exploring the website
            checking our <Link to="dogs-list">dog’s list</Link>
            <br /> and browsing through all dogs available in the database or
            using our <Link to="search-a-dog">search page</Link>
            <br /> to find dogs fulfilling your criteria. 
            Otherwise you can select a breed in the list below.
          </p>
        </div>
        <div className="flex gap-6 mt-6">
          <button
            className="bg-[#2975ed]"
            onClick={(e) => handleScrollTo(e, "dogsList")}
          >
            Dog List
            <FontAwesomeIcon icon={faDog} className="ml-2"></FontAwesomeIcon>
          </button>
          <button
            className="bg-[#E89F41]"
            onClick={(e) => handleScrollTo(e, "breedsList")}
          >
            <FontAwesomeIcon
              icon={faTableList}
              className="mr-2"
            ></FontAwesomeIcon>
            Breeds
          </button>
        </div>
      </div>
    </>
  );
};
export default Jumbo;
