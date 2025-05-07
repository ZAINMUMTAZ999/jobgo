
import { AppContext } from "../context/AppNotify";

import SideBar from "./SideBar";
import DropDownUser from "./DropDownUser";
import { Link } from "react-router-dom";

const Header = () => {
  const {  isLogged} = AppContext();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {isLogged && (
              <div className="flex items-center">
                <SideBar />
              </div>
            )}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl -ml-12 font-bold  text-indigo-600">
                JobGo.Com
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {isLogged ? (
              <>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="ml-4">
                  <Link
  to="/addjob"
  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  Post a Job
</Link>

<Link
  to="/search"
  className="ml-4 inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
>
  Jobs
</Link>

                  </div>
                </div>
                <div className="relative flex items-center ml-12">
                  <DropDownUser />
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <span className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer">
                  Sign In
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </header>
  );
};

export default Header;