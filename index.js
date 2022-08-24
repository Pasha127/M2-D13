const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const cardZone = document.querySelector("div.album.py-5.bg-light");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal div.modal-body .row");
const cardContainerRow = cardZone.querySelector("div.row");
const viewCartButton = document.querySelector("#viewCartButton");
let query = searchField.value;
let searchResultArr = []; 
let cartArr = [];
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

const showCart = () => {
    
    modal.querySelector("div.modal-header").innerText  = `Your Cart has ${cartArr.length} items`;
    for(card of modalBody.querySelectorAll("*")){
        card.remove();
    }
    makeCards(modalBody, cartArr);    
}

const changeDisplayed = () => {
    searchResultArr = [];
    query = searchField.value;
    if(query.length >=3){
        for(card of document.querySelectorAll(".col-md-4")){
            card.remove();
        };
        
        for(let i=0; i<catalog.length; i++){
            //console.log(catalog[i].title.toLowerCase().includes(query.toLowerCase()));
            if(catalog[i].title.toLowerCase().includes(query.toLowerCase())){
                searchResultArr.push(catalog[i]);
                
            }
        }
        console.log(searchResultArr);
        makeCards(cardContainerRow, searchResultArr);
    }
}
const resetBoard = () => {
    searchField.value = "";
    for(card of document.querySelectorAll(".col-md-4")){
        card.remove();
    };
    makeCards(cardContainerRow, catalog);
}

const addToCart = (e) => {    
    const addedBook = catalog.filter(element => element.title === e.target.closest(".card").querySelector(".card-text").innerText);
    cartArr.push(addedBook[0]);
    
}

const makeCards = (where, array1) => {
    array1.forEach(element => {
        console.log(element);
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
        class="btn btn-sm btn-outline-secondary skipBtn"
        >
        Skip
        </button>
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary addCart"
        >
        Add to Cart
        </button>
        </div>
       
        </div>
        </div>
        </div>
        </div>`
        where.append(newCard);
    });
    const cartBtns = document.querySelectorAll(".addCart");
    cartBtns.forEach(btn => btn.addEventListener("click", addToCart));
}

window.onload = () => {
    loadDefaultBooks();    
    searchField.addEventListener("keydown", changeDisplayed)
    searchButton.addEventListener("click", resetBoard);
    viewCartButton.addEventListener("click", showCart);
    
    
};