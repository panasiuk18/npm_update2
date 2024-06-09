import { log } from "handlebars";
import "../../style/css/common.css";
import "../../style/css/main.css";
import "../../utils/add_header.js";

import NewsApiService from "../../utils/news-service.js";
import LoadMoreBtn from "../../utils/load_more_btn.js";
import articlesTpl from "../../templates/news_cart.hbs";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  articlesContainer: document.querySelector(".js-articles-container"),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hiden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.target.elements.query.value;
  console.log(newsApiService.searchQuery);
  if (newsApiService.query === "") {
    return alert("введіть свій запит");
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then((articles) => {
    refs.articlesContainer.insertAdjacentHTML(
      "beforeend",
      articlesTpl(articles)
    );
  });
  loadMoreBtn.enable();
}

loadMoreBtn.refs.button.addEventListener("click", (e) => {
  // loadMoreBtn.disable();
  console.log("btn", e);
  setTimeout(fetchArticles(), 1500);
});

window.addEventListener("scroll", scrollHandler);

function scrollHandler(e) {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  if (scrollHeight - scrollTop - clientHeight < 100) {
    fetchArticles();
  }
}
