const cardsContainer = document.getElementById("cards-container");
const searchinput = document.getElementById("news-input");
const searchbtn = document.getElementById("search-button");
console.log(searchinput);
function reload(){
    window.location.reload();
}

const API_KEY = "11bd560fd96041cba5778e0a121b50e1";

window.addEventListener("load", () => fetchNews("Canada"));

async function fetchNews(query) {
  // e.preventDefault();
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  // console.log(response);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  let html = "";
  articles.map((article) => {
    if (!article.urlToImage) return;
    html += ` <div class="card">
        <div class="card-header">
            <img src=${article.urlToImage} alt="" id="news-img">
        </div>
        <div class="card-content">
            <h3 id="news-title">${article.title}</h3>
            <h6 class="news-source" id="news-source">${
              article.source.name
            } ⏳  ${new Date(article.publishedAt).toLocaleString()}</h6>
            <p class="news-desc" id="news-desc">${article.description}</p>
        </div>
    </div>`;
    // cardsContainer.innerHTML = html;
    // cardsContainer.firstElementChild.addEventListener("click", () => {
    //   window.open(article.url, "_blank");
    // });
  });
    cardsContainer.innerHTML = html;
    const cardElements = cardsContainer.querySelectorAll(".card");
  cardElements.forEach((cardElement, index) => {
    cardElement.addEventListener("click", () => {
      window.open(articles[index].url, "_blank");
    });
  });

}
let curretSelectNav = null;

function NavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curretSelectNav?.classList.remove("active");
  curretSelectNav = navItem;
  curretSelectNav.classList.add("active");
}
searchbtn.addEventListener("click", () => {
  const query = searchinput.value;
  if (!query) return;
  fetchNews(query);
  curretSelectNav.classList.remove("active");
  curretSelectNav = null;
});
