import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
import { RiRestaurantFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUser, FaYoutube } from "react-icons/fa";
import { TiHeart } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { UserContext } from "./UserContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);


const Userlayout = ({ children }) => {
  const username = localStorage.getItem("username");
  const { cartCount, setCartCount } = useContext(UserContext);
  const { wishlistCount, setWishlistCount } = useContext(UserContext);

  const parentSideBarRef = useRef(null);
  const childSideBarRef = useRef(null);
  const profileBarRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileBarOpen, setProfileBarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //this is for responsive according to window screen width...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth < 1024);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  // this is sidebar open logic
  const onOpen = () => {
    setSidebarOpen((prev) => !prev);
    setIsOpen(true);
  };

  // this is sidebar close logic
  const onclose = () => {
    setSidebarOpen(false);
  };

  const navigate = useNavigate();

  // logout logic....
  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedInUser");
    navigate("/user-login");
  };

  //GSAP animation
  useGSAP(
    () => {
      //profile bar animation
      if (profileBarOpen) {
        gsap.from(profileBarRef.current, {
          height: "0%",
          duration: 0.5,
          opacity: 0,
          scale: 0.6,
        });
      }
      //leftsidebar animation
      if (!parentSideBarRef.current) return;

      if (!profileBarOpen) {
        const t1 = gsap.timeline();
        if (sidebarOpen && isOpen) {
          t1.from(parentSideBarRef.current, {
            x: -100,
            duration: 0.3,
            delay: 0.1,
          });
        }

        t1.from(childSideBarRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          scale: 0.6,
        });
      }
    },
    {
      revertOnUpdate: true,
      dependencies: [sidebarOpen, isOpen, profileBarOpen],
    },
  );




  return (
    <div className="w-full max-w-full bg-black text-white">
      {/* Navbar section... */}
      <header className="w-full min-h-16 flex items-center bg-black text-white px-3 sm:px-5 shadow-2xl shadow-amber-200">
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
          {username ? (
            <div className="flex items-center">
              <ul className="lg:flex gap-7  font-semibold text-yellow-400 hidden me-3 ">
                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link className="flex" to="/">
                    Home
                  </Link>
                </li>

                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food-menu/">Menu</Link>
                </li>
                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white ">
                  <Link to="/user/orders/order-lists">My Orders</Link>
                </li>

                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food/wishlist" className="flex">
                    Wishlist
                    <TiHeart size={23} className="ms-1" />
                    {wishlistCount > 0 && <p className="">({wishlistCount})</p>}
                  </Link>
                </li>

                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food/cart" className="flex">
                    Cart
                    <MdOutlineShoppingCart size={23} className="ms-1" />
                    {cartCount > 0 && <p className="">({cartCount})</p>}
                  </Link>
                </li>
                <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="#" className="flex">
                    {username && <p>welcome {username}</p>}
                  </Link>
                </li>
              </ul>

              <button
                disabled={sidebarOpen && isOpen ? true : false}
                onClick={() => {
                  setProfileBarOpen(!profileBarOpen);
                }}
                className="mx-2 rounded-full border-2 cursor-pointer text-yellow-400 hover:text-white active:scale-95 p-2"
              >
                <FaUserAlt className="text-lg mg:text-xl" />
              </button>
            </div>
          ) : (
            <ul className="lg:flex hidden gap-7 cursor-pointer active:scale-95 font-semibold text-yellow-400">
              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                <Link to="/login" className="flex">
                  <FaUser className="mt-1 me-0.5" size={14} />
                  Admin
                </Link>
              </li>
              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                <Link to="/user/food-menu">Menu</Link>
              </li>

              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                <Link to="/user-register">Register</Link>
              </li>
              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                <Link to="/user-login">Login</Link>
              </li>
              <li className="hover:relative bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                <Link to="/faq">FAQ?</Link>
              </li>
            </ul>
          )}
        </div>
      </header>

      {profileBarOpen && (
        <div
          ref={profileBarRef}
          className={`border border-t-0 bg-black font-semibold rounded-b-xl p-4 absolute ${sidebarOpen && isOpen ? "hidden" : "block"} right-0`}
        >
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

      {sidebarOpen && isOpen ? (
        // left side bar section
        <section className="grid grid-cols-2 border-e h-screen w-full">
          <div
            ref={parentSideBarRef}
            className="h-screen  p-5 bg-transparent-50 max-w-60 md:min-w-80 text-yellow-400 font-bold"
          >
            {username ? (
              <ul
                className="lg:flex  flex-col font-semibold text-yellow-400 me-3 "
                ref={childSideBarRef}
              >
                <li className="hover:relative mb-1 sidebar_element bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link className="flex sidebar_element" to="/">
                    Home
                  </Link>
                </li>

                <li className="hover:relative mb-1 sidebar_element bottom-0.5 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food-menu/">Menu</Link>
                </li>
                <li className="hover:relative bottom-0.5 mb-1 sidebar_element cursor-pointer active:scale-95 hover:text-white ">
                  <Link to="/user/orders/order-lists">My Orders</Link>
                </li>

                <li className="hover:relative bottom-0.5 mb-1 sidebar_element cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food/wishlist" className="flex">
                    Wishlist
                    <TiHeart size={23} className="ms-1" />
                  </Link>
                </li>

                <li className="hover:relative bottom-0.5 mb-1 sidebar_element cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user/food/cart" className="flex">
                    Cart
                    <MdOutlineShoppingCart size={23} className="ms-1" />
                  </Link>
                </li>
              </ul>
            ) : (
              <ul
                ref={childSideBarRef}
                className="lg:flex flex-col gap-7 cursor-pointer active:scale-95 font-semibold text-yellow-400"
              >
                <li className="hover:relative bottom-0.5 mb-1 sidebar_element cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/login" className="flex">
                    <FaUser className="mt-1 me-0.5" size={14} />
                    Admin
                  </Link>
                </li>
                <li className="hover:relative bottom-0.5 mb-1 sidebar_element cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/login">Menu</Link>
                </li>

                <li className="hover:relative bottom-0.5 sidebar_element mb-1 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user-register">Register</Link>
                </li>
                <li className="hover:relative bottom-0.5 sidebar_element mb-1 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user-login">Login</Link>
                </li>
                <li className="hover:relative bottom-0.5 sidebar_element mb-1 cursor-pointer active:scale-95 hover:text-white">
                  <Link to="/user-login">FAQ?</Link>
                </li>
              </ul>
            )}
          </div>
          <button onClick={onclose} className="h-screen"></button>
        </section>
      ) : (
        <section className="lg:min-h-110">{children}</section>
      )}
      {/* footer section */}
      <footer className="bg-gray-800 text-white pt-8 w-full">
        <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">About Us</h3>
            <p>
              Delicious meals delivered to your door. Fresh ingredients, best
              taste.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            {userId && (<>
                        <ul>
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/user/food-menu/" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="/user/food-menu/" className="hover:underline">
                  Order Now
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
</>)}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#">
                <FaInstagram className="" />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Contact Us</h3>
            <p className="truncate">Email: foodbaekitchen@gmail.com</p>
            <p>Phone: +91 7327881904</p>
            <p>Address: Shastri Nagar, Nayapalli, Bhubaneswar, Odisha 752036</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          <p>© 2024 Foodies Delight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Userlayout;
