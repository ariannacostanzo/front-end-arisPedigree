import { Link } from "react-router-dom";
import "./examplePedigree.scss";
import { useEffect, useState } from "react";
import axios from '../../../../utils/axiosClient.js'
import Loader from "../../../../assets/components/loader/Loader.jsx";

const ExamplePedigree = () => {

  const [threeDogs, setThreeDogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFirstThreeDogs = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get("/dogs?order=asc&limit=3");
      setThreeDogs(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFirstThreeDogs()
  }, [])

  return (
    <>
      <div id="examplePedigree">
        <h2>Example Pedigree</h2>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div className="lg:flex justify-center items-center example-container">
            {threeDogs && threeDogs.map((dog, i) => (
              <div key={`example-dog${i}`} className="pedigree-example-card">
                <Link to={`dogDetail/${dog.id}`} onClick={() => window.scrollTo(0, 0)}>
                  <img src={`/examplePedigree/example-${i+1}.jpg`} alt={`pedigree-example${i+1}`} />
                  <div className="example-pedigree-title">
                    <h5>{dog.name}</h5>
                    <p>{dog.breed.name}</p>
                  </div>
                </Link>
              </div>
            ))}
            
          </div>
        )}
      </div>
    </>
  );
};
export default ExamplePedigree;
