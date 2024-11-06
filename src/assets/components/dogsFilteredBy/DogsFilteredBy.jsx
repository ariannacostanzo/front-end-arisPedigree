import { faArrowRight, faComments, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './dogsFilteredBy.scss'
import Sidebar from "../sidebar/Sidebar";

const DogsFilteredBy = ({filter}) => {

    
const renderDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(newDate);
  return formattedDate;
};
     return (
       <>
         <div className="container p-4 mx-auto dog-filtered-container lg:flex justify-between items-start">
           {filter.dogs.length === 0 ? (
             <div className="p-6">No dogs found</div>
           ) : (
             <div className="breeds-detail-dogs">
               {filter.dogs.map((dog, i) => (
                 <div
                   key={`dogBy${filter.name}-${i}`}
                   className=" grow-1 breeds-detail-dog"
                 >
                   <p className="comment-date">
                     <FontAwesomeIcon
                       icon={faPaw}
                       className="text-[#F9BE4F] text-2xl mr-2"
                     ></FontAwesomeIcon>
                     {renderDate(dog.createdAt)}
                     <FontAwesomeIcon
                       icon={faComments}
                       className="ml-2 text-xl"
                     ></FontAwesomeIcon>
                     <span className="ml-2">(0)</span>
                   </p>
                   {dog.image && <img src={dog.image} />}
                   <h3>
                     <Link to={`/dogDetail/${dog.id}`}>{dog.name}</Link>
                   </h3>
                   <button className="readmore-btn">
                     <Link to={`/dogDetail/${dog.id}`}>
                       Read more{" "}
                       <FontAwesomeIcon
                         className="ml-2"
                         icon={faArrowRight}
                       ></FontAwesomeIcon>{" "}
                     </Link>
                   </button>
                 </div>
               ))}
             </div>
           )}
           <Sidebar></Sidebar>
         </div>
       </>
     );
}
export default DogsFilteredBy;