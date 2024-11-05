import { Link } from "react-router-dom";
import "./examplePedigree.scss";

const ExamplePedigree = () => {
  return (
    <>
      <div id="examplePedigree">
        <h2>Example Pedigree</h2>
        <div className="lg:flex justify-center items-center example-container">
          <div className="pedigree-example-card">
            <Link to="dogDetail/1" onClick={() => window.scrollTo(0, 0)}>
            <img src="/examplePedigree/example-1.jpg" alt="pedigree-1" />
              <div className="example-pedigree-title">
                <h5>Jackstaff Fasination</h5>
                <p>Amstaff</p>
              </div>
            </Link>
          </div>
          <div className="pedigree-example-card">
            <Link to="dogDetail/2" onClick={() => window.scrollTo(0, 0)}>
            <img src="/examplePedigree/example-2.jpg" alt="pedigree-2" />
              <div className="example-pedigree-title">
                <h5>ESQUEL DEL CHUBUT</h5>
                <p>Argentine Dogo</p>
              </div>
            </Link>
          </div>
          <div className="pedigree-example-card">
            <Link to="dogDetail/3" onClick={() => window.scrollTo(0, 0)}>
            <img src="/examplePedigree/example-3.jpg" alt="pedigree-3" />
              <div className="example-pedigree-title">
                <h5>雅拉 &#40;Yala&#41;</h5>
                <p>Do-Khyi</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExamplePedigree;
