import ExamplePedigree from '../../assets/components/examplePedigree/ExamplePedigree.jsx';
import Jumbo from '../../assets/components/jumbo/Jumbo.jsx'
import NewsAndDogs from '../../assets/components/newsAndDogs/NewsAndDogs.jsx';

const Home = () => {
     return (
       <>
         <div className="p-4 container mx-auto">
         <Jumbo></Jumbo>
         </div>
         <ExamplePedigree></ExamplePedigree>
         <div className="p-4 container mx-auto">
          <NewsAndDogs></NewsAndDogs>
         </div>
       </>
     );
}
export default Home;