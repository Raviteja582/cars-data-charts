import { Link } from "react-router-dom";
import "./landingPage.css";

export default function BasicFooterPage() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl p-4 py-6 md:p-8 lg:p-10 lg:py-16">
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center">
          <Link
            to="#"
            className="mb-5 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            CarInfomatics
          </Link>
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
            © 2021-2022 Landwind™. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
