import Navbar from "../Navbar/Navbar";
import useRefreshToken from "../../hooks/useRefreshToken";
import styles from "../../Pages/home.module.css";
const Hero = () => {
  const refresh = useRefreshToken();
  return (
    <section id="section-hero" className={styles.homeContainer}>
      <div id="hero-text">
        <img id="hero-X" src="img/X.svg" alt="logotip" />
        <h1 id="hero-biggest">BIGGEST DEVELOPER</h1>
        <h1 id="hero-conference">CONFERENCE</h1>
        <div id="hero-info">
          <h3 id="hero-location">ZAGREB, HRVATSKA</h3>
          <h3 id="hero-date">28/07/2023</h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
