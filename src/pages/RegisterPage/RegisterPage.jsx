import { useState } from "react";
import axios from "../../utils/axiosClient.js";
import { useAuth } from "../../providers/authProvider.jsx";
import { useNavigate } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading.jsx";
import './registerPage.scss'

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setToken, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "/auth/register",
        {
          email,
          name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setToken(response.data.token)
      setUser(response.data.data)
      setIsLoggedIn(true);
      navigate("/userDetail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Heading heading="Register"></Heading>
      <div className="bg-white register-page ">
        <div className="p-4 container mx-auto ">
          <form onSubmit={handleSubmit} className="w-[100%] md:w-[70%] mx-auto">
            <div >
              <div className="my-2">
                <label htmlFor="email">Email</label>
              </div>
              <input
              className="w-full md:w-[500px]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div className="">
              <div className="my-2">
                <label htmlFor="name">Username</label>
              </div>
              <input
              className="w-full md:w-[500px]"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
            <div className="">
              <div className="my-2">
                <label htmlFor="password">Password</label>
              </div>
              <input
              className="w-full md:w-[500px]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="password"
                required
              />
            </div>
            <div className="">
              <div className="my-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <input
              className="w-full md:w-[500px]"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="confirmPassword"
                required
              />
            </div>
            <button className="custom-btn my-10" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
