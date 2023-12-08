// pages/api/upload.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { image } = req.body;
  
        // Process and save the image data to MongoDB or your desired storage
  
        res.status(200).json({ message: 'Image uploaded successfully!' });
      } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  