import React, { useState, useEffect } from "react";
import http from "../../axios/axios";
import { Dialog, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const EditDialog = ({ open, onClose, productToEdit }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.product_name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setRating(productToEdit.rating);
      setStockQuantity(productToEdit.stock_quantity);
    }
  }, [productToEdit]);

  const handleEditProduct = (e) => {
    e.preventDefault();

    const postData = {
      product_name: productName,
      category,
      price,
      rating,
      stock_quantity: stockQuantity,
    };

    http
      .put(`/tabular/${productToEdit.id}`, postData)
      .then((response) => {
        setAlert({
          visible: true,
          message: "Product updated successfully",
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
                <PencilSquareIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-indigo-600 mr-2"
                  />
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Edit Product
                  </DialogTitle>
                </div>
            </div>
            <form onSubmit={handleEditProduct}>
              <div className="grid gap-6 mb-6 ml-6 mr-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="rating"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock_quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock_quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    required
                  />
                </div>
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
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Edit
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

export default EditDialog;
