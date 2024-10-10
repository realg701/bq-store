import { Link } from "react-router-dom";
import * as Material from "@mui/material";
import { capitalized } from "../constants";

const BreadCrumbs = ({ category, title, pages }) => {
  let val = "";
  return (
    <Material.Breadcrumbs
      aria-label="breadcrumb"
      style={{ marginTop: 90, paddingInline: 30 }}
    >
      <Link to={"/"}>Home</Link>
      {category && (
        <Link to={`/category/${category}`}>{capitalized(category)}</Link>
      )}
      {title && <Link>{title}</Link>}

      {pages &&
        pages?.split("/")?.map((page, i, array) => {
          val += "/" + array[i];
          return (
            <Link to={val} key={i}>
              {capitalized(page)}
            </Link>
          );
        })}
    </Material.Breadcrumbs>
  );
};

export default BreadCrumbs;
