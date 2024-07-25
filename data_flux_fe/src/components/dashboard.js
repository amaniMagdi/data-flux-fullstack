import { PhotoIcon, ArrowPathIcon, DocumentTextIcon, TableCellsIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'High-Performance Data Processing',
    description:
      'A scalable and secure system capable of handling high-volume data processing and real-time querying.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Statistics',
    description:
      'Advanced statistics computing for tabular data, including mean, median, mode, quartiles, and outliers.',
    icon: TableCellsIcon,
  },
  {
    name: 'RGB Image Analysis',
    description:
      'Generating color histograms and segmentation masks for RGB images with adjustable parameters and retrieval results.',
    icon: PhotoIcon,
  },
  {
    name: 'Text Analysis',
    description:
      'Performing operations like text summarization, keyword extraction, and basic sentiment analysis, with support for T-SNE visualization.',
    icon: DocumentTextIcon,
  },
];

export default function Dashboard() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white py-12 sm:py-12 w-full">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Data Processing and Analysis</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Scalable and Secure Solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A system with high-performance data processing and analysis capabilities, real-time querying, and advanced functionalities of tabular data, RGB images, and textual data.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
