import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const TeamMember = ({ firstName, lastName, country, email, image }) => {
  console.log(image);
  return (
    <Card
      sx={{
        height: "70vh",
        width: "20vw",
        margin: "0 auto",
        background: "rgba(131, 106, 173, 0.8)",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "90%", // 16:9 aspect ratio (adjust as needed)
          backgroundImage: `url(${image})`, // Set the image URL as background
          backgroundSize: "fit", // Adjust the sizing as needed
        }}
      />
      <CardContent sx={{ marginTop: "3vh" }}>
        <Typography variant="h4" component="div" color="white" align="center">
          {firstName} {lastName}
        </Typography>
        <Typography variant="h6" color="text.primary" align="center">
          {country}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
