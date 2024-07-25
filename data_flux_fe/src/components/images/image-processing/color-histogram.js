import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { SwatchIcon } from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const HistogramDialog = ({ open, onClose, histogramData }) => {
  const formatHistogramData = (data) => {
    if (!data || !data.r || !data.g || !data.b) {
      return [];
    }

    const formattedData = [];
    const length = Math.max(data.r.length, data.g.length, data.b.length);

    for (let i = 0; i < length; i++) {
      formattedData.push({
        bin: i,
        r: data.r[i] || 0,
        g: data.g[i] || 0,
        b: data.b[i] || 0,
      });
    }

    return formattedData;
  };

  useEffect(() => {
    console.log("Received histogram data:", histogramData);
  }, [histogramData]);

  const formattedData = formatHistogramData(histogramData);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="sm:flex sm:items-start">
                  <SwatchIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-indigo-600 mr-2"
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Color Histogram
                  </Dialog.Title>
                </div>
              </div>
            </div>
            <div>
              {histogramData && histogramData.r ? (
                <BarChart
                  width={500}
                  height={400}
                  data={formattedData}
                  margin={{ top: 20, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bin" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="r" fill="#ff0000" />
                  <Bar dataKey="g" fill="#00ff00" />
                  <Bar dataKey="b" fill="#0000ff" />
                </BarChart>
              ) : (
                <p>No histogram data available</p>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
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

export default HistogramDialog;
