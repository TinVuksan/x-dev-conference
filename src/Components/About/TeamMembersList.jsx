import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TeamMember from "./TeamMember";
import { useRef, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

const TeamMembersList = ({ teamMembers }) => {
  // const containerRef = useRef(null);

  // const handleWheel = (e) => {
  //   const container = containerRef.current;
  //   container.scrollLeft += e.deltaY; // Adjust scroll speed as needed
  //   e.preventDefault(); // Prevent vertical scrolling
  // };

  return (
    // <div
    //   className="team-members-list-container"
    //   ref={containerRef}
    //   onWheel={handleWheel}
    // >
    <>
      <Carousel
        autoPlay={true}
        animation="slide"
        interval={3000}
        duration={600}
        height="80vh"
        stopAutoPlayOnHover={true}
        swipe
        sx={{ marginTop: "25px" }}
      >
        {teamMembers.map((member) => (
          <TeamMember
            key={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            country={member.countryLabel}
            email={member.email}
            image={member.imageUrl}
          />
        ))}
      </Carousel>
      <Typography
        variant="subtitle1"
        color="white"
        fontStyle="italic"
        style={{ margin: "0 auto" }}
      >
        <br />
        Hint: You can slide the cards with your mouse.
      </Typography>
    </>

    // </div>
  );
};

export default TeamMembersList;
