import { useNavigate } from "react-router-dom";
import styles from "../../Pages/home.module.css";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(auth);
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
            <a onClick={() => navigate("/home")}>Home</a>
          </li>
          <li id="navbar-link">
            <a onClick={() => navigate("/about")}>About</a>
          </li>
          <li id="navbar-link">
            <a onClick={() => navigate("/speakers")}>Speakers</a>
          </li>
          <li id="navbar-link">
            <a onClick={() => navigate("/pricing")}>Pricing</a>
          </li>
          <li id="navbar-link">
            <a href="#">Schedule</a>
          </li>
          <li id="navbar-link">
            <a onClick={() => navigate("/news")}>News</a>
          </li>
          <li id="navbar-link">
            <a href="#">Contact</a>
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
