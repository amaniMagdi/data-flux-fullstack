import React, { useState } from "react";
import useFetchImages from "./useFetchImages";
import http from "../axios/axios";
import HistogramDialog from "./image-processing/color-histogram";
import SegmentationMaskDialog from "./image-processing/segmentation-mask";

const AllImages = () => {
  const [loadErrors, setLoadErrors] = useState({});
  const { images, loading, error } = useFetchImages();
  const [openHistogramDialog, setHistogramDialog] = useState(false);
  const [histogramData, setHistogramData] = useState({});
  const [openSegmentationDialog, setSegmentationDialog] = useState(false);
  const [segmentationImageUrl, setsegmentationImageUrl] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading images, contact system administrator!</p>;

  const handleImageError = (index) => {
    console.log(`Image at index ${index} failed to load`);
    setLoadErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
  };

  const getImageNameFromUrl = (url) => {
    // Normalize the URL to ensure consistent path separators
    const normalizedUrl = url.replace(/\\/g, "/");

    // Split the URL by '/' and get the last part
    const parts = normalizedUrl.split("/");
    const imageName = parts.pop(); // Get the last part of the path

    return imageName;
  };
  const handleCloseDialog = () => {
    setHistogramDialog(false);
    setHistogramData({});
    setSegmentationDialog(false);
  };
  const handleColorHistogram = (imageUrl) => {
    let imageName = getImageNameFromUrl(imageUrl);
    http
      .post("/images/color-histogram", { image_name: imageName })
      .then((response) => {
        setHistogramData(response.data);
        setHistogramDialog(true);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  };
  const handleSegmentation = (url) => {
    setsegmentationImageUrl(url);
    setSegmentationDialog(true);
  };
  return(
    <>
      {images.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 sm:flex flex-col justify-between"
            >
              <img
                src={`${http.defaults.baseURL}${url}`}
                alt={`Image ${index + 1}`}
                className="w-full rounded-md min-h-fit"
                width={"100%"}
                onError={() => handleImageError(index)}
              />
              {!loadErrors[index] ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => handleColorHistogram(url)}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                  >
                    Histogram
                  </button>
                  <button
                    onClick={() => handleSegmentation(url)}
                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700"
                  >
                    Segmentation
                  </button>
                </div>
              ) : (
                <p className="text-red-500 mt-4">Failed to load image</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-4">No available images!</p>
      )}
      
      <HistogramDialog
        open={openHistogramDialog}
        onClose={handleCloseDialog}
        histogramData={histogramData}
      />
      <SegmentationMaskDialog
        open={openSegmentationDialog}
        onClose={handleCloseDialog}
        imageUrl={segmentationImageUrl}
      />
    </>
  );
};

export default AllImages;
