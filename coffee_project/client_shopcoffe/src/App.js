import "./App.css";
import Layout from "./components/layout/Layout.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/login_page/LoginPage.js";
import RegisterPage from "./pages/register_page/RegisterPage";
import About from "./pages/about/About.js";
import Blog from "./pages/tintuc/Blog.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/product/Product";
import LienHe from "./pages/contact/LienHe";
import BlogDetail from "./pages/tintuc/BlogDetail";
import ProductDetail from "./pages/product/ProductDetail";
import Cart from "./pages/cart/Cart";
import { useEffect } from "react";
import { getCartFromLS, setCartFromLS } from "./utils/utils";
import { Payment } from "./pages/payment/Payment";
import { OrderPayment } from "./pages/order/OrderPayment";
import { OrderHistory } from "./pages/order/OrderHistory";
import { Profile } from "./pages/profile/Profile";

function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cart = getCartFromLS() || [];
  useEffect(() => {
    setCartFromLS(cart);
  }, [cart]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<Layout Component={Product} />} />
        <Route
          path="/product/:slug"
          element={<Layout Component={ProductDetail} />}
        />
        <Route path="/blog" element={<Layout Component={Blog} />} />
        <Route path="/blog/:slug" element={<Layout Component={BlogDetail} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<Layout Component={About} />} />
        <Route path="/cart" element={<Layout Component={Cart} />} />
        <Route path="/payment" element={<Layout Component={Payment} />} />
        <Route
          path="/order-payment"
          element={<Layout Component={OrderPayment} />}
        />
        <Route
          path="/order-history"
          element={<Layout Component={OrderHistory} />}
        />
        <Route path="/profile" element={<Layout Component={Profile} />} />
        <Route path="/contact" element={<Layout Component={LienHe} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
