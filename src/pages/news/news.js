import "../../utils/add_header.js";
import "../../style/css/main.css";

import { api_options } from "../../utils/constants.js";
import newsTPL from "../../templates/news_cart.hbs";

const { url, key } = api_options.news;
const news_container = document.querySelector(".news_container");
const search = document.querySelector(".input-js");

search.addEventListener("change", (e) => {
  e.preventDefault();
  getData(e.target.value);
});

async function getData(query) {
  try {
    fetch(`${url}q=${query}&from=2024-05-09&sortBy=publishedAt&apiKey=${key}`)
      .then((response) => response.json())
      .then((news) => {
        // console.log(news.articles[2].title);
        const news_tpl = newsTPL(news.articles);
        news_container.innerHTML = news_tpl;
      });
  } catch (error) {
    console.error(error);
  }
}

getData("Ukraine");
