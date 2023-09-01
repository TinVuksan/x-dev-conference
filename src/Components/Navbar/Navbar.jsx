import { useNavigate } from "react-router-dom";
import styles from "../../Pages/home.module.css";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div id="navbar" className={styles.navbarContainer}>
      <div id="navbar-logo">
        <a onClick={() => navigate("/")}>
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
            <a href="#">News</a>
          </li>
          <li id="navbar-link">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <button id="navbar-button">Buy Tickets</button>
      </div>
    </div>
  );
};

export default Navbar;
