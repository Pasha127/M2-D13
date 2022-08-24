const searchField = document.querySelector("#searchField");
const searchButton = document.querySelector("#searchButton");
const modal = document.querySelector("#modal");


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
}
window.onload = () => {
    loadDefaultBooks();
    //searchField.addEventListener("click", searchCatalog)
    searchButton.addEventListener("click", searchCatalog);

  };