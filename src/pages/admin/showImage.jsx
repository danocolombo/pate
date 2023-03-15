import React, { useState, useEffect } from "react";
import { Stack, Card, CardMedia } from "@mui/material";
import { Storage } from "aws-amplify";
// Amplify.configure(awsconfig);
const ShowImage = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchFiles() {
      const fileList = await Storage.list("");
      setFiles(fileList);
    }
    fetchFiles();
  }, []);
  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await Storage.get(
        "events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/NorthwayChurch.png"
      );
      setImageUrl(url);
    };
    fetchImageUrl();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ backgroundColor: "white" }}
      >
        <Stack>
          <Stack>
            <h1>List of files in S3 bucket:</h1>
          </Stack>
          <Stack>
            <ul>
              {files.map((file) => (
                <li key={file.key}>{file.key}</li>
              ))}
            </ul>
          </Stack>
        </Stack>
      </Stack>
      <Stack justifyContent="center">
        <Card>
          <CardMedia
            component="img"
            // height="200"
            height="auto"
            image={imageUrl}
            alt="My Image"
          />
        </Card>
      </Stack>
    </>
  );
};

export default ShowImage;
