/* eslint-disable react/prop-types */
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./crumb.scss";

const Crumb = ({ pageName }) => {
  return (
    <>
      <div className="p-4 container mx-auto">
        <div className="crumb">
          <Link
            to="/"
            className="crumb-home"
            onClick={() => window.scrollTo(0, 0)}
          >
            Homepage
          </Link>{" "}
          <FontAwesomeIcon
            icon={faChevronRight}
            className="crumb-icon"
          ></FontAwesomeIcon>{" "}
          <span className="crumb-name">{pageName}</span>
        </div>
      </div>
    </>
  );
};
export default Crumb;
