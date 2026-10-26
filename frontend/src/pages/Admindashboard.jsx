import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import { Link } from "react-router-dom";
import Adminlayout from "../components/Adminlayout";

const Admindashboard = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    total_new_order: 0,
    total_orders: 0,
    total_not_confirmed: 0,
    total_confirmed: 0,
    total_preparing: 0,
    total_pick_up: 0,
    total_delivered: 0,
    total_cancelled: 0,
    today_sales: 0,
    week_sales: 0,
    month_sales: 0,
    year_sales: 0,
    total_sales: 0,
    total_users: 0,
    total_categories: 0,
    total_foods: 0,
  });

  //To implement sidemenu toggle function for responsive

  useEffect(() => {
    const syncSidebar = () => setSidebarOpen(window.innerWidth >= 768);
    syncSidebar();
    window.addEventListener("resize", syncSidebar);
    return () => window.removeEventListener("resize", syncSidebar);
  }, []);

  useEffect(()=>{
    fetch(`${BASE_URL}/api/admin/admin_dashboard_details/`)
    .then((res)=>res.json())
    .then((data)=>{
      setDashboardData({
        ...dashboardData,
            total_new_order: data.total_new_order,
    total_orders: data.total_orders,
    total_not_confirmed: data.total_not_confirmed,
    total_confirmed: data.total_confirmed,
    total_preparing: data.total_preparing,
    total_pick_up: data.total_pick_up,
    total_delivered: data.total_delivered,
    total_cancelled: data.total_cancelled,
    today_sales: data.today_sales,
    week_sales: data.week_sales,
    month_sales: data.month_sales,
    year_sales: data.year_sales,
    total_sales: data.total_sales,
    total_users: data.total_users,
    total_categories: data.total_categories,
    total_foods: data.total_foods,


      })
    })
  },[])

  const data = [
    {
      title_name: "Total Orders",
      title_quantity: dashboardData.total_orders,
      color: "blue",
      icon: "🛒",
      text_color: "white",
      link : "/admin/orders/all-orders"
    },
    {
      title_name: "New Orders",
      title_quantity: dashboardData.total_new_order,
      color: "limegreen",
      icon: "✨",
      text_color: "black",
            link : "/admin/orders/not-confirmed"

    },
    {
      title_name: "Total Categories",
      title_quantity: dashboardData.total_categories,
      color: "gray",
      icon: "📂",
      text_color: "white",
            link : "/managecategory"

    },
    {
      title_name: "Total Food Items",
      title_quantity: dashboardData.total_foods,
      color: "darkslategray",
      icon: "🍲",
      text_color: "white",
            link : "/manage-food-items"

    },
    {
      title_name: "Confirmed",
      title_quantity: dashboardData.total_confirmed,
      color: "green",
      icon: "✅",
      text_color: "white",
            link : "/admin/orders/confirmed"

    },
    {
      title_name: "Not Confirmed",
      title_quantity: dashboardData.total_not_confirmed,
      color: "orange",
      icon: "⚠️",
      text_color: "black",
            link : "/admin/orders/not-confirmed"

    },
    {
      title_name: "Pick Up",
      title_quantity: dashboardData.total_pick_up,
      color: "dodgerblue",
      icon: "📦",
      text_color: "white",
            link : "/admin/orders/pick-up"

    },
    {
      title_name: "Preparing",
      title_quantity: dashboardData.total_preparing,
      color: "goldenrod",
      icon: "👨‍🍳",
      text_color: "black",
            link : "/admin/orders/order-on-preparing"

    },
    {
      title_name: "Delivered",
      title_quantity: dashboardData.total_delivered,
      color: "seagreen",
      icon: "🚚",
      text_color: "white",
            link : "/admin/orders/delivered"

    },
    {
      title_name: "Cancelled",
      title_quantity: dashboardData.total_cancelled,
      color: "crimson",
      icon: "❌",
      text_color: "white",
            link : "/admin/orders/cancelled"

    },
    {
      title_name: "Total Users",
      title_quantity: dashboardData.total_users,
      color: "purple",
      icon: "👤",
      text_color: "white",
            link : "/admin/all-register-users"

    },
    {
      title_name: "Today Sales",
      title_quantity: dashboardData.today_sales,
      color: "teal",
      icon: "💰",
      text_color: "white",
            link : "#"

    },
    {
      title_name: "Week Sales",
      title_quantity: dashboardData.week_sales,
      color: "mediumseagreen",
      icon: "📈",
      text_color: "white",
            link : "#"

    },
    {
      title_name: "Month Sales",
      title_quantity: dashboardData.month_sales,
      color: "royalblue",
      icon: "📊",
      text_color: "white",
            link : "#"

    },
    {
      title_name: "Year Sales",
      title_quantity: dashboardData.year_sales,
      color: "darkorchid",
      icon: "📅",
      text_color: "white",
            link : "#"

    },
    {
      title_name: "Total Sales",
      title_quantity: dashboardData.total_sales,
      color: "darkgreen",
      icon: "💵",
      text_color: "white",
            link : "#"

    },
  ];
  ``;
  return (
    <Adminlayout>
      <div className="mb-20  flex flex-col lg:py-7 py-4 px-8 md:px-10">
        <div className="flex lg:text-3xl lg:py-4 text-yellow-400">
          <h1 className="font-bold py-2 md:py-4 lg:ms-5 lg:pt-0 text-xl md:text-2xl lg:text-3xl"># DASHBOARD </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3  md:gap-2 lg:min-w-320 md:min-w-2xl text-gray-200">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                style={{ backgroundColor: item.color, color: item.text_color }}
                className="border cursor-pointer active:scale-95' rounded-xl p-3"
              >
                <Link to={item.link}>
                                <h1 className="font-bold lg:text-xl">{item.title_name}</h1>
                <div className="flex justify-between items-center">
                  <p className="lg:py-5 text-2xl px-5">{item.title_quantity}</p>
                  <p className="text-4xl">{item.icon}</p>
                </div>
</Link>
              </div>
            );
          })}
        </div>
      </div>
    </Adminlayout>
  );
};

export default Admindashboard;
