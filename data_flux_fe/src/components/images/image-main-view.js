import React, { useState } from "react";
import AllImages from "./images-list";
import Header from "../header";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import BulkDialog from "./bulk-upload-dialoge";

const ImagesList = () => {
  const [openBulkDialog, setBulkDialog] = useState(false);

  const handleOpenBulkDialog = () => {
    setBulkDialog(true);
  };

  const handleCloseBulkDialog = () => {
    setBulkDialog(false);
  };

  return (
    <div className="relative min-h-screen">
       <div className="flex flex-col lg:flex-row justify-between items-center px-4 py-3 space-y-3 lg:space-y-0">
        <Header title={"Images List"} />
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex items-center justify-center"
          onClick={handleOpenBulkDialog}
        >
          <ArrowUpOnSquareIcon className="w-5 h-5 mr-2" />
          Bulk Images
        </button>
      </div>
      <div className="mt-4 px-4 sm:px-6 lg:px-8">
        <AllImages />
        <BulkDialog open={openBulkDialog} onClose={handleCloseBulkDialog} />
      </div>
    </div>
  );
};

export default ImagesList;
