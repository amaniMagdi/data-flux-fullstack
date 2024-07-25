import React, { useState } from "react";
import http from "../../axios/axios";
import { Dialog } from "@headlessui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const BulkDialog = ({ open, onClose }) => {
  // uploaded images state
  const [uploadedProducts, setUploadedProducts] = useState(null);
  // Dialoge alerts
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });
  // handle close of alert
  const handleClose = () => {
    setUploadedProducts(null);
    setAlert({ visible: false, message: "", type: "" });
    onClose();
  };

  //   Handle InputFileChange Function
  const handleChangeFile = (e) => {
    setUploadedProducts(e.target.files[0]);
  };
  const handleBulkProductsUpload = () => {
    if (!uploadedProducts) {
      setAlert({ visible: true, message: "No file selected", type: "error" });
      return;
    }
    // create an object {}
    const postData = new FormData();
    // append file key and its value in postData
    postData.append("file", uploadedProducts);
    http
      .post("/tabular/upload", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAlert({
          visible: true,
          message: `File uploaded successfully with ${response.data.total_records} added records`,
          type: "success",
        });
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: error.response.data.error,
          type: "error",
        });
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ArrowUpTrayIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-indigo-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Upload CSV Bulk Products
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      id="bulk"
                      accept=".csv"
                      name="bulk"
                      type="file"
                      className={"mt-2"}
                      onChange={handleChangeFile}
                    />
                  </div>
                </div>
              </div>
            </div>
            {alert.visible && (
              <div
                className={`mx-4 px-4 py-3 sm:px-6 ${
                  alert.type === "error" ? "bg-red-100" : "bg-green-100"
                } rounded-md`}
              >
                <p
                  className={`mx-4 px-4 py-3 sm:px-6 ${
                    alert.type === "error" ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            )}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={handleBulkProductsUpload}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default BulkDialog;
