// pages/index.js
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const file = e.target.elements.image.files[0];

    // Display the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (crop, percentCrop) => {
    // Handle crop completion (if needed)
  };

  const handleImageCrop = async () => {
    // Use the cropped data as needed
    console.log('Cropped Image Data:', croppedImage);
  };

  return (
    <div>
      <form onSubmit={handleImageUpload}>
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>

      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" />

          <h2>Crop Image</h2>
          <ReactCrop
            src={selectedImage}
            crop={crop}
            onChange={handleCropChange}
            onComplete={handleCropComplete}
          />

          <button onClick={handleImageCrop}>Crop Image</button>

          {croppedImage && (
            <div>
              <h2>Cropped Image</h2>
              <img src={croppedImage} alt="Cropped" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
