import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./jumbo.scss";
import { faDog, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import dogJumbo from "/dog_jumbo.png"

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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl">
            Free Pedigree <br /> for Dogs of all breeds
          </h1>
          <div className="sm:h-[440px]">
            <figure
              className="image-wrapper w-[190px] sm:w-[350px] md:w-[400px] lg:w-[500px] xl:w-[650px] float-right"
            >
              <img
                src={dogJumbo} alt="" />
            </figure>
            <p className="sm:text-[20px]   sm:pt-8 lg:pt-28">
              ArisPedigree online’s database offers free pedigree reports for dogs
              of all breeds,
              from all over the world. You can start exploring the website
              checking our <Link to="dogs-list">dog’s list</Link>
              and browsing through all dogs available in the database or
              using our <Link to="search-a-dog">search page</Link>
              to find dogs fulfilling your criteria. Otherwise you can
              select a breed in the list below.
            </p>
          </div>
        </div>
        <div className="flex gap-6 mt-6">
          <button
            className="bg-[#2975ed]"
            onClick={(e) => handleScrollTo(e, "countryListHomepage")}
          >
            Country List
            {/* da cambiare  */}
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
