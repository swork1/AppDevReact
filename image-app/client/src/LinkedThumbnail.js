import React from "react";
import { Grid, Card, CardContent, CardMedia } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./LinkedThumbnail.css";

const LinkedThumbnail = (props) => {
  const { imageData, onThumbnailClick, onBack, isPopover } = props;

  if (!imageData) {
    return null;
  }

  //get filename before extension
  let filename = imageData.filename.split(".").slice(0, -1).join(".");
  // //get extension
  const filename_ext = imageData.filename.split(".").pop();
  // //combine filename and extension with _thumb in between to get thumbnail of image.
  filename = filename + "_thumb" + "." + filename_ext;
  const imageSource = "images/" + imageData.path + "/" + filename;
  const fullImageSource = "images/" + imageData.path + "/" + imageData.filename;

  return (
    <div>
      {isPopover === false ? (
        <Grid item xs onClick={() => onThumbnailClick(imageData)}>
          <Card className="thumbnailCard" variant="elevation">
            <CardContent className="thumbnailContent">
              <CardMedia src={imageSource} component="img" />
              <div className="caption">{imageData.photo_name}</div>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <div>
          <Card variant="elevation">
            <CardContent>
              <Button
                className="backBtn"
                variant="contained"
                color="primary"
                onClick={onBack}
              >
                Back
              </Button>
              <CardMedia
                src={fullImageSource}
                className="fullImage"
                component="img"
              />
              <div className="imageInfoDiv">
                <div>Photo Name: {imageData.photo_name}</div>
                <div>Album: {imageData.album}</div>
                <div>Description: {imageData.description}</div>
                <div>Camera: {imageData.camera}</div>
                <div>fstop: {imageData.fstop}</div>
                <div>sspeed: {imageData.sspeed}</div>
                <div>ISO: {imageData.iso}</div>
                <div>Focal Length: {imageData.focal_length}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LinkedThumbnail;
