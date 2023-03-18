import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Card, CardMedia, Stack, Box, CircularProgress } from "@mui/material";
function ServeGraphic({ eventId, graphicName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (eventId) {
        const url = await Storage.get(`events/${eventId}/${graphicName}`);
        setImageUrl(url);
      } else {
        const url = await Storage.get(`tmp/${graphicName}`);
        setImageUrl(url);
      }
    };
    fetchImageUrl();
  }, [imageUrl]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        width: "80vw",
        padding: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Card sx={{ width: "80vw", padding: "10px" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {imageUrl && (
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image={imageUrl}
                  alt="My Image"
                />
              </Card>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}

export default ServeGraphic;
