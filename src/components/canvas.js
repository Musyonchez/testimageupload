import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropImage = () => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState();

  const onFileChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    let file = files[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
    }
  };

  const onCrop = () => {
    if (image && image.cropper) {
      setSrc(image.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image.cropper.getCroppedCanvas().toDataURL();
    link.download = 'cropped-image';
    link.click();
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {src && (
        <Cropper
          src={src}
          style={{ height: 400, width: '100%' }}
          ref={(node) => {
            setImage(node);
          }}
        />
      )}
      <button onClick={onCrop}>Crop</button>
      <br/>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default CropImage;
