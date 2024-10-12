import { Link } from "react-router-dom";
import * as Material from "@mui/material";
import { capitalized } from "../constants";

const BreadCrumbs = ({ pages, title }) => {
  let val = "";

  return (
    <Material.Breadcrumbs
      aria-label="breadcrumb"
      style={{ marginTop: 90, paddingInline: 20 }}
    >
      <Link to={"/"}>Home</Link>
      {pages &&
        pages.split("/")?.map((page, i, array) => {
          val += "/" + array[i];
          return (
            <Link to={val.toLowerCase()} key={i}>
              {capitalized(page)}
            </Link>
          );
        })}
      {title && <Link className="breadcrumbs_title">{capitalized(title)}</Link>}
    </Material.Breadcrumbs>
  );
};

export default BreadCrumbs;
