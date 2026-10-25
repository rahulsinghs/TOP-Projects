
//grap add button for book
const addBookBtn = document.querySelector('.add_book-btn');
// grab dialog 
const dialog = document.querySelector('.bookLibrary');
// grab close button in dialog form
const closeBtn = document.querySelector(".close-btn");


// dialog.showModal(); //in html <dialog open> does the almost same work, show the modal 
//difference is that opent in HTML renders the dialog into normal document flow without blocking the background
//remove open in <dialog open> after the styling is done
addBookBtn.addEventListener('click',()=>{
    dialog.showModal();
})

closeBtn.addEventListener("click",()=>{
    dialog.close();
})

let myLibrary = [];

const bookContainer = document.querySelector("#bookContainer"); // no need as of now as we are using UL

//main book grid
const bookGrid = document.querySelector(".book-grid");

function render_book() {
    if (bookGrid.hasChildNodes()){
        bookGrid.replaceChildren();
    }
    let b = myLibrary.forEach(book => {

        const bookList = document.createElement('li');
        bookList.classList.add('book-list');
        bookList.setAttribute("data-id",book.id);
        

        const bookCard = document.createElement('article');
        bookCard.classList.add('book-card');
        bookList.prepend(bookCard);

        const topAccent = document.createElement('div');
        topAccent.classList.add('card-top-accent');
        bookCard.prepend(topAccent);
        const header = document.createElement('header');
        header.classList.add('book-header');
        bookCard.append(header);

        //book header
        console.log(bookList);
        const bookTitle = document.createElement('h2');
        bookTitle.classList.add("book-title");
        bookTitle.innerText = book.title;
        header.prepend(bookTitle);

        //data list book details
        const bookDetails = document.createElement('dl');
        bookDetails.classList.add("book-details");
        bookCard.append(bookDetails);

        //author row
        const authorRow = document.createElement('div');
        authorRow.classList.add("card-row", "author-row");
        bookDetails.prepend(authorRow);

        const authorLabel = document.createElement("dt");
        authorLabel.classList.add("card-label");
        authorLabel.innerText = "Author:"
        authorRow.prepend(authorLabel)

        const authorBookHeader = document.createElement("dd");
        authorBookHeader.classList.add("book-author");
        authorBookHeader.innerText = book.author;
        authorRow.append(authorBookHeader);

        //publish year row
        const publishCardrow = document.createElement("div");
        publishCardrow.classList.add("card-row", "publishYear-row");
        bookDetails.append(publishCardrow);

        const publishYearCardLabel = document.createElement("dt");
        publishYearCardLabel.classList.add("card-label");
        publishYearCardLabel.innerText = "Publish Year:"
        publishCardrow.prepend(publishYearCardLabel);

        const publishYear = document.createElement("dd");
        publishYear.classList.add("publish-year");
        publishYear.innerText = book.publishYear;
        publishCardrow.append(publishYear);

        //total pages row
        const totalPagesRow = document.createElement("div");
        totalPagesRow.classList.add("card-row", "totalPages-row");
        bookDetails.append(totalPagesRow);

        const totalPageCardLabel = document.createElement("dt");
        totalPageCardLabel.classList.add("card-label");
        totalPageCardLabel.innerText = "Total Pages:"
        totalPagesRow.prepend(totalPageCardLabel);

        const totalPages = document.createElement("dd");
        totalPages.classList.add("card-value", "total-pages");
        totalPages.innerText = book.totalPages;
        totalPagesRow.append(totalPages);

        //status row
        const statusRow = document.createElement("div");
        statusRow.classList.add("card-row", "status-row");
        bookDetails.append(statusRow);

        const statusCardLabel = document.createElement("dt");
        statusCardLabel.classList.add("card-label");
        statusCardLabel.innerText = "Status:"
        statusRow.prepend(statusCardLabel);

        const status = document.createElement("dd");
        status.classList.add("card-value", "status");
        status.innerText = book.readStatus;
        statusRow.append(status);

        topAccent.classList.add("status-" + book.readStatus.split(" ").join(""));

        //footer 
        const footer = document.createElement("footer");
        footer.classList.add("card-btn");
        bookCard.append(footer);

        //footer buttons
        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.classList.add("btn-reset", "btn", "btn-toggle");
        toggleBtn.classList.add(`btn-${book.readStatus.split(" ").join("")}`);
        toggleBtn.innerText = "Toggle Status";
        footer.prepend(toggleBtn);

        toggleBtn.addEventListener("click",(e)=>{
            let card_status = status.innerText; //get card status
            
            let read_status_array = [ "Not Read", "Read", "Ongoing" ];
            let read_class_array = ["status-NotRead", "status-Read", "status-Ongoing"];
            let btn_class_array = ["btn-NotRead", "btn-Read", "btn-Ongoing"]
             
            let current_index = read_status_array.indexOf(card_status);
            //if current index is last move to start index or else go to next index;
            let moveNextIndx = current_index === read_status_array.length -1 ? 0 : current_index + 1;
            status.innerText = read_status_array[moveNextIndx];
            topAccent.classList.remove(...read_class_array);
            topAccent.classList.add(`${read_class_array[moveNextIndx]}`);
            toggleBtn.classList.replace(btn_class_array[current_index],btn_class_array[moveNextIndx]);
        

        })

        
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-reset", "btn", "btn-remove");
        removeBtn.innerText = "Remove";
        footer.append(removeBtn);
        
        removeBtn.addEventListener('click',(e) => {
            let selectBook = bookList.getAttribute("data-id");
            console.log(`book selected is ${selectBook}`);
            myLibrary = myLibrary.filter((book)=>{
                return book.id !== selectBook;
            });
            console.log(`now my library is ${myLibrary}`);
            e.target.closest(".book-list").remove();
            
        })
        
        //append the bookList to Grid
        bookGrid.append(bookList);

    });

}




function Book({bookAuthor,bookTitle,totalPages,publishYear,readStatus}) {
    //the constructor
    this.title = bookTitle ;
    this.author = bookAuthor || "unkown";
    this.totalPages = Number(totalPages) || "Not Known",
    this.publishYear = Number(publishYear) || "Not Known";
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(bookData) {
    //take params, create a book then sotre it in the array
    const newBook = new Book(bookData);
    myLibrary.push(newBook);
    render_book(myLibrary);
}

const form = document.querySelector(".addBook-form");

// let form_data= {};
const cleanData = function(data){

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log("submit clicked");
    const formData = new FormData(form);
    console.log(`this is form data ${formData}`);
    const dataObject = Object.fromEntries(formData);
    // dataObject.id = crypto.randomUUID(); //added in book constructor
    console.log("complete Object: ",dataObject);
    // form_data = {...dataObject};
    // form_data = dataObject;
    addBookToLibrary(dataObject);
    form.reset();
})






