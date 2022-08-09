const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films")

// Loading all events

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    })
    secondCardBody.addEventListener("click", deleteFilm)
    clear.addEventListener("click", clearAllFilms)
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value

    if(title === "" || director === "" || url === ""){
        // Error
        UI.displayMessages("Tüm alanları doldurun...", "danger")
        isAlreadyExist ();
    }
    else {
        // Adding new film
        const newFilm = new Film (title, director, url);

        UI.addFilmToUI(newFilm); // Adding new film to UI
        Storage.addFilmToStorage(newFilm); // Adding new film to storage
        UI.displayMessages("Film başarıyla eklendi...", "success")
    }
    UI.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}
function deleteFilm (e){
    if (e.target.id === "delete-film") {
     if (confirm("Seçtiğiniz flmi silmek istediğinize emin misiniz?")){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessages("Silme işlemi başarılı", "success")
    }
}}
function clearAllFilms(){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}
