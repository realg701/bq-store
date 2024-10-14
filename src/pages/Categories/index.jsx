import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { initialScrollTo } from "../../constants";
import BreadCrumbs from "../../components/Breadcrumbs";
import { BE_URL } from "../../constants/url";
import Loader from "../../components/Loader";
import LoaderContext from "../../Context/LoaderContext";
import "./category.css";

export default function Categories() {
  // Product Context to set to all fetched products
  const productContext = React.useContext(ProductContext);
  const { allProducts, setProductsGlobally } = productContext;
  // Loading Context to display loader while loading is true
  const [isLoading, setIsLoading] = React.useState(false);
  // Gettiing all products categories
  const productsCategories = _.uniq(_.map(allProducts, "category"));

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(`${BE_URL}/products/all`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setProductsGlobally(data.products);
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

  if (isLoading) return <Loader />;

  return (
    <>
      <BreadCrumbs pages={"categories"} />
      <div className="category-container">
        <h1 style={{ textAlign: "center" }}>Categories</h1>
        <div className="container">
          {productsCategories.map((category, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
