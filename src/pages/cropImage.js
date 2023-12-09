import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropImage = () => {
 const [src, setSrc] = useState(null);
 const [image, setImage] = useState();
 const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 16 / 9 });

 const onFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const file = files[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
    }
 };

 const onImageLoaded = (img) => {
    setImage(img);
 };

 const onCropComplete = (crop) => {
    makeClientCrop(crop);
 };

 const makeClientCrop = (crop) => {
    if (image && crop.width && crop.height) {
      getCroppedImg(image, crop, 'newFile.jpeg');
    }
 };

 async function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        window.URL.revokeObjectURL(this.src);
        this.src = URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
 }

 const downloadImage = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'cropped-image';
    link.click();
 };

 return (
    <div>
      <input type="file" onChange={onFileChange} />
      {src && (
        <ReactCrop
          src={src}
          onImageLoaded={onImageLoaded}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={onCropComplete}
        />
      )}
      <button onClick={downloadImage}>Download</button>
    </div>
 );
};

export default CropImage;