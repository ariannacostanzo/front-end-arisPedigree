import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.scss";
import {
  faBars,
  faCaretDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/authProvider";
// import SearchBar from "../searchbar/Searchbar";
const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const [showDogUnderlist, setShowDogUnderlist] = useState(false);
  const [showAuthUnderlist, setShowAuthUnderlist] = useState(false);

  const logOutAndHome = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const relocateAndCloseMenu = () => {
    window.scrollTo(0, 0);
    setIsHamburgerVisible(false);
    setShowDogUnderlist(false);
    setShowAuthUnderlist(false);
  };

  return (
    <>
      <div className="relative">
        <header className="py-4 sm:px-0 container mx-auto flex items-center justify-between ">
          {/* da togliere  il justify between per rimettere la searchbar */}
          <div className="header-nav flex flex-wrap sm:flex-nowrap items-center gap-x-7 gap-y-2 justify-between">
            <div className="grow shrink-0 xl:grow-0">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img
                  src="/logoaris.png"
                  alt="logo"
                  className="w-[200px] sm:w-[300px]"
                />
              </Link>
            </div>
            {/* navigazione in desktop */}
            <ul className="hidden xl:flex items-center desktop-nav">
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
                    <li className="p-[10px]" onClick={logOutAndHome}>
                      Logout
                    </li>
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
              <li>
                <NavLink to="/privacy" onClick={() => window.scrollTo(0, 0)}>
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/complaint" onClick={() => window.scrollTo(0, 0)}>
                  Violation Report
                </NavLink>
              </li>
            </ul>

            {/* Searchbar  */}
            {/* <SearchBar></SearchBar> */}

            {/* hamburger button  */}
            <div
              className="xl:hidden cursor-pointer order-2 shrink-0"
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
                  <li>
                    <NavLink
                      to="/privacy"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Privacy Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/complaint"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Violation Report
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* nome utente se loggato  */}
          {isLoggedIn && (
            <div className="headerUserName">
              Hi <Link to="/userDetail">{user.name}</Link> !
            </div>
          )}
        </header>
      </div>
    </>
  );
};
export default Header;
