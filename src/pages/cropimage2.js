import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import image from "next/image";

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const cropperRef = useRef(null);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      const dataUrl = croppedCanvas.toDataURL();
      setCroppedImageUrl(dataUrl);
    }
  };

  const handleSave = () => {
    // Implement your logic to upload cropped image to server
    const file = new File(dataUrl, "croppedImage.png", { type: "image/png" });
    // Upload file using API call
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: 400, width: 400 }}
            initialAspectRatio={16 / 9}
            minCropBoxWidth={200}
            minCropBoxHeight={200}
          />
          <button onClick={handleCrop}>Crop Image</button>
          {croppedImageUrl && (
            <>
              <Image src={croppedImageUrl} alt="Cropped image" />
              <button onClick={handleSave}>Save Cropped Image</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
