// pages/index.js
import React from 'react';

const Home = () => {
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.elements.image.files[0]);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Image uploaded successfully:', data.message);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleImageUpload}>
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default Home;
