const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookYearPublished = document.querySelector("#year_published");
const bookRead = document.querySelector("#read_status");
const addBookButton = document.querySelector("#add_book");
const displayCase = document.querySelector(".display-case");

const myLibrary = [];

function Book(title, author, yearPublished, read) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.id = crypto.randomUUID();
    this.read = read;
    this.readToggle = function(){
        if(this.read === false){
            this.read = true;
        } else if(this.read === true){
            this.read = false;
        };
    };
};

addBookButton.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookYearPublished.value, bookRead.checked);
    myLibrary.push(newBook);

    const currentBook = newBook;

    const child = displayCase.appendChild(document.createElement("div"));
    child.id = currentBook.id;

    const title = child.appendChild(document.createElement("p"));
    title.textContent = `Title: ${currentBook.title}`;
    const author = child.appendChild(document.createElement("p"));
    author.textContent = ` Author: ${currentBook.author}`;
    const yearPublished = child.appendChild(document.createElement("p"));
    yearPublished.textContent = `Year Published: ${currentBook.yearPublished}`;

    const removeButton = child.appendChild(document.createElement("button"));
    removeButton.textContent = 'x';
    removeButton.addEventListener("click", (e) => { 
        child.remove();
        for(let i=0;i<myLibrary.length;i++){
            if(myLibrary[i].id == child.id){
                myLibrary.splice(i, 1);
                break;
            }
        }
    });

    const toggleButton = child.appendChild(document.createElement("button"));
    if(currentBook.read === true){
        toggleButton.textContent = "Read";
    } else {
        toggleButton.textContent = "Haven't read";
    }
    toggleButton.addEventListener("click", (e) => {
        currentBook.readToggle();
        currentBook.read === true ? toggleButton.textContent = "Read" : toggleButton.textContent = "Haven't Read";
    });
};