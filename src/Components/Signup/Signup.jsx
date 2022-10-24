import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const Signup = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [url, setUrl] = useState();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const imgUrl = new FormData();

    imgUrl.append("file", url);
    imgUrl.append("upload_preset", "pel3nsyu");
    imgUrl.append("cloud_name", "dye8ruhut");
    await fetch("https://api.cloudinary.com/v1_1/dye8ruhut/upload", {
      method: "post",
      body: imgUrl,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProfilePicture(data.url);
      })
      .catch((err) => console.log(err));

    const data = new FormData();

    data.append("username", username);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("userId", uuidV4());
    data.append("profilePicture", profilePicture);
    const dataObj = {};
    data.forEach((value, key) => (dataObj[key] = value));
    console.log("signup", dataObj);
    await fetch("http://localhost:3000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((data) => data);

    localStorage.setItem("userId", dataObj.userId);

    nav("/homepage");
  };

  return (
    <div className="container">
      <form onSubmit={handleCreateAccount}>
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
          <p>Full Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div className="input-field">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className="input-field">
          <p>Set Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set Password"
          />
        </div>
        <div className="input-field">
          <p>Confirm Password</p>
          <input
            type="password"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <div className="input-field">
          <p>Select your profile picture</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUrl(e.target.files[0])}
          />
        </div>
        <button className="form-button" onClick={handleCreateAccount}>
          Create Account
        </button>
        <Link to="/login">Already have an account? Signin!</Link>
      </form>
    </div>
  );
};

export default Signup;
