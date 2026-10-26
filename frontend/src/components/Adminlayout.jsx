import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { RiRestaurantFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { TbUsersGroup } from "react-icons/tb";
import { MdFoodBank } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdMenuBook } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io"

const Adminlayout = ({ children }) => {
  const adminname = localStorage.getItem("adminname");
  const [menu, setMenu] = useState({
    food_category: false,
    food_menu: false,
    orders: false,
    reports: false,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileBarOpen, setProfileBarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //this is for responsive according to window screen width...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth > 1024);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  // this is sidebar open logic
  const onOpen = () => {
    setSidebarOpen(!sidebarOpen);
    setIsOpen(!isOpen);
  };

  // this is sidebar close logic
  const onclose = () => {
    setSidebarOpen(false);
    setIsOpen(false);
  };

  const navigate = useNavigate();

  // logout logic....
  const logoutHandler = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminname");
    navigate("/user-login");
  };

  //sidebar toggle item logic...
  const togglemenu = (item) => {
    setMenu({
      ...menu,
      [item]: !menu[item],
    });
  };

  return (
    <div className=" w-full bg-black min-h-screen text-white lg:text-lg">
      {/* Navbar section... */}
      <header className="min-w-full min-h-16 flex items-center bg-black text-white px-3 sm:px-5 shadow-2xl shadow-amber-200">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open navigation menu"
          className="p-2 mr-2 text-gray-400 cursor-pointer lg:hidden"
        >
          <LuMenu size={23} />
        </button>
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl flex items-center text-yellow-400 gap-2 sm:gap-5 whitespace-nowrap">
          <RiRestaurantFill />
          ƒσσ∂вαє
        </h1>
        <div className="ml-auto flex items-center justify-end gap-3 sm:gap-4">
          {adminname && (
            <div className="flex items-center">
              <ul className="lg:flex gap-7  font-semibold text-yellow-400 hidden me-3 ">

                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/login" className="flex">
                    {adminname && <p>welcome {adminname}</p>}
                  </Link>
                </li>
              </ul>

              <div
                onClick={() => {
                  setProfileBarOpen(!profileBarOpen);
                }}
                className="mx-2 rounded-full border-2 cursor-pointer text-yellow-400 hover:text-white active:scale-95 p-2"
              >
                <FaUserAlt size={18} className="" />
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="flex mb-50">
        {profileBarOpen && (
          <div className="border border-t-0 bg-black font-semibold rounded-b-xl p-4 absolute right-0">
            <ul className="text-sm text-yellow-400 ">
              <li className="hover:relative bottom-0.5 py-1 cursor-pointer active:scale-95 hover:text-white">
                <Link className="flex">
                  <FaUser className="my-0.5 mb-3 mx-2" size={11} />
                  Profile
                </Link>
              </li>

              <li className="hover:relative bottom-0.5 cursor-pointer py-1 active:scale-95 hover:text-white">
                <Link className="flex">
                  <IoMdNotifications className="mx-1 mb-2" size={17} />
                  Notifications
                </Link>
              </li>
              <li className="hover:relative bottom-0.5 cursor-pointer py-1 active:scale-95 hover:text-white">
                <Link className="flex">
                  <IoMdSettings className="mx-1 mb-2" size={17} /> Settings
                </Link>
              </li>
              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 py-1 hover:text-white">
                <button onClick={logoutHandler} className="flex">
                  <CiLogout className="mx-1 mb-2" size={17} />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}

        {sidebarOpen ? (
          <>
            <aside className="border-e-4 border-yellow-100 lg:min-w-80 min-w-80 text-yellow-200  lg:text-white ">
              <div className="h-60 w-[100 %] flex justify-center items-center">
                <div className="h-100 w-30  rounded-full flex flex-col pt-10 justify-center items-center">
                  <FaUserAlt size={100} />
                  <h2 className="font-bold p-3">Admin</h2>
                </div>
              </div>
              <div className=" font-light gap-3 ps-10  cursor-pointer flex flex-col leftsidebar ">
                <Link to="/admindashboard" className="flex">
                  <RxDashboard className="relative top-1 right-1" />
                  Dashboard
                </Link>
                <div>
                  <Link to="/admin/all-register-users" className="flex">                  <TbUsersGroup className="relative top-1 right-1" />
                  Reg Users

                  </Link>
                </div>
                <div
                  className="flex"
                  onClick={() => togglemenu("food_category")}
                >
                  <MdFoodBank className="relative top-1 right-1" />
                  Food Category
                  {!menu.food_category ? (
                    <FaAngleDown className="relative top-1 left-1" />
                  ) : (
                    <FaChevronUp
                      size={15}
                      className="relative top-1.5 left-1"
                    />
                  )}
                </div>
                {menu.food_category && (
                  <ul className="flex flex-col justify-center ps-15 text-sm gap-1">
                    <li>
                      <Link to="/addcategory" className="flex">
                        <RiAddLine className="pe-1 pb-1" size={22} />
                        Add Category
                      </Link>
                    </li>
                    <li>
                      <Link to="/managecategory" className="flex">
                        <MdOutlineManageSearch className="pb-1" size={22} />
                        Manage Category
                      </Link>
                    </li>
                  </ul>
                )}
                <div className="flex" onClick={() => togglemenu("food_menu")}>
                  <RiMenu2Line className="relative top-1 right-1" />
                  Food Menu
                  {menu.food_menu ? (
                    <FaAngleDown className="relative top-1 left-1" />
                  ) : (
                    <FaChevronUp
                      size={15}
                      className="relative top-1.5 left-1"
                    />
                  )}
                </div>
                {!menu.food_menu && (
                  <ul className="flex flex-col justify-center ps-15 text-sm gap-1">
                    <li className="flex">
                      <Link to="/add-food-item">Add Food Item</Link>
                    </li>
                    <li className="flex">
                      <Link to="/manage-food-items">Manage Food Items</Link>
                    </li>
                  </ul>
                )}
                <div className="flex" onClick={() => togglemenu("orders")}>
                  <FiEdit className="relative top-1 right-1" />
                  Orders
                  {!menu.orders ? (
                    <FaAngleDown className="relative top-1 left-1" />
                  ) : (
                    <FaChevronUp
                      size={15}
                      className="relative top-1.5 left-1"
                    />
                  )}
                </div>
                {menu.orders && (
                  <ul className="flex flex-col justify-center ps-15 text-sm gap-1">
                    <li>
                      <Link to="/admin/orders/not-confirmed">
                        Not Confirmed
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/orders/confirmed">Confirmed</Link>
                    </li>
                    <li>
                      <Link to="/admin/orders/order-on-preparing">
                        Food Preparing
                      </Link>
                    </li>

                    <li>
                      <Link to="/admin/orders/pick-up">Pickup</Link>
                    </li>
                    <li>
                      <Link to="/admin/orders/delivered">Delivered</Link>
                    </li>
                    <li>
                      <Link to="/admin/orders/cancelled">Cancelled</Link>
                    </li>
                    <li>
                      <Link to="/admin/orders/all-orders">All Orders</Link>
                    </li>
                  </ul>
                )}
                <div className="flex" onClick={() => togglemenu("reports")}>
                  <MdMenuBook className="relative top-1 right-1" />
                  Reports
                  {!menu.reports ? (
                    <FaAngleDown className="relative top-1 left-1" />
                  ) : (
                    <FaChevronUp
                      size={15}
                      className="relative top-1.5 left-1"
                    />
                  )}
                </div>
                {menu.reports && (
                  <ul className="flex flex-col justify-center ps-15 text-sm gap-1">
                    <li>
                      <Link to="/admin/orders/order-records">
                        Order Records
                      </Link>
                    </li>
                  </ul>
                )}

                <div className="">
                  <Link className="flex" to="/admin/orders/search-order">
                    {" "}
                    <MdSearch className="relative top-1 right-1" />
                    Search Order
                  </Link>
                </div>
                <div className="flex">
                  <MdSearch className="relative top-1 right-1" />
                  Manage Reviews
                </div>
              </div>
            </aside>
            {sidebarOpen & isOpen ? (
              <>
                <button onClick={onclose} className="w-full h-screen"></button>
              </>
            ) : (
              <section>{children}</section>
            )}
          </>
        ) : (
          <section>{children}</section>
        )}
      </section>

      {/* footer section */}
      <footer className="bg-gray-800 text-white pt-8 ">
        <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">About Us</h3>
            <p>
              Delicious meals delivered to your door. Fresh ingredients, best
              taste.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Order Now
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Food St, City</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          <p>© 2024 Foodies Delight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Adminlayout;
