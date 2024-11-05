import './dogsListComponent.scss';
import placeholder from '../../../../public/placehodler.jpg';
import { Link } from "react-router-dom";

const DogListComponent = ({dogs}) => {

     return (
       <>
         {dogs.length === 0 && <div>No dogs found</div>}
         <div className="lg:flex flex-wrap justify-center">
           {dogs.length > 0 &&
             dogs.map((dog, i) => (
               <div
                 key={`doglist${i}`}
                 className="dogs-container basis-full md:basis-1/2 lg:basis-1/3 "
               >
                 <div className="dogCard">
                   <figure className="dogCard-image">
                     <img src={dog.image ? dog.image : placeholder} alt="" />
                   </figure>
                   <div className="dogName">
                     <Link
                       to={`/dogDetail/${dog.id}`}
                       className="dogNameLink"
                       onClick={() => window.scrollTo(0, 0)}
                     >
                       {dog.name}
                     </Link>
                     {dog.titles && (
                       <div className="dogTitle ">
                         <span className="bg-[#73e567] p-1 text-[#095b00] font-bold">
                           {dog.titles}
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             ))}
         </div>
       </>
     );
}
export default DogListComponent;