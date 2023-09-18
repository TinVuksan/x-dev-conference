import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section id="bottom-footer">
      <img id="footer-logo" src="../../img/LOGO.svg" alt="logotip" />
      <div id="footer-event-details">
        <h1 id="footer-title">EVENT DETAILS</h1>
        <h3 id="footer-date">28th of July to 1st of August 2023</h3>
        <h4 id="footer-text">Trg Bana Josipa Jelačića 5</h4>
        <h4 id="footer-text">Zagreb, Croatia</h4>
        <a
          href="https://www.google.com/maps/@45.7727259,15.9408551,3a,66.2y,131.28h,95.25t/data=!3m6!1e1!3m4!1srOK1VF3QB9YYUKwjSSYAcw!2e0!7i16384!8i8192?entry=ttu"
          target="_blank"
          id="footer-map-link"
        >
          VIEW MAP LOCATION
        </a>
      </div>
      <div id="footer-social-updates">
        <h1 id="footer-title">SOCIAL UPDATES</h1>
        <h4 id="footer-text">
          To learn more about this event, find us on social media below.
        </h4>
        <div id="footer-grid-container">
          <Link to="https://www.facebook.com" target="_blank">
            <FacebookIcon
              id="footer-grid-cell"
              sx={{ color: "#4267B2", cursor: "pointer", fontSize: "3rem" }}
            />
          </Link>
          <Link to="https://www.youtube.com" target="_blank">
            <YouTubeIcon
              id="footer-grid-cell"
              sx={{ color: "#FF0000", cursor: "pointer", fontSize: "3rem" }}
            />
          </Link>
          <Link to="https://www.linkedin.com" target="_blank">
            <LinkedInIcon
              id="footer-grid-cell"
              sx={{ color: "#0077B5", cursor: "pointer", fontSize: "3rem" }}
            />
          </Link>
          <Link to="https://www.instagram.com" target="_blank">
            <InstagramIcon
              id="footer-grid-cell"
              sx={{ color: "#C13584", cursor: "pointer", fontSize: "3rem" }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
