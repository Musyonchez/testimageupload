import React, { useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropImage = () => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState();
  const [cropperOptions, setCropperOptions] = useState({
    aspectRatio: 16 / 9,
    viewMode: 1,
  });

  useEffect(() => {
    if (image && image.cropper) {
      const canvasData = image.cropper.getCanvasData();
      const cropBoxData = image.cropper.getCropBoxData();

      // Enforce minimum dimensions
      if (canvasData.width < 1600 || canvasData.height < 900) {
        setCropperOptions({
          ...cropperOptions,
          aspectRatio: Math.max(1600 / canvasData.width, 900 / canvasData.height),
        });
      }
    }
  }, [src]);

  const onFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const file = files[0];
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
    if (image && image.cropper) {
      const link = document.createElement('a');
      link.href = image.cropper.getCroppedCanvas().toDataURL();
      link.download = 'cropped-image';
      link.click();
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {src && (
        <Cropper
          src={src}
          style={{ maxHeight: 900, maxWidth: 1600, width: '100%', height: '100%' }}
          ref={(node) => {
            setImage(node);
          }}
          cropperOptions={cropperOptions}
        />
      )}
      <button onClick={onCrop}>Crop</button>
      <br />
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default CropImage;
