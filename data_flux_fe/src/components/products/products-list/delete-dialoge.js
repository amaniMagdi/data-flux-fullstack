import React, { useState, useEffect } from "react";
import http from "../../axios/axios";
import { Dialog,DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteDialog = ({ open, onClose, productId }) => {
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  const handleDeleteProduct = (e) => {
    e.preventDefault();

    http
      .delete(`/tabular/${productId}`)
      .then((response) => {
        setAlert({
          visible: true,
          message: "Product deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: "No matched product!",
          type: "error",
        });
      });
  };

  const handleClose = () => {
    setAlert({ visible: false, message: "", type: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="mt-3 sm:flex">
                <TrashIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600 mr-2"
                  />
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Delete Product
                  </DialogTitle>
                </div>
            </div>
            <form onSubmit={handleDeleteProduct}>
              <div className="grid mb-6 ml-6 mr-6 md:grid-cols-2">
                <div>Are you sure to delete this item?</div>
              </div>
              {alert.visible && (
                <div
                  className={`mx-4 px-4 py-3 mb-2 sm:px-6 ${
                    alert.type === "error" ? "bg-red-100" : "bg-green-100"
                  } rounded-md`}
                >
                  <p
                    className={`text-sm ${
                      alert.type === "error" ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {alert.message}
                  </p>
                </div>
              )}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
