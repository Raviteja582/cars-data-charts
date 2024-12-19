// import GitHubIcon from "@mui/icons-material/GitHub";
import HomePageImage from "assets/img/basicHomePage/analytics.jpg";
import Feature1 from "assets/img/basicHomePage/charts-1.png";
import Feature2 from "assets/img/basicHomePage/charts-2.png";

export default function BasicHomePage() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 pb-8 pt-20 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pt-28 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-  4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Drive into the Data: <br /> Uncover Car Trends at Every Turn!
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Welcome to <strong>CarInformatics.com</strong>, your one-stop
              destination for all things car data! Explore interactive charts on
              monthly car sales, track average prices, and compare models like
              never before. Dive deep into the latest trends and insights to
              make your car shopping or market analysis journey smooth and
              informed.{" "}
            </p>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <img src={HomePageImage} alt="" />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl space-y-12 px-4 py-8 lg:space-y-20 lg:px-6 lg:py-24">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Work with tools you already use
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                This interactive dashboard provides customers with the tools to
                track and compare car prices across different brands, models,
                and trims over time. Featuring bar graphs and line series
                charts, users can visualize price trends on a daily, monthly, or
                yearly basis.
              </p>

              <ul className="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Intuitive Filters for Precision
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Dynamic Data Visualization
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Knowledge management
                  </span>
                </li>
              </ul>
              <p className="mb-8 font-light lg:text-xl">
                making it easier to understand and analyze the market before
                purchasing or investing.
              </p>
            </div>
            <img
              className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
              src={Feature1}
              alt=""
            />
          </div>

          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex"
              src={Feature2}
              alt=""
            />
            <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                We invest in the world’s potential
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                This heat map chart enables customers to visualize car sales
                across the United States by state and city, with color
                intensities indicating sales volumes. Customers can filter the
                map by state to drill down into city-level data, including
                average car sales and dealer locations, providing valuable
                insights into regional market trends.
              </p>

              <ul className="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Sales Heat Map by Region
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    State-Specific Filtering
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-500 dark:text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Dealer Locator and City Insights
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
