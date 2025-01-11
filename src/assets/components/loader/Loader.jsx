import loaderImg from "../../images/loader.png";
import "./Loader.scss";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <img src={loaderImg} alt="loader" />
      </div>
    </>
  );
};
export default Loader;
