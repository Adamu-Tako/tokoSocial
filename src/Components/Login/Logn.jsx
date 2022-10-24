import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const nav = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", username);
    data.append("password", password);
    const dataObj = {};
    data.forEach((value, key) => (dataObj[key] = value));
    console.log("logins", dataObj);
    const profilesDb = await fetch("http://localhost:3000/profile")
      .then((res) => res.json())
      .then((data) => data);

    const found = profilesDb.find((u) => u.username === dataObj.username);
    if (!found) return setFormMessage("Login Failed");

    const passwordMatched = found.password === dataObj.password;
    if (!passwordMatched) return setFormMessage("Login Failed");

    localStorage.setItem("userId", found.userId);

    setFormMessage("Login Succesfull");
    nav("/homepage");
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div className="message">
          <p>{formMessage}</p>
        </div>
        <div className="input-field">
          <p>Create Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-field">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin} className="form-button">
          Login
        </button>
        <Link to="/signup">
          <p>Don't have an account? Signup!</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
