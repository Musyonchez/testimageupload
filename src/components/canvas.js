import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const CropImage = () => {
  const [src, setSrc] = useState(null);
  const [canvas, setCanvas] = useState(null);

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
    if (canvas) {
      const croppedImage = canvas.toDataURL('image/jpeg');
      setSrc(croppedImage);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'cropped-image';
    link.click();
  };

  useEffect(() => {
    if (src) {
      const imgElement = new fabric.Image.fromURL(src, (img) => {
        img.scaleToWidth(600);
        img.scaleToHeight(400);
        const canvas = new fabric.Canvas('canvas');
        canvas.add(img);
        setCanvas(canvas);
      });
    }
  }, [src]);

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {src && (
        <canvas width={800} height={800} id="canvas" style={{ border: '1px solid black' }}></canvas>
      )}
      <button onClick={onCrop}>Crop</button>
      <br />
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default CropImage;
