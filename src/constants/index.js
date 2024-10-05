import _ from "lodash";

export const initialScrollTo = (value) => {
  window.scrollTo({
    top: value,
    behavior: "smooth",
  });
};

export const capitalized = (value) =>
  value
    .split(" ")
    .map((str) => (str = str.charAt(0).toUpperCase() + str.slice(1)))
    .join(" ");

export const options = [
  {
    country: "pakistan",
    language: "en-IN",
    preset: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "PKR",
    },
  },
  {
    country: "india",
    language: "en-IN",
    preset: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    },
  },
];

export const findCountry = (country) =>
  _.find(options, (o) => o.country === country);
