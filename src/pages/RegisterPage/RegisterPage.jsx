import { useState } from "react";
import axios from "../../utils/axiosClient.js";
import { useAuth } from "../../providers/authProvider.jsx";
import { useNavigate } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName } = useAuth();
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

      setUserName(response.data.name);
      setIsLoggedIn(true);
      navigate("/userDetail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Heading heading="Register"></Heading>
      <div className="p-4 container mx-auto">
        <div>register page</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="confirmPassword"
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
export default RegisterPage;
