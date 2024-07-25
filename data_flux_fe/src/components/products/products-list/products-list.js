import React, { useState, useEffect } from "react";
import http from "../../axios/axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import EditDialog from "./edit-dialoge";
import DeleteDialog from "./delete-dialoge";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState({})
  const [productId, setProductId] = useState(null)
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    http
      .get("/tabular/list-products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  const handleOpenEdit = (product) => {
    setProductToEdit(product)
    setOpenEditDialog(true);
  };

  const handleOpenDelete = (id) => {
    setProductId(id)
    setOpenDeleteDialog(true)
  };
  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  return products.length ? (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Stock Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.product_name}
              </th>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.rating}</td>
              <td className="px-6 py-4">{product.stock_quantity}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleOpenEdit(product)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleOpenDelete(product.id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditDialog  open={openEditDialog} onClose={handleCloseDialog} productToEdit={productToEdit}/>
      
      <DeleteDialog  open={openDeleteDialog} onClose={handleCloseDialog} productId={productId}/>

    </div>
  ) : (
    <p>No Product available</p>
  );
};

export default AllProducts;
