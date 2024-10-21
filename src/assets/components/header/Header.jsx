import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import Home from "../../../pages/HomePage/HomePage";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  return (
    <>
      <header className="p-4 container mx-auto flex items-center justify-between">
        <Link to={Home}>
          <img src="/logoaris.png" alt="logo" className="w-[300px]" />
        </Link>

        <div className="header-nav flex items-center">
          <ul className="flex flex-wrap items-center ">
            <li>
              <Link to={Home}>Home</Link>
            </li>
            <li>
              <a href="#">
                Dogs
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li>Add new Dog</li>
                  <li>Dog&apos;s list</li>
                  <li>Search for a dog</li>
                </ul>
              </a>
            </li>
            <li>
              <a href="#">Testmating</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">
                Account
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li>Login</li>
                  <li>Register</li>
                </ul>
              </a>
            </li>
            <li>
              <a href="#">Contact Us</a>
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
