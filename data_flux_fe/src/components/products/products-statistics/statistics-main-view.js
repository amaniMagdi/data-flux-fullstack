import React from "react";
import Statistics from "./statistics";
import Header from "../../header";

const ProductsStatistics = () => {
  return (
    <div className="relative min-h-screen">
      <div className="flex justify-between items-center px-4 py-3">
        <Header title={"Products Statistics"} />
      </div>
      <Statistics />
    </div>
  );
};

export default ProductsStatistics;
