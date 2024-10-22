import Crumb from "../../assets/components/crumb/Crumb";
import { useAuth } from "../../providers/authProvider";

const AddDogPage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Crumb pageName="Add new dog"></Crumb>
      <div className="p-4 container mx-auto">
        {!isLoggedIn ? (
          <div>Add dog Page you have to login</div>
        ) : (
          <div>aggiungi un cane</div>
        )}
      </div>
    </>
  );
};
export default AddDogPage;
