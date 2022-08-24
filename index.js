const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const cardZone = document.querySelector("div.album.py-5.bg-light");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal div.modal-body .row");
const cardContainerRow = cardZone.querySelector("div.row");
let searchResultArr = []; 

let catalog = {};
const  loadDefaultBooks = async () => {
    try{
        const response = await fetch("https://striveschool-api.herokuapp.com/books");
        catalog = await response.json();
        makeCards(cardContainerRow, catalog);
        return catalog;
    }
    catch(err){console.log(err)};
    console.log(catalog);
};
const searchCatalog = () => {
    searchResultArr = [];
    const query = searchField.value;
    console.log(query);
    modal.querySelector("div.modal-header").innerText  = `Search: "${query}"`;
    //modal.querySelector(".modal-body img").setAttribute("src", catalog[0].img) ;
    for(let i=0; i<catalog.length; i++){
        //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
        if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
            searchResultArr.push(catalog[i]);
            
        }
    }
    console.log(searchResultArr);
    makeCards(modalBody, searchResultArr);


}

const makeCards = (where, array1) => {
    array1.forEach(element => {
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
        Add to Cart
        </button>
        </div>
        <small class="text-muted">9 mins</small>
        </div>
        </div>
        </div>
        </div>`
        where.append(newCard);
    });
}

window.onload = () => {
    loadDefaultBooks();    
    //searchField.addEventListener("click", searchCatalog)
    searchButton.addEventListener("click", searchCatalog);

  };