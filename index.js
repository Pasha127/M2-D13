const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const modal = document.querySelector("#modal");
const cardZone = document.querySelector("div.album.py-5.bg-light");

let catalog = {};
const  loadDefaultBooks = async () => {
    try{
        const response = await fetch("https://striveschool-api.herokuapp.com/books");
        catalog = await response.json();
        return catalog;
    }
    catch(err){console.log(err)};
    console.log(catalog);
};
const searchCatalog = () => {
    const query = searchField.value;
    console.log(query);
    modal.querySelector("div.modal-header").innerText  = catalog[0].title;
    modal.querySelector(".modal-body img").setAttribute("src", catalog[0].img) ;
}

const makeCards = () => {
    catalog.forEach(element => {
        const newCard = document.createElement("div");
        
        newCard.innerHTML = `<div class="col-md-4">
        <div class="card mb-4 shadow-sm" style="width: 220px;">
        <img class="card-img-top"
        src="${element.img}">
        <div class="card-body">
        <p class="card-text">
        ${element.title}
        </p>
        <div
        class="d-flex justify-content-between align-items-center"
        >
        <div class="btn-group">
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        >
        View
        </button>
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        >
        Edit
        </button>
        </div>
        <small class="text-muted">9 mins</small>
        </div>
        </div>
        </div>
        </div>`
        cardZone.querySelector(".row").append(newCard);
    });
}

window.onload = () => {
    loadDefaultBooks();
    //searchField.addEventListener("click", searchCatalog)
    searchButton.addEventListener("click", searchCatalog);

  };