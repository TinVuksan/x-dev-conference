import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../Pages/home.module.css";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();

  const isLinkActive = (route) => {
    return location.pathname === route ? "active" : "";
  };

  return (
    <div id="navbar" className={styles.navbarContainer}>
      <div id="navbar-logo">
        <a onClick={() => navigate("/home")}>
          <img src="img/LOGO.svg" alt="logotip" />
        </a>
        {title && <h1 id="navbar-title">{title.toUpperCase()}</h1>}
      </div>

      <div id="navbar-links">
        <ul>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/home")}
              className={isLinkActive("/home")}
            >
              Home
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/about")}
              className={isLinkActive("/about")}
            >
              About
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/speakers")}
              className={isLinkActive("/speakers")}
            >
              Speakers
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/pricing")}
              className={isLinkActive("/pricing")}
            >
              Pricing
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/schedule")}
              className={isLinkActive("/schedule")}
            >
              Schedule
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/news")}
              className={isLinkActive("/news")}
            >
              News
            </a>
          </li>
          <li id="navbar-link">
            <a
              onClick={() => navigate("/contact")}
              className={isLinkActive("/contact")}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p id="navbar-button">Hey, {auth.firstName}</p>
      </div>
    </div>
  );
};

export default Navbar;
