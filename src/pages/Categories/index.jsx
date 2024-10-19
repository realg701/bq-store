import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { BE_URL } from "../../constants/url";
import { initialScrollTo } from "../../constants";
import BreadCrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/Loader";
import "./category.css";

export default function Categories() {
  // Product Context to set to all fetched products
  const productContext = React.useContext(ProductContext);
  const { allProducts, setProductsGlobally } = productContext;
  // Loading State to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);
  // Gettiing all products categories
  const productsCategories = _.uniq(_.map(allProducts, "category"));

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(`${BE_URL}/products/all`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setProductsGlobally(data.products.sort());
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") console.log("Cancelled!");
        else console.log(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    initialScrollTo(0);
  }, []);

  if (isLoading) return <Loader ring />;

  return (
    <>
      <BreadCrumbs pages={"categories"} />
      <div className="category-container">
        <h1 style={{ textAlign: "center" }}>Categories</h1>
        <div className="container">
          {productsCategories.length ? (
            productsCategories.sort().map((category, index) => (
              <div className="products-container" key={index}>
                <Link to={`/categories/${category.toLowerCase()}`}>
                  <div className="products-card">
                    <img
                      src={`/svgs/categories/${category
                        .split(" ")
                        .join("-")
                        .toLowerCase()}.svg`}
                      alt={category}
                      width={100}
                      height={100}
                    />
                    <p>{category}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Loader ring top={"100px"} />
          )}
        </div>
      </div>
    </>
  );
}
