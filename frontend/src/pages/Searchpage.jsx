import React, { useState, useEffect } from "react";

import Userlayout from "../components/Userlayout";
import Foodcard from "../components/Foodcard";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const Searchpage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();


  const query = new URLSearchParams(useLocation().search).get("q");

  // fetching searching data related... food items...
  useEffect(() => {
    if (query) {
      fetch(`${BASE_URL}/api/search-foods/?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
        });
    }
  }, [query]);

  return (
    <Userlayout>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex m-4 cursor-pointer active:scale-95 font-semibold"
      >
        <MdKeyboardBackspace className="m-1" size={18} />
        Back
      </button>

      <div className="min-h-100 ">
        {foods.length === 0 ? (
            // if search related food not matching...
          <p className="text-red-600 font-bold text-center pt-10 text-2xl">
            No Such Food Found !
          </p>
        ) : (
          <div className="p-1 ps-1 md:p-5 w-full grid grid-cols-2 gap-1 lg:grid-cols-5 md:grid-cols-4">
            {/* mapping method -- show all search realted food items... */}
            {foods.map((items) => {
              return <Foodcard key={items.id} item={items} />;
            })}
          </div>
        )}
      </div>
    </Userlayout>
  );
};

export default Searchpage;
