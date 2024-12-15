import { useState } from "react";
import { useAuth } from "../../providers/authProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading.jsx";
import "./loginPage.scss";

const LoginPage = () => {

  const { state } = useLocation();
  const { errorMessage } = state || {};
  const { redirectTo } = state || {};

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
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

    const { emailOrUsername, password } = formData;

    try {
      const payload = { emailOrUsername, password };
      await login(payload, redirectTo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading heading="Login"></Heading>
      <div className="bg-white login-page">
        <div className="p-4 container mx-auto">
          {errorMessage &&
            <div>{errorMessage}</div>
          }
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="emailOrUsername">User name or Email:</label>
              </div>
              <input
                className="w-full md:w-[500px]"
                type="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                autoComplete="emailOrUsername"
                required
              />
            </div>
            <div>
              <div className="my-2">
                <label htmlFor="password">Password:</label>
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
            {/* da fare pagina di reset password */}
            {/* <p>Forgot your password?</p> */}
            <button className="custom-btn my-10 " type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;

