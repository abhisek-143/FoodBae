import React, { useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Adminlayout from "../components/Adminlayout";

import { useLocation, useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/order/search_order/?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [query]);

  return (
    <Adminlayout>
      <button
        onClick={() => {
          navigate("/admindashboard");
        }}
        className="flex m-4 cursor-pointer active:scale-95 font-semibold"
      >
        <MdKeyboardBackspace className="m-1" size={18} />
        Back
      </button>

      <div className=" mb-10 md:mb-20 px-5 md:px-10 ">
        <form action="/admin/orders/search-order" method="GET">
          <div className="flex lg:text-3xl p-2 text-yellow-400">
            <h1 className="font-bold pt-1 lg:pt-0 text-2xl lg:text-3xl">Search Order</h1>
          </div>
          <input
            type="text"
            name="q"
            placeholder="search by order number"
            className="px-4 py-2 bg-black border-white border mt-2 w-full min-w-87 md:min-w-165 lg:min-w-250 rounded-xl cursor-pointer text-white shadow-md shadow-amber-50"
          />
        </form>

        <>
          {order.length < 1 ? (
            // if search related order not matching...
            <p className="text-red-600 font-bold text-center pt-10 ">
              No Such Order Found !
            </p>
          ) : (
            <div className="w-full mt-8">
              <table className="w-full text-sm lg:text-lg">
                <thead className="">
                  <tr>
                    <th className="pb-2">Sl No</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Order Number</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="md:text-sm">
                  {order.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center lg:pt-4 pb-4">{index + 1}</td>
                      <td className="text-center lg:pt-4 pb-4">
                        {" "}
                        {new Date(item.created_at).toLocaleDateString("en-in")}
                      </td>
                      <td className="text-center pb-4 lg:pt-4">
                        {item.order_number}
                      </td>
                      <td className="flex justify-center pb-4 lg:pt-6 items-center">
                        <button
                          onClick={() => {
                            navigate(
                              `/admin/orders/view-order-details/${item.id}`,
                            );
                          }}
                          className="px-2 py-1 shadow-sm lg:px-4 lg:mt-2 lg:py-1.5 shadow-amber-50 lg:text-sm rounded-xl bg-red-600 text-white flex text-xs active:scale-95 cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      </div>
    </Adminlayout>
  );
};

export default SearchOrder;
