/* eslint-disable react/prop-types */
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './crumb.scss'

const Crumb = ({pageName}) => {
     return (
       <>
         <div className="crumb">
           <Link to="/" className="crumb-home">
             Homepage
           </Link>{" "}
           <FontAwesomeIcon
             icon={faChevronRight}
             className="crumb-icon"
           ></FontAwesomeIcon>{" "}
           <span className="crumb-name">{pageName}</span>
         </div>
       </>
     );
}
export default Crumb;