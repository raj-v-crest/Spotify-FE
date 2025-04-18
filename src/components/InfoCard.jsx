import React from "react";
import { Box, Avatar, CardContent, Typography, CardMedia } from "@mui/material";

const InfoCard = ({ id, image, title, subtitle, isAvatar = false }) => {
  return (
    <Box
      key={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        paddingTop: "12.5px",
        paddingRight: "12.5px",
        paddingLeft: "12.5px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        border: "2px solid #1db954",
        transition: "all 0.3s ease",
        width: "200px",
        flexShrink: 0,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          borderColor: "#27ae60",
        },
      }}
    >
      {isAvatar ? (
        <Avatar
          src={image}
          alt={title}
          sx={{
            width: 200,
            height: 200,
            marginBottom: "16px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "3px solid #1db954",
          }}
        />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            width: 200,
            height: 200,
            marginBottom: "16px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "3px solid #1db954",
          }}
        />
      )}

      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1db954",
            textAlign: "center",
            display: "block",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title.length > 17 ? title.slice(0, 17) + "..." : title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            color="white"
            sx={{ textAlign: "center" }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Box>
  );
};

export default InfoCard;
