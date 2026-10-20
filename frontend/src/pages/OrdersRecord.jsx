import React, { useState, useEffect } from "react";
import Adminlayout from "../components/Adminlayout";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const OrdersRecord = () => {
  const username = localStorage.getItem("username");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tableDisplay, setTableDisplay] = useState(false);
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [formdata, setFormdata] = useState({
    from_date: "",
    to_date: "",
    order_status: "All",
  });

  //to handle sidebar open and close option...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    setLoading(false);
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username) {
      navigate("/user-login");
    }

    await fetch(`${BASE_URL}/api/admin/orders/from_to_order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_date: formdata.from_date,
        to_date: formdata.to_date,
        status: formdata.order_status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        setTableDisplay(true);
      })
      .catch((error) => {
        console.log("fetching error at order record !", error);
      })
      .finally(() => {});
  };
  console.log(allOrders);

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

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="">Loading...</p>
        </div>
      ) : (
        <div className="p-4 lg:p-10 w-full">
          <div className="flex text-lg lg:text-3xl py-4 text-yellow-400">
            <h1 className="font-bold pt-1 lg:pt-0 text-3xl">Order Records :</h1>
          </div>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-2 lg:min-w-330 lg:ms-15 md:ms-6 md:grid-cols-4 gap-2 text-gray-300"
          >
            <div className="flex flex-col">
              {" "}
              <label className="px-2 py-1 font-bold">From</label>
              <input
                type="date"
                onChange={changeHandler}
                name="from_date"
                required
                className="px-4 py-2 border rounded-xl bg-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label className="px-2 font-bold py-1">To</label>
              <input
                type="date"
                onChange={changeHandler}
                name="to_date"
                required
                className="px-4 py-2 border rounded-xl bg-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label className="px-2 py-1 font-bold">Status</label>

              <select
                name="order_status"
                onChange={changeHandler}
                className="border cursor-pointer min-w-full rounded-xl px-4 py-2 md:py-2.5 bg-gray-800"
              >
                {" "}
                <option value="All">All</option>
                <option value="Not_Confirmed">Not Confirmed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Pick_up">Pick Up</option>
                <option value="delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="md:px-4 md:py-2 px-6 py-1.5 cursor-pointer font-bold active:scale-95 mt-8 md:mt-8 bg-red-700 rounded-xl"
              >
                Search
              </button>
            </div>
          </form>
          {tableDisplay && (
            <div className="py-5">
              {allOrders.length > 0 ? (
                <table className="w-full md:mt-10">
                  <thead className="lg:text-xl md:text-sm ">
                    <tr>
                      <th className="pb-2">Sl No</th>
                      <th className="pb-2 ">Date</th>
                      <th className="pb-2">Order Number</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm lg:text-lg">
                    {allOrders.map((item, index) => (
                      <tr key={item.id}>
                        <td className="text-center lg:pt-4 pb-4">
                          {index + 1}
                        </td>
                        <td className="text-center lg:pt-4 pb-4">
                          {" "}
                          {new Date(item.created_at).toLocaleDateString(
                            "en-in",
                          )}
                        </td>
                        <td className="text-center pb-4 lg:pt-4">
                          {item.order_number}
                        </td>
                        <td className="flex justify-center pb-4 items-center">
                          <button
                            onClick={(e) => {
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
              ) : (
                <div className="flex mt-10 justify-center items-center">
                  <p className="font-semibold text-red-600">
                    No records found!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Adminlayout>
  );
};

export default OrdersRecord;
