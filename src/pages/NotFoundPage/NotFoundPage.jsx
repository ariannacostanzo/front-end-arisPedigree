import { Link } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading";
import "./notFoundPage.scss";

const NotFoundPage = () => {
  return (
    <>
      <Heading heading="Not found"></Heading>
      <div className="bg-white">
        <div className="container p-4 mx-auto">
          <div className="not-found-container">
            <div>
              <h2>404</h2>
              <h3>page not found</h3>
              <button className="readmore-btn">
                <Link to="/">back to home</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFoundPage;
