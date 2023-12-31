import "./style.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TeamMembersList from "./TeamMembersList";
import { useNavigate } from "react-router-dom";
const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTeamMembers = async () => {
      try {
        const response = await axiosPrivate.get("/users/admins", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getTeamMembers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <section id="section-main">
        <Navbar title="" />
        <section id="section-about">
          <div id="about-left">
            <h1 id="about-header">WHO ARE WE</h1>
            <h2 id="about-header2">
              GET TO KNOW ABOUT
              <br />
              XDEV
            </h2>
            <div id="about-text-container">
              <p id="about-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborumLorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <h1 id="about-header">WHAT IS XDEV</h1>
            <div id="about-text-container">
              <p id="about-text">
                It's a multistage hybrid conference dedicated to people
                passionate about software, media, marketing and art continuing
                the tradition of delivering interactive, engaging, and exciting
                content. Expect multiple tracks, learn from extraordinary minds,
                engage in virtual experiences, prospect from exhibit hall, and
                expand your network on afterparties. Everything brought to you
                by XDev - Biggest conference in SE Europe.
              </p>
            </div>
          </div>
          <div id="about-right">
            <img
              id="about-image"
              src="../../img/about-picture.png"
              alt="About section picture"
            />
          </div>
        </section>
      </section>
      <section id="section-team">
        <div id="speakers-title">
          <h2>OUR TEAM</h2>
          <h1>MEET OUR TEAM MANAGEMENT</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TeamMembersList teamMembers={teamMembers} />
        )}
      </section>

      <section id="section-buy">
        <div id="buy-title">
          <h2>GET INVOLVED</h2>
          <h1>
            MORE THAN 1000+ HAVE REGISTERED
            <br />
            TO JOIN OUR CONFERENCE
          </h1>
        </div>

        <div id="button-container">
          <button id="buy-button" onClick={() => navigate("/pricing")}>
            Buy Tickets
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
