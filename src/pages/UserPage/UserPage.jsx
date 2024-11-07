import Heading from "../../assets/components/heading/Heading";
import "./userPage.scss";
import { useAuth } from "../../providers/authProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,  faPen,  faSpinner,  faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/axiosClient.js";
import { useEffect, useState } from "react";
import Loader from "../../assets/components/loader/Loader.jsx";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { user } = useAuth();
  const [userDogs, setUserDogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/auth/user/${user.id}`);
      setUserDogs(res.data.dogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDog = async (id) => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(`dogs/${id}`);
      console.log(res);
      setDeleteMessage(res.data[1]);
      fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (deleteMessage) {
      const timeout = setTimeout(() => {
        setDeleteMessage(null);
      }, 7000);

      return () => clearTimeout(timeout); 
    }
  }, [deleteMessage]); 

  return (
    <>
      <Heading heading="My profile"></Heading>
      <div className="bg-white userDetail-container">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center">
            <div className="user-photo">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
          </div>

          <div className="flex items-center justify-between userName-container">
            <h3>{user.name}</h3>
            {/* da fare  */}
            <span>
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : !userDogs ? (
            <p className="text-center pt-4 text-gray-400">
              You have not created any dogs
            </p>
          ) : (
            <div className="userDogs-container">
              <p className="pt-4 text-gray-500">The dogs you created:</p>
              {userDogs.map((dog, i) => (
                <div key={`userDogs-${i}`} className="userDog-card">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4>
                        <Link to={`/dogDetail/${dog.id}`}>{dog.name}</Link>
                      </h4>
                      {dog.titles && (
                        <p className="bg-[#73e567] p-1 text-[#095b00] font-bold inline-block">
                          {dog.titles}
                        </p>
                      )}
                    </div>
                    {dog.image && <img src={dog.image} alt="" />}
                  </div>
                  <div className="managing-icons-container">
                    <span className="tooltip-container">
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                      <span className="tooltip">Modify</span>
                    </span>
                    <span
                      className="tooltip-container"
                      onClick={() => {
                        deleteDog(dog.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      <span className="tooltip">Delete</span>
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center text-center">
                {isDeleting && (
                  <FontAwesomeIcon
                    className="text-3xl"
                    icon={faSpinner}
                    spin
                  ></FontAwesomeIcon>
                )}
                {deleteMessage && <p>{deleteMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserPage;
