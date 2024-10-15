import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContainer } from "./Context/CartContext";
import { ProductContainer } from "./Context/ProductContext";
import { LoaderContainer } from "./Context/LoaderContext";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Home from "./pages/Home";
const Categories = lazy(() => import("./pages/Categories"));
const Category = lazy(() => import("./pages/Categories/Category"));
const Product = lazy(() => import("./pages/Product"));
import CheckOut from "./pages/CheckOut";
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const My404 = lazy(() => import("./components/My404"));
import Footer from "./components/Footer";
// import NetworkStatusProvider from "./components/NetworkStatusProvider";
import "./App.css";

export default function App() {
  const fallback = <Loader />;

  return (
    // <NetworkStatusProvider>
    <BrowserRouter>
      <LoaderContainer>
        <CartContainer>
          <ProductContainer>
            <Header />
            <Suspense fallback={fallback}>
              <Routes>
                <Route path="*" exact element={<My404 />} />
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<Category />} />
                <Route path="/categories/:category/:id" element={<Product />} />
                <Route path="/products/addproduct" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Suspense>
            <Footer />
          </ProductContainer>
        </CartContainer>
      </LoaderContainer>
    </BrowserRouter>
    // </NetworkStatusProvider>
  );
}
