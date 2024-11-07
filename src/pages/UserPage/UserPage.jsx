import Heading from "../../assets/components/heading/Heading";
import "./userPage.scss";
import { useAuth } from "../../providers/authProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from '../../utils/axiosClient.js'
import { useEffect, useState } from "react";
import Loader from "../../assets/components/loader/Loader.jsx";

const UserPage = () => {
  const { userName, userId } = useAuth();
  const [userDogs, setUserDogs] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/auth/user/${userId}`);
      console.log(res)
      setUserDogs(res.data.dogs)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }


  }

  useEffect(() => {
    fetchUser()
  }, [])


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
            <h3>{userName}</h3>
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
            <div className="userDogs-container">dogs</div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserPage;
