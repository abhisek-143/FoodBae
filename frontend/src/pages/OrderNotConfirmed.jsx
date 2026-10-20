import React, { useEffect, useState } from "react";
import Adminlayout from "../components/Adminlayout";
import { LuFolderPlus, LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const OrderNotConfirmed = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  //to handle sidebar open and close option...
  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

    useEffect(() => {
      fetch(`${BASE_URL}/api/admin/orders/not_confirmed/`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setAllOrders(data);
        }).finally(()=>{
            setLoading(false)
        })
    }, []);

  const searchInputHandler = (s) => {
    const keyword = s.toLowerCase();
    if (!keyword) {
        setAllOrders(orders)
    }
    const filtered = orders.filter((orders) =>
      orders.order_number.toLowerCase().includes(keyword),
    
    );
    setAllOrders(filtered)
  };
            console.log(allOrders)


  return (
    <>
    {loading ? (
        <div className="flex justify-center items-center">
            <p>Loading...</p>
        </div>
    ) : (
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
              
      <main className="text-xs md:text-sm p-2 md:p-8 lg:p-15 mb-20">
        <div className="md:min-w-174 lg:min-w-300 rounded-xl flex flex-col">
          <div className="flex text-lg lg:text-3xl p-2 text-yellow-400">
            <h1 className="font-bold pt-1 lg:pt-0 text-3xl">
              Details Of Orders - Not Confirmed 
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  p-2 mb-6 items-center">
            <input
              type="text"
              onChange={(e) => searchInputHandler(e.target.value)}
              className="border rounded-xl lg:min-w-120 px-4 py-2"
              placeholder="Search"
            />
            <h3 className="text-sm lg:text-lg font-bold flex lg:justify-center lg:ps-10 justify-end py-4 lg:py-5 pe-2">
              <LuFolderPlus className="lg:pt-1 pe-1" size={20} />
              Total Orders -{" "}
              <span className="font-bold border rounded px-2 ms-2 text-yellow-400">
                {allOrders.length}
              </span>
            </h3>
          </div>
                        <table>
                <thead className="lg:text-xl md:text-sm text-xs">
                  <tr>
                    <th className="pb-2">Sl No</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Order Number</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="md:text-sm lg:text-lg">
                  {allOrders.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center lg:pt-4 pb-4">{index + 1}</td>
                      <td className="text-center lg:pt-4 pb-4">
                        {" "}
                        {new Date(item.created_at).toLocaleDateString("en-in")}
                      </td>
                      <td className="text-center pb-4 lg:pt-4">{item.order_number}</td>
                      <td className="flex justify-center pb-4 lg:pt-6 items-center">
                        <button                         onClick={() => {
                          navigate(`/admin/orders/view-order-details/${item.id}`);
                        }}
 className="px-2 py-1 shadow-sm lg:px-4 lg:mt-2 lg:py-1.5 shadow-amber-50 lg:text-sm rounded-xl bg-red-600 text-white flex text-xs active:scale-95 cursor-pointer">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


        </div>
      </main>
    </Adminlayout>

    )}
    
    
    </>
  );
};

export default OrderNotConfirmed;
