import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './jumbo.scss'
import { faDog, faTableList } from '@fortawesome/free-solid-svg-icons';

const Jumbo = () => {
     return (
       <>
         <div className="jumbo">
           <div>
             <h1>
               Free Pedigree <br /> for Dogs of all breeds
             </h1>
             <p>
               ArisPedigree online’s database offers free pedigree reports for
               dogs of all breeds,
               <br /> from all over the world.You can start exploring the
               website checking our <a href="#">dog’s list</a>
               <br /> and browsing through all dogs available in the database or
               using our <a href="#">search page</a>
               <br /> to find dogs fulfilling your criteria. <br />
               Otherwise you can select a breed in the list below
             </p>
           </div>
           <div className="flex gap-6 mt-6">
             <button className="bg-[#2975ed]">
               Dog List
               <FontAwesomeIcon icon={faDog} className="ml-2"></FontAwesomeIcon>
             </button>
             <button className="bg-[#E89F41]">
               <FontAwesomeIcon
                 icon={faTableList}
                 className="mr-2"
               ></FontAwesomeIcon>
               Breeds
             </button>
           </div>
         </div>
       </>
     );
}
export default Jumbo;