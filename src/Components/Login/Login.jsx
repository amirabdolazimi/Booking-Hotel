import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthenticationProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("amir@ex.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isAuthenticated);
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
