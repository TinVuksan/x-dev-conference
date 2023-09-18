import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TeamMember = ({ firstName, lastName, country, email }) => {
  return (
    <Card id="speakers-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
