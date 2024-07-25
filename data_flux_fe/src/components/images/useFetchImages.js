import { useState, useEffect } from 'react';
import http from "../axios/axios"

// hook to fetch images
const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await http.get('/images/list-images');
        setImages(response.data.images);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
};

export default useFetchImages;
