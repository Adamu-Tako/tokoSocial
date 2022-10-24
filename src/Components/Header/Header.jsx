import { FaSearch } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Header = ({ profilePicture }) => {
  const nav = useNavigate();

  const logUserOut = () => {
    localStorage.removeItem("userId");
    nav("/");
  };

  return (
    <nav>
      <div className="container-h">
        <h2 className="logo">tokoSocial</h2>
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search Posts" />
        </div>
        <div className="menu-item">
          <div className="btn btn-primary">
            <Link style={{ color: "white" }} to="/CreatePost">
              Create Post
            </Link>
          </div>
          <div className="profile-photo">
            <img src={profilePicture} alt="" />
          </div>
          <div className="logout-button">
            <MdLogout onClick={logUserOut} /> Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
