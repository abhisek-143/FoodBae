import React from "react";
import { Routes, Route } from "react-router-dom";
import Admindashboard from "./pages/Admindashboard.jsx";
import Login from "./pages/Login.jsx";
import Addcategory from "./pages/Addcategory.jsx";
import Managecategory from "./pages/Managecategory.jsx";
import Adminlayout from "./components/Adminlayout.jsx";
import Updatecategory from "./pages/Updatecategory.jsx";
import Addfooditem from "./pages/Addfooditem.jsx";
import Managefooditems from "./pages/Managefooditems.jsx";
import Home from "./pages/Home.jsx";
import Searchpage from "./pages/Searchpage.jsx";
import Userregister from "./pages/Userregister.jsx";
import Userlogin from "./pages/Userlogin.jsx";
import ViewProduct from "./pages/ViewProduct.jsx";
import Cart from "./pages/Cart.jsx";
import PaymentCheckout from "./pages/PaymentCheckout.jsx";
import Orderlist from "./pages/Orderlist.jsx";
import ViewOrderDetails from "./pages/ViewOrderDetails.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import OrderNotConfirmed from "./pages/OrderNotConfirmed.jsx";
import OrderConfirmed from "./pages/OrderConfirmed.jsx";
import OrderDelivered from "./pages/OrderDelivered.jsx";
import OrderPickUp from "./pages/OrderPickUp.jsx";
import OrderCancelled from "./pages/OrderCancelled.jsx";
import OrderPreparing from "./pages/OrderPreparing.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import OrdersRecord from "./pages/OrdersRecord.jsx";
import SearchOrder from "./pages/SearchOrder.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import RegisterAllUsers from "./pages/RegisterAllUsers.jsx";
import UpdateFoodItem from "./pages/UpdateFoodItem.jsx";
import UserWishlist from "./pages/UserWishlist.jsx";
import FoodMenu from "./pages/FoodMenu.jsx";

const App = () => {


  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/addcategory" element={<Addcategory />} />
        <Route path="/managecategory" element={<Managecategory />} />
        <Route path="/adminlayout/admindashboard" element={<Adminlayout />} />
        <Route
          path="/category/updatecategory/:id/"
          element={<Updatecategory />}
        />
        <Route path="/add-food-item" element={<Addfooditem />} />
        <Route path="/manage-food-items" element={<Managefooditems />} />
        <Route path="/search-food-item" element={<Searchpage />} />
        <Route path="/user-register" element={<Userregister />} />
        <Route path="/user-login" element={<Userlogin />} />
        <Route path="/user-viewproduct/:id" element={<ViewProduct />} />
        <Route path="/user/food/cart" element={<Cart />} />
        <Route
          path="/user/cart/checkout/:totalAmount"
          element={<PaymentCheckout />}
        />
        <Route path="/user/orders/order-lists" element={<Orderlist />} />
        <Route
          path="/user/orders/view-order-detail/:id"
          element={<ViewOrderDetails />}
        />
        <Route path="/user/orders/track-order/:id" element={<TrackOrder />} />
        <Route
          path="/admin/orders/not-confirmed"
          element={<OrderNotConfirmed />}
        />
        <Route path="/admin/orders/confirmed" element={<OrderConfirmed />} />
        <Route path="/admin/orders/delivered" element={<OrderDelivered />} />
        <Route path="/admin/orders/pick-up" element={<OrderPickUp />} />
        <Route path="/admin/orders/cancelled" element={<OrderCancelled />} />
        <Route
          path="/admin/orders/order-on-preparing"
          element={<OrderPreparing />}
        />
        <Route path="/admin/orders/all-orders" element={<AllOrders />} />
        <Route path="/admin/orders/order-records" element={<OrdersRecord />} />
        <Route path="/admin/orders/search-order" element={<SearchOrder />} />
        <Route
          path="/admin/orders/view-order-details/:id"
          element={<OrderDetails />}
        />
        <Route
          path="/admin/all-register-users"
          element={<RegisterAllUsers />}
        />
        <Route
          path="/admin/food/manage-food-item/:id"
          element={<UpdateFoodItem />}
        />
        <Route path="/user/food/wishlist" element={<UserWishlist />} />
        <Route path="/user/food-menu/" element={<FoodMenu />} />
      </Routes>
  );
};

export default App;
