import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const MusicCard = ({
  image,
  title,
  subtitle,
  onClick,
  isClickable = false,
}) => {
  return (
    <Card
      sx={{
        width: 180,
        cursor: isClickable ? "pointer" : "default",
        opacity: isClickable ? 1 : 0.7,
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
