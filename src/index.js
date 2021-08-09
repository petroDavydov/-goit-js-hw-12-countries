import refs from "./js/refs";
import fetchCountries from "./js/fetchCountries";

import countriesTamplate from "./templates/countriesTamlate.hbs";
import listTamplate from "./templates/oneCardTemplate.hbs";
// import { debounce } from "lodash.debounce";
var debounce = require("lodash.debounce");
import "@pnotify/core/dist/BrightTheme.css";
import { error } from "@pnotify/core";
import "./css/style.css";

// function upDateTamplate(data) {
//   const markUp = countriesTamplate(data);

//   if (data.length > 10) {
//     error({
//       text: "Too many matches found. Please enter a more specific query!",
//     });
//   } else if (data.status === 404) {
//     error({
//       text: "No country has been found. Please enter a more specific query!",
//     });
//   } else if (!data.length) {
//     error({
//       text: `Please enter a more specific query!`,
//       styling: "brighttheme",
//       delay: 500,
//     });
//     return;
//   } else if (data.length === 1) {
//     refs.ulList.insertAdjacentHTML("afterbegin", markUp);
//   }
// }

// // ---

refs.input.addEventListener("input", debounce(searchCountry, 500));

function searchCountry() {
  clearFeeld();

  const inputValue = refs.input.value;
  console.log(inputValue);
  if (inputValue) {
    fetchCountries(inputValue.trim())
      .then((data) => upDateTamplate(data))
      .catch((error) => console.log("error"));
  }
}

function upDateTamplate(data) {
  const markup = countriesTamplate(data);
  const markupUl = listTamplate(data);

  if (!data.length) {
    error({
      text: `Please enter a more specific query!`,
      styling: "brighttheme",
      delay: 500,
    });
    return;
  }

  if (data && data.length >= 5) {
    error({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      styling: "brighttheme",
      delay: 500,
    });
    return (refs.ulList.innerHTML = `<li>${country.name}</li>`);
  }
  if (data.length <= 10) {
    refs.ulList.insertAdjacentHTML("beforeend", markupUl);
  }
  if (data.length > 10) {
    error({
      text: `Please enter a more specific query !`,
      styling: "brighttheme",
      delay: 500,
    });
  }

  if (data.length === 1) {
    refs.ulList.innerHTML = "";
    refs.ulListCard.insertAdjacentHTML("beforeend", markup);
  }
}

function clearFeeld() {
  refs.ulListCard.innerHTML = "";
  refs.ulList.innerHTML = "";
}
