import Grid from "@mui/material/Grid";
import TeamMember from "./TeamMember";

const TeamMembersList = ({ teamMembers }) => {
  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
      <Grid container spacing={1}>
        {teamMembers.map((member) => (
          <Grid item key={member.id}>
            <TeamMember
              firstName={member.firstName}
              lastName={member.lastName}
              country={member.country}
              email={member.email}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamMembersList;
