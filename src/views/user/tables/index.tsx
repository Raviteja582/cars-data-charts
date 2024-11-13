import { Link } from "react-router-dom";
import LineChartCoverPic from "assets/img/charts/LineChartCover.jpg";
import CountryMapCover from "assets/img/charts/CountryMapCover.jpg";

const Tables = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Card Header */}
          <div className="border-b p-4">
            <h2 className="text-xl font-bold">Price Trends</h2>
          </div>
          {/* Card Body (Image) */}
          <div>
            <Link to="/page1">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="h-fit w-full transform cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-105"
                src={LineChartCoverPic}
              />
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Card Header */}
          <div className="border-b p-4">
            <h2 className="text-xl font-bold">Avg Sales</h2>
          </div>
          {/* Card Body (Image) */}
          <div>
            <Link to="/page2">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="h-full w-full transform cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-105"
                src={CountryMapCover}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
