import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './managingIcon.scss'

const ManagingIcon = ({icon, message, manager}) => {
     return (
       <>
         <span
           className="tooltip-container"
           onClick={manager}
         >
           <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
           <span className="tooltip">{message}</span>
         </span>
       </>
     );
}
export default ManagingIcon;