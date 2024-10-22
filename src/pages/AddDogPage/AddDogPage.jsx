import { useAuth } from "../../providers/authProvider";

const AddDogPage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn ? (
        <div>Add dog Page you have to login</div>
      ) : (
        <div>aggiungi un cane</div>
      )}
    </>
  );
};
export default AddDogPage;
