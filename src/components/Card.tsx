import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { red, green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import SpaceXEmpty from "./../assets/spacex_empty.jpg";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IProps {
  launch: {
    id: string;
    mission_name: string;
    launch_date_local: string;
    launch_success: boolean;
    details: string;
    rocket: {
      rocket: {
        mass: {
          kg: number;
        };
        first_stage: {
          fuel_amount_tons: number;
        };
      };
      rocket_name: "Falcon 9";
    };
    links: {
      article_link: string;
      flickr_images: string[];
    };
  };
}

export default function MissionCard({
  launch: {
    id,
    mission_name,
    launch_date_local,
    launch_success,
    details,
    links,
    rocket,
  },
}: IProps) {
  console.log(
    "🚀 ~ file: Card.tsx ~ line 68 ~ rocket",
    rocket.rocket.first_stage.fuel_amount_tons
  );
  console.log("🚀 ~ file: Card.tsx ~ line 68 ~ rocket", rocket.rocket.mass.kg);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const totalMass =
    rocket?.rocket?.mass?.kg + rocket?.rocket?.first_stage?.fuel_amount_tons;

  const consumption = 1 * 15 * totalMass * 1.35 * 10;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={mission_name}
        subheader={new Date(launch_date_local).toUTCString()}
      />
      <CardMedia
        component="img"
        height="330"
        image={
          links.flickr_images.length ? links.flickr_images[0] : SpaceXEmpty
        }
        alt={mission_name + " photo"}
      />

      <CardActions disableSpacing>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: launch_success ? green[500] : red[500],
                fontSize: 10,
              }}
              aria-label="mission"
            >
              {launch_success ? "Succeed" : "Failed"}
            </Avatar>
          }
        />
        <Chip
          color="secondary"
          icon={<ElectricalServicesIcon />}
          label={`EC ${(consumption / 1000).toFixed(2)}GJ`}
        />

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {details ? details : "There is no details about this mission"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
