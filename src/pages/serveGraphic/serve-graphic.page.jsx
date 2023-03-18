import React, { useState, useEffect } from "react";
import { Card, CardMedia, Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import { Storage } from "aws-amplify";
import Spinner from "../../components/spinner/Spinner";
import Header from "../../components/header/header.component";
import ServeGraphic from "../../components/graphics/serveGraphic.component";
import { setSpinner, clearSpinner } from "../../redux/pate/pate.actions";
import { MainFooter } from "../../components/footers/main-footer";
import { printObject } from "../../utils/helpers";
const ServeGraphicPage = ({ match, setSpinner, clearSpinner, pateSystem }) => {
  let eventID = match?.params?.eventId;
  let graphicName = match?.params?.graphicName;
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState(0);
  const [tmpFileName, setTmpFileName] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;
    printObject("SGP:30-->\n", selectedFile);
    const fileSize = selectedFile.size / (1024 * 1024);
    if (fileSize > 3) {
      setError("File size exceeds 3MB limit");
      return;
    }

    try {
      const fileExtension = selectedFile.name.split(".").pop();
      const fileName = `new-image-${Date.now()}.${fileExtension}`;
      setTmpFileName(fileName);
      const key = `tmp/${fileName}`;
      setUploading(true);
      await Storage.put(key, selectedFile);
      setImageUrl(await Storage.get(key));
      setUploading(false);
      setAccepted(false);
      setStatus(1);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setUploading(false);
    }
  };
  const handleAccept = async () => {
    // try {
    //     const finalKey = `tmp/default.png`;
    //     await Storage.rename(imageUrl, finalKey);
    //     setImageUrl(await Storage.get(finalKey));
    //     setAccepted(true);
    // } catch (error) {
    //     console.log('Error accepting file: ', error);
    // }
  };

  const handleReject = () => {
    // setImageUrl('');
    // setSelectedFile(null);
    // setAccepted(false);
  };
  return pateSystem.showSpinner ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Stack
        direction="column"
        sx={{
          //   backgroundColor: "blue",
          alignItems: "center",
        }}
      >
        {status === 0 && (
          <ServeGraphic eventId={eventID} graphicName={graphicName} />
        )}
        {status === 1 && <ServeGraphic eventId="" graphicName={tmpFileName} />}

        <Card sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack alignItems="center">
            {status === 0 && (
              <>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  Current Event Image
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    padding: "10px",
                  }}
                >
                  The above image is the current graphic associated for the
                  event. The graphic is used to enhance the user experience when
                  the event details are viewed as well as the marquee displayed
                  when the event is available.
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    padding: "10px",
                  }}
                >
                  You can change the image using the fetature below, and switch
                  out the file used. A couple things to note.
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    padding: "10px",
                  }}
                >
                  <ul>
                    <li>Images cannot be greater than 3MB</li>
                    <li>Only one image will be retained.</li>
                  </ul>
                </div>

                <form onSubmit={handleFileUpload}>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <button type="submit">Upload</button>
                </form>
                <Stack sx={{ paddingTop: "10px", paddingBottom: "20px" }}>
                  {error && <div className="error">{error}</div>}
                </Stack>
              </>
            )}
            {status === 1 && (
              <>
                <>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    New Image
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "normal",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    If you would like to use this image, press "ACCEPT" below,
                    or you can select "CANCEL" if you want to keep your current
                    image."
                  </div>
                </>
                <Stack direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      margin: "10px",
                    }}
                  >
                    ACCEPT
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "yellow",
                      color: "black",
                      margin: "10px",
                    }}
                  >
                    CANCEL
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Card>
      </Stack>
      <MainFooter />
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSpinner: () => dispatch(setSpinner()),
  clearSpinner: () => dispatch(clearSpinner()),
});
// Serve.propTypes = {
//     getEventRegistrations: PropTypes.func.isRequired,
// }
const mapStateToProps = (state) => ({
  pateSystem: state.pate,
  currentUser: state.user.currentUser,
});
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ServeGraphicPage);
