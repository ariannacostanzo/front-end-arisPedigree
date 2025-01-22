import { Link, useLocation } from "react-router-dom";

const FeedBackPage = () => {
  const location = useLocation();
  const message = location.state;
  return (
    <>
      <div className="bg-white contact-us-container">
        <div className="container mx-auto">{message}</div>
        <div className="my-4">
          Return to{" "}
          <Link to="/" className="text-[#2975ed] underline">
            {" "}
            Home
          </Link>
        </div>
      </div>
    </>
  );
};
export default FeedBackPage;
