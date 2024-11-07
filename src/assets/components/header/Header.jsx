import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import { faBars, faCaretDown, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink , useNavigate} from "react-router-dom";
import { useAuth } from "../../../providers/authProvider";

const Header = () => {

  const navigate = useNavigate()
  const {isLoggedIn, logout, userName} = useAuth();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const [showDogUnderlist, setShowDogUnderlist] = useState(false)
  const [showAuthUnderlist, setShowAuthUnderlist] = useState(false)
  const logOutAndHome = () => {
    logout()
    navigate('/')
    window.location.reload();
  }

  const relocateAndCloseMenu = () => {
     window.scrollTo(0, 0);
     setIsHamburgerVisible(false)
     setShowDogUnderlist(false)
     setShowAuthUnderlist(false)
  }

  // fare hamburger menu 
  return (
    <>
      <div className="relative">
        <header className="p-4 container mx-auto flex items-center justify-between ">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src="/logoaris.png" alt="logo" className="w-[300px]" />
          </Link>

          <div className="header-nav flex items-center gap-10">
            {/* navigazione in desktop */}
            <ul className="hidden xl:flex flex-wrap items-center desktop-nav">
              <li>
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                  Home
                </NavLink>
              </li>
              <li>
                Dogs
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="ml-2"
                ></FontAwesomeIcon>
                <ul className="header-underlist">
                  <li>
                    <NavLink
                      to="/add-new-dog"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Add new Dog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dogs-list"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Dog&apos;s list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/search-a-dog"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Search for a dog
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/test-mating"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Testmating
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/latest-news"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  News
                </NavLink>
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
                      <NavLink
                        to="/login"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li>
                <NavLink to="/contact-us" onClick={() => window.scrollTo(0, 0)}>
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div
              className="header-search-btn"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              Search...
            </div>

            {/* hamburger button  */}
            <div
              className="xl:hidden cursor-pointer"
              onClick={() => setIsHamburgerVisible(!isHamburgerVisible)}
            >
              <FontAwesomeIcon
                icon={isHamburgerVisible ? faXmark : faBars}
                className="text-3xl hover:text-[#e89f41]"
              ></FontAwesomeIcon>
            </div>
            {/* hamburger menu  */}
            {isHamburgerVisible && (
              <div className="hamburger-menu xl:hidden">
                <ul className="hamburger-list">
                  <li>
                    <NavLink to="/" onClick={relocateAndCloseMenu}>
                      Home
                    </NavLink>
                  </li>
                  <li
                    className={`fix-padding ${
                      showDogUnderlist ? "h-under-border" : ""
                    }`}
                    onClick={() => setShowDogUnderlist(!showDogUnderlist)}
                  >
                    Dogs
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="ml-2"
                    ></FontAwesomeIcon>
                    {showDogUnderlist && (
                      <ul className="hamburger-underlist">
                        <li>
                          <NavLink
                            to="/add-new-dog"
                            onClick={relocateAndCloseMenu}
                          >
                            Add new Dog
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dogs-list"
                            onClick={relocateAndCloseMenu}
                          >
                            Dog&apos;s list
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/search-a-dog"
                            onClick={relocateAndCloseMenu}
                          >
                            Search for a dog
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <NavLink to="/test-mating" onClick={relocateAndCloseMenu}>
                      Testmating
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/latest-news" onClick={relocateAndCloseMenu}>
                      News
                    </NavLink>
                  </li>
                  {isLoggedIn ? (
                    <li
                      className={`fix-padding ${
                        showAuthUnderlist ? "h-under-border" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAuthUnderlist(!showAuthUnderlist);
                      }}
                    >
                      My Account
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-2"
                      ></FontAwesomeIcon>
                      {showAuthUnderlist && (
                        <ul className="hamburger-underlist">
                          <li
                            className={`fix-padding ${
                              showAuthUnderlist ? "h-under-border" : ""
                            }`}
                            onClick={logOutAndHome}
                          >
                            Logout
                          </li>
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li
                      className={`fix-padding ${
                        showAuthUnderlist ? "h-under-border" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAuthUnderlist(!showAuthUnderlist);
                      }}
                    >
                      Account
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-2"
                      ></FontAwesomeIcon>
                      {showAuthUnderlist && (
                        <ul className="hamburger-underlist">
                          <li>
                            <NavLink to="/login" onClick={relocateAndCloseMenu}>
                              Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/register"
                              onClick={relocateAndCloseMenu}
                            >
                              Register
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  )}

                  <li>
                    <NavLink to="/contact-us" onClick={relocateAndCloseMenu}>
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* nome utente se loggato  */}
          {isLoggedIn && (
            <div className="headerUserName">
              Hi <Link to="/userDetail">{userName}</Link> !
            </div>
          )}
        </header>
      </div>
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
