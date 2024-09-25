import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContainer } from "./Context/CartContext";
import { ProductContainer } from "./Context/ProductContext";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CheckOut from "./pages/Checkout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartContainer>
          <ProductContainer>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
            <Footer />
          </ProductContainer>
        </CartContainer>
      </BrowserRouter>
    </>
  );
}
