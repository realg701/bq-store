import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { CartContainer } from "./Context/CartContext";
import { ProductContainer } from "./Context/ProductContext";
import Header from "./components/Header";
import Home from "./pages/Home";
const Category = lazy(() => import("./pages/Category"));
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
import My404 from "./components/My404";
import Footer from "./components/Footer";

const fallback = (
  <div className="loading" style={{ marginTop: 300 }}>
    <CircularProgress color="secondary" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <CartContainer>
        <ProductContainer>
          <Header />
          <Suspense fallback={fallback}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* 404 Page Route */}
              <Route path="*" exact={true} element={<My404 />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products/addproduct" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Suspense>
          <Footer />
        </ProductContainer>
      </CartContainer>
    </BrowserRouter>
  );
}
