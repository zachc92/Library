class Book {
    constructor(title, author, yearPublished, read) {
        this.title = title;
        this.author = author;
        this.yearPublished = yearPublished;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    readToggle() {
        this.read = !this.read;
    }
};

class Library {
    constructor(library) {
        this.library = [];
    }
}

const eventListeners = (() => {
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookYearPublished = document.querySelector("#year_published");
    const bookRead = document.querySelector("#read_status");
    const addBookButton = document.querySelector("#add_book");
    const displayCase = document.querySelector(".display-case");

    addBookButton.addEventListener("click", () => {
        controller.addBookToLibrary(bookTitle.value, bookAuthor.value, bookYearPublished.value, bookRead.checked);
    });

    const renderNewBook = (book) => {
        const child = displayCase.appendChild(document.createElement("div"));
        child.id = book.id;

        const title = child.appendChild(document.createElement("p"));
        title.textContent = `Title: ${book.title}`;
        const author = child.appendChild(document.createElement("p"));
        author.textContent = ` Author: ${book.author}`;
        const yearPublished = child.appendChild(document.createElement("p"));
        yearPublished.textContent = `Year Published: ${book.yearPublished}`;

        const removeButton = child.appendChild(document.createElement("button"));
        removeButton.textContent = 'x';
        removeButton.addEventListener("click", () => { 
            child.remove();
            controller.removeFromLibrary(child.id);
        });

        const toggleButton = child.appendChild(document.createElement("button"));
        book.read === true ? toggleButton.textContent = "Read" : toggleButton.textContent = "Haven't Read";
        toggleButton.addEventListener("click", () => {
            book.readToggle();
            book.read === true ? toggleButton.textContent = "Read" : toggleButton.textContent = "Haven't Read";
        });
    };

    return { renderNewBook };

})();

const controller = (() => {
    const myLibrary = new Library();
    
    const addBookToLibrary = (title, author, yearPublished, bookRead) => {
        const newBook = new Book(title, author, yearPublished, bookRead);
        myLibrary.library.push(newBook);
        eventListeners.renderNewBook(newBook);
    }

    const removeFromLibrary = (id) => {
        const index = myLibrary.library.findIndex(book => book.id === id);
        if (index !== -1){
            myLibrary.library.splice(index, 1);
        }
    }

    const showLibrary = () => { console.log(myLibrary) };

    return { addBookToLibrary, showLibrary, removeFromLibrary };

})();