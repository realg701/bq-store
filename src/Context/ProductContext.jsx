import { useState, createContext } from "react";

const ProductContext = createContext({});

export const ProductContainer = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const setProductsGlobally = (data) => {
    setAllProducts(data);
  };
  return (
    <ProductContext.Provider
      value={{ allProducts, setProductsGlobally, setAllProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContext;
