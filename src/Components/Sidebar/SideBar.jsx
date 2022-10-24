import "./sidebar.css";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { BsFillBookmarksFill } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { BsFillPaletteFill } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { Link } from "react-router-dom";

const Sidebar = ({ name, username, profilePicture, setCurrentUser }) => {
  setCurrentUser();

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="profile-photo">
          <img src={profilePicture} alt="" />
        </div>
        <div className="person">
          <p className="text-bold">{name}</p>
          <p className="text-muted">@{username}</p>
        </div>
      </div>
      <div className="menu">
        <div className="menu-item">
          <FaHome />
          <h3>Home</h3>
        </div>
        <div className="menu-item">
          <MdExplore />
          <h3>Explore</h3>
        </div>
        <div className="menu-item">
          <MdNotifications />
          <h3>Notifications</h3>
        </div>
        <div className="menu-item">
          <SiGooglemessages />
          <h3>Messages</h3>
        </div>
        <div className="menu-item">
          <BsFillBookmarksFill />
          <h3>Bookmarks</h3>
        </div>
        <div className="menu-item">
          <SiGoogleanalytics />
          <h3>Analytics</h3>
        </div>
        <div className="menu-item">
          <BsFillPaletteFill />
          <h3>Theme</h3>
        </div>
        <div className="menu-item">
          <FcSettings />
          <h3>Settings</h3>
        </div>
      </div>
      <div className="btn btn-primary">
        <Link style={{ color: "white" }} to="/CreatePost">
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
