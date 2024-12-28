import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./searchbar.scss";

const SearchBar = () => {
  return (
    <>
      {/* SearchBar */}
      <div className="header-search-bar order-last sm:order-1 basis-full sm:basis-[250px] lg:basis-[160px] 2xl:basis-[300px]">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-[#E89F41] absolute left-2 top-1/2 translate-y-[-50%]"
        ></FontAwesomeIcon>

        <input type="text" placeholder="Search..." />
      </div>
    </>
  );
};
export default SearchBar;
