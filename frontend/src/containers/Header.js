// import { themeChange } from 'theme-change'
import React from "react"; // , { useEffect, useState }
import {
  useSelector,
  // useDispatch
} from "react-redux";
// import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
// import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
// import SunIcon from '@heroicons/react/24/outline/SunIcon'
// import { openRightDrawer } from "../features/common/rightDrawerSlice";
// import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

import {
  // NavLink, Routes,
  Link,
  //  useLocation
} from "react-router-dom";
import { useUser } from "../store/store";

function Header() {
  // const dispatch = useDispatch();
  const { pageTitle } = useSelector((state) => state.header);
  const [user, setUser] = useUser();
  // Opening right sidebar for notification
  // const openNotification = () => {
  //   dispatch(
  //     openRightDrawer({
  //       header: "Notifications",
  //       bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
  //     })
  //   );
  // };

  function logoutUser() {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn_green drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          {/* Notification icon */}
          {/* <button
            className="btn btn-ghost ml-4  btn-circle"
            onClick={() => openNotification()}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              ) : null}
            </div>
          </button> */}

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user?.profileImageUrl ? (
                  <img src={user?.profileImageUrl} alt="profile" />
                ) : (
                  user?.userName?.charAt(0) || "U"
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="link">
                <Link to={"/app/settings-profile"}>Profile</Link>
              </li>
              {/* <li className="link">
                <Link to={"/app/bio"}>About You</Link>
              </li>
              <li className="link">
                <Link to={"/app/settings-billing"}>Manage Account</Link>
              </li> */}
              {/* <li className='link'><Link to={'/app/settings-billing'}>Home Page</Link></li> */}
              <div className="divider mt-0 mb-0"></div>
              <li className="link">
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
