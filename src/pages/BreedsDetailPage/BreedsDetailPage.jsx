import { useEffect, useState } from "react";
import Heading from "../../assets/components/heading/Heading";
import Sidebar from "../../assets/components/sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from '../../utils/axiosClient.js'
import Loader from "../../assets/components/loader/Loader.jsx";
import './breedsDetailPage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faComments, faPaw } from "@fortawesome/free-solid-svg-icons";

const BreedsDetailPage = () => {
let {breedSlug} = useParams();
const [isLoading, setIsLoading] = useState(false);
const [breed, setBreed] = useState(null)

const fetchBreed = async () => {
  const url = `/breeds/${breedSlug}`;

  try {
    setIsLoading(true)
    const res = await axios.get(url)
    console.log(res)
    setBreed(res.data)
  } catch (error) {
    console.log(error)
  } finally{
    setIsLoading(false)
  }

}

const renderDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(newDate);
  return formattedDate;
};

useEffect(() => {
  fetchBreed()
}, [])

//rendere un componente visto che lo riutilizzo in filterbyCountry

     return (
       <>
         {isLoading && <Loader></Loader>}
         {!isLoading && breed && (
           <>
             <Heading heading={breed.name}></Heading>
             <div className="bg-white">
               <div className="container p-4 mx-auto breeds-detail-container lg:flex justify-between items-start">
                 {breed.dogs.length === 0 ? (
                   <div className="p-6">No dogs found</div>
                 ) : (
                   <div className="breeds-detail-dogs">
                     {breed.dogs.map((dog, i) => (
                       <div key={`dogBy${breed.name}-${i}`} className=" grow-1 breeds-detail-dog">
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
                           <Link to={`/dogDetail/${dog.id}`}>Read more <FontAwesomeIcon className="ml-2" icon={faArrowRight}></FontAwesomeIcon> </Link>
                         </button>
                         
                       </div>
                     ))}
                   </div>
                 )}
                 <Sidebar></Sidebar>
               </div>
             </div>
           </>
         )}
       </>
     );
}
export default BreedsDetailPage;