import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContainer } from "./Context/CartContext";
import { ProductContainer } from "./Context/ProductContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Category from "./pages/Category";
import CheckOut from "./pages/CheckOut";
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
import Footer from "./components/Footer";
import My404 from "./components/My404";
import { CircularProgress } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <CartContainer>
        <ProductContainer>
          <Header />
          <Suspense
            fallback={
              <div className="loading" style={{ marginTop: 300 }}>
                <CircularProgress color="secondary" />
              </div>
            }
          >
            <Routes>
              <Route path=":my404" exact={true} element={<My404 />} />
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/category/:category" element={<Category />} />
              {/* <Route path="/cart" element={<Cart />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addproduct" element={<AddProduct />} />
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
