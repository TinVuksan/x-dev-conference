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
          href="https://goo.gl/maps/7b6XRnAjABuaHDoQ9"
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
          <div id="footer-grid-cell"></div>
          <div id="footer-grid-cell"></div>
          <div id="footer-grid-cell"></div>
          <div id="footer-grid-cell"></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
