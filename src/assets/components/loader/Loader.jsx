import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Loader.scss'

const Loader = () => {
     return (
     <>
     <div className="loader">
       <FontAwesomeIcon icon={faPaw}></FontAwesomeIcon>
     </div>
     </>
     )
}
export default Loader;