import React, { useEffect, useRef, useState } from "react";
import Userlayout from "../components/Userlayout";
import { FaSearch } from "react-icons/fa";
import "./home.css";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import Foodcard from "../components/Foodcard";
import { IoFastFood } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);


const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [foods, setFoods] = useState([]);
  const burgerRef = useRef(null);
  const topFoodRef = useRef(null);

  //Top rated food of the week ....fetching data
  useEffect(() => {
    fetch(`${BASE_URL}/api/user/top-rated-foods/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      });
  }, []);

  //gsap animation
  useGSAP(() => {
    const t1 = gsap.timeline({
      repeat: -1,
    });
    //burger image animation
    t1.to(burgerRef.current, {
      rotate: -360,
      duration: 5,
      x: 90,
      scale: 0.5,
      delay: 0.2,
    });
    t1.to(burgerRef.current, {
      rotate: 360,
      duration: 5,
      x: 0,
      scale: 1,
    });

  }, []);

  return (
    <Userlayout>
      <main className="min-h-screen">
        {/* section 1 ...implementing search food   */}
        <section className="grid md:grid-cols-2 grid-cols-1 lg:ps-30 md:max-h-110 w-full items-center ps-3 pt-10 md:pt-3 md:p-20 md:ps-10">
          <div className="md:mt-40 ">
            <div className="h-60 md:h-100">
              <span className="text-md italic typing flex text-yellow-400 font-bold">
                Welcome to FOODBAE
                <BsEmojiSmileUpsideDown size={20} className="ms-2 mt-1" />
              </span>

              <span className="lg:text-3xl text-md italic text-yellow-400 font-bold">
                Discover Restaurants That Deliver Near You
              </span>
              <p className="text-gray-400 typing italic font-bold">
                it's not just Food, it's an Experience !
              </p>

              <form
                method="GET"
                action="/search-food-item"
                className="flex gap-0.5 items-start mx-2 me-5"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="search your tasty item here..."
                  className="px-4 py-2 bg-black border-white rounded-e-sm border mt-20 w-full md:w-[80%] rounded-xl cursor-pointer text-white shadow-2xl shadow-amber-50"
                />
                <button
                  type="submit"
                  className="rounded-xl rounded-s-sm px-4 py-2 bg-gray-300 mt-20 h-10 hover:bg-yellow-400 font-bold cursor-pointer"
                >
                  <FaSearch size={20} className="hover:bg-yellow-400" />
                </button>
              </form>
            </div>
          </div>

          <div className=" h-60 md:h-100 lg:ps-25 ps-15 md:ps-22">
            <img
              ref={burgerRef}
              src="/burger3.png"
              className=" bg-cover bg-center object-cover md:h-65 lg:h-100 md:mt-10 h-full"
              alt="food image"
            />
          </div>
        </section>

        {/* section 2 ... implementing restaurant's details */}
        <section className="bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full p-4 md:p-15 md:mt-10 md:h-130 text-gray-300 lg:p-40 ">
            <div className="">
              <p className="">
                Welcome to {""}
                <span className=" text-red-600">FOODBAE</span> — where every
                bite tells a story! We bring you mouth‑watering dishes crafted
                with love, fresh ingredients, and authentic flavors.
              </p>

              <p className="text-sm mt-4">
                Whether you crave spicy Indian curries, cheesy pizzas, or
                sizzling street food, we’ve got something to satisfy every
                craving. Taste happiness today!
              </p>
              <p className="">
                At FOODBAE, we believe food is more than just a meal — it’s an
                experience. Our chefs blend tradition and creativity to serve
                dishes that delight your senses.
              </p>

              <p className=" mt-4">
                Don’t miss our seasonal delights and exclusive combos designed
                to make your dining experience unforgettable.
              </p>
              <p className="">
                Good food brings people together. At FOODBAE Haven, we’re proud
                to serve happiness one plate at a time. Order now and let your
                taste buds celebrate!
              </p>
            </div>
            <div className="ps-10 lg:ps-20">
              <img
                src="/waiter3.png"
                alt="waiter image"
                className="bg-cover bg-center hidden md:block h-80 md:h-90"
              />
            </div>
          </div>
        </section>
        {/* section 3... implementing top rated foods of the week... */}
        <section className="bg-black text-white grid grid-cols-1 mt-20 md:m-4 ms-2">
          <div className=" font-bold bg-red-600 w-full text-xl lg:text-3xl py-4 ">
            <div
              ref={topFoodRef}
              className="flex overflow-clip justify-center items-center"
            >
              <p>TOP RATED FOODS OF THE MONTH</p>
            </div>
            {/* <IoFastFood size={18} lg:size={27} className="m-1 mt-1" /> */}
          </div>
          <div className="bg-black md:p-5 w-full grid grid-cols-2 gap-2 lg:grid-cols-5 md:grid-cols-3 ">
            {foods?.map((items) => {
              return <Foodcard key={items.id} item={items} />;
            })}
          </div>
        </section>
      </main>
    </Userlayout>
  );
};

export default Home;
