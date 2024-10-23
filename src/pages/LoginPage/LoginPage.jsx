import { useState } from "react";
import { useAuth } from "../../providers/authProvider.jsx";
import { useNavigate } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
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
      await login(payload);
      navigate("/userDetail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading heading="Login"></Heading>
      <div className="p-4 container mx-auto">
        <div>login</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="emailOrUsername">User name or Email:</label>
            <input
              type="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              autoComplete="emailOrUsername"
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

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
