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
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width >= 600 && img.height >= 400) {
          setSrc(URL.createObjectURL(file));
        } else {
          alert('Please upload an image with a minimum width and height of 400 pixels.');
        }
      };
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
          style={{ minHeightheight: 600, minWidth: 400, objectFit: 'cover' }}
          ref={(node) => {
            setImage(node);
          }}
          cropperOptions={{
            aspectRatio: 16 / 9,
            viewMode: 1,
            minCropBoxWidth: 400,
            minCropBoxHeight: 400,
          }}
        />
      )}
      <button onClick={onCrop}>Crop</button>
      <br />
      <button onClick={downloadImage}>Download</button>
    </div>
 );
};

export default CropImage;