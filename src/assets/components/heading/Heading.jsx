import Crumb from "../crumb/Crumb";
import "./heading.scss";

// eslint-disable-next-line react/prop-types
const Heading = ({ heading}) => {
  return (
    <>
      <div className="heading">
        <div className="p-4 container mx-auto">
          <h2>{heading}</h2>
          <Crumb pageName={heading}></Crumb>
        </div>
      </div>
    </>
  );
};
export default Heading;
