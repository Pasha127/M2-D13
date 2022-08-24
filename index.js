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
loadDefaultBooks();