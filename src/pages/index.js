import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const Demo = () => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: "auto", width: "auto" }}
          zoomTo={0.5}
          initialAspectRatio={4/3}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={400}
          minCropBoxWidth={400}
          background={true}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </div>
      <div>
        <div style={{ display: "inline-block", padding: "10px", boxSizing: "border-box" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px", overflow: "hidden" }}
          />
        </div>
        <div
          style={{ display: "inline-block", padding: "10px", boxSizing: "border-box", width: "50%", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Demo;
