// src/components/ImageUploader.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', selectedImage);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_REMOVE_BG_API_KEY,
        },
        responseType: 'blob',
      });

      const outputUrl = URL.createObjectURL(response.data);
      setOutputImage(outputUrl);
    } catch (error) {
      console.error('Background removal failed:', error);
      alert('Error removing background.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-4">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground} className="mt-2 p-2 bg-blue-500 text-white rounded">
        {loading ? 'Processing...' : 'Remove Background'}
      </button>

      <div className="mt-4">
        {outputImage && (
          <>
            <h3 className="font-semibold">Result:</h3>
            <img src={outputImage} alt="Result" className="mt-2 mx-auto max-w-md" />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
