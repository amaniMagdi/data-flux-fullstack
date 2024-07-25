import React, { useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import http from "../../axios/axios";

const SegmentationMaskDialog = ({ open, onClose, imageUrl }) => {
  const [clustersNumber, setClustersNumber] = useState(null);
  const [segmentedImageUrl, setsegmentedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);
  const handleClose = () => {
    setClustersNumber(null);
    //setAlert({ visible: false, message: "", type: "" });
    onClose();
    setLoading(false);
    setsegmentedImageUrl(null)
    setSubmitButton(true)
  };
  const getImageNameFromUrl = (url) => {
    // Normalize the URL to ensure consistent path separators
    const normalizedUrl = url.replace(/\\/g, "/");

    // Split the URL by '/' and get the last part
    const parts = normalizedUrl.split("/");
    const imageName = parts.pop(); // Get the last part of the path

    return imageName;
  };
  const handleSegmentation = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitButton(false)
    let imageName = getImageNameFromUrl(imageUrl);
    http
      .post("/images/segmentation-mask", {
        image_name: imageName,
        k: parseInt(clustersNumber, 10),
      })
      .then((response) => {
        let segmented_image_path = response.data.segmented_image_path;
        let image_name = getImageNameFromUrl(segmented_image_path);
        setLoading(false);
        setsegmentedImageUrl(`/images/media/${image_name}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="sm:flex sm:items-start">
                  <ClipboardDocumentIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-indigo-600 mr-2"
                  />
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Segmentation Mask
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSegmentation}>
                <div className="grid gap-6 mb-6 ml-6 mr-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Clusters Number for Segmentation
                    </label>
                    <input
                      type="number"
                      id="clusters_number"
                      placeholder="Clusters Number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setClustersNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {loading ? (
                  <div className="ml-6 mb-6">
                    <p>Loading...</p>
                  </div>
                ) : segmentedImageUrl ? (
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <p>Segmented Image:</p>
                    <img
                      src={`${http.defaults.baseURL}${segmentedImageUrl}`}
                      alt="error loading the segmented image"
                      className="w-full rounded-md"
                    />
                  </div>
                ) :null}

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {submitButton? (<button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>):null}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SegmentationMaskDialog;
