import Heading from "../../assets/components/heading/Heading";
import { useAuth } from "../../providers/authProvider";
import "./addDogPage.scss";

const AddDogPage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="addDogPage">
        <Heading heading="Add new dog"></Heading>
        <div className=" bg-white text-black">
          <div className="p-4 container mx-auto">
            {!isLoggedIn ? (
              <div>Add dog Page you have to login</div>
            ) : (
              <div className="add-dog-form-container">add a dog</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AddDogPage;
