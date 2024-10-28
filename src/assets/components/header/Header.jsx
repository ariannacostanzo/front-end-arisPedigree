import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink , useNavigate} from "react-router-dom";
import { useAuth } from "../../../providers/authProvider";

const Header = () => {

  const navigate = useNavigate()
  const {isLoggedIn, logout, userName} = useAuth();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const logOutAndHome = () => {
    logout()
    navigate('/')
    window.location.reload();
  }

  // fare hamburger menu 
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
            </li>
            <li>
              <NavLink to="/test-mating">Testmating</NavLink>
            </li>
            <li>
              <NavLink to="/latest-news">News</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                My Account
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li onClick={logOutAndHome}>Logout</li>
                </ul>
              </li>
            ) : (
              <li>
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
              </li>
            )}

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

        {/* nome utente se loggato  */}
        {isLoggedIn && <div className="headerUserName">Hi {userName}!</div>}
      </header>
      {isSearchVisible && (
        <div className="search-div-lg">
          <div className="flex justify-start items-center search-lg ">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[#E89F41] pr-4"
            ></FontAwesomeIcon>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
