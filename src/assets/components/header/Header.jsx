import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  return (
    <>
      <header className="p-4 container mx-auto flex items-center justify-between">
        <Link to="/">
          <img src="/logoaris.png" alt="logo" className="w-[300px]" />
        </Link>

        <div className="header-nav flex items-center">
          <ul className="flex flex-wrap items-center ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a href="#">
                Dogs
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li>
                    <NavLink to="/add-new-dog">Add new Dog</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dogs-list">Dog&apos;s list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/search-a-dog">Search for a dog</NavLink>
                  </li>
                </ul>
              </a>
            </li>
            <li>
              <NavLink to="/test-mating">Testmating</NavLink>
            </li>
            <li>
              <NavLink to="/latest-news">News</NavLink>
            </li>
            <li>
              <a href="#">
                Account
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </ul>
              </a>
            </li>
            <li>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>
          <div
            className="header-search-btn"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            Search...
          </div>
        </div>
      </header>
      {isSearchVisible && (
        <div className="search-div-lg">
          <div className="flex justify-start items-center search-lg">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[#368651]"
            ></FontAwesomeIcon>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
