const newBookButton = document.querySelector('#new-book-button');
const newBookForm = document.querySelector('#new-book-form');
const bookDiv = document.querySelector('#books');
const addBookSubmitButton = document.querySelector('#add-book-submit');
const authorTextBox = document.querySelector('#auth');
const titleTextBox = document.querySelector('#title');
const pagesTextBox = document.querySelector('#pages');
const form = document.querySelector('form');
const addIcon = document.querySelector('#add-icon');
const errorPara = document.querySelector('.error-para');
const resetButton = document.querySelector('.btn-reset');

let localBooks = window.localStorage.getItem('myLibrary');
if (localBooks === null) {
  localBooks = [{
    "title": "Your Books will look like this",
    "author": "The Author's name",
    "pages": "Page amount",
    "read": "Haven't Read",
    "ID": 222
  }, {
    "title": "Note what the books are saved in your local data, By deleting you local data, the books will be lost",
    "ID": 333
  }]
  localBooks = JSON.stringify(localBooks)
}
window.localStorage.setItem('myLibrary', localBooks)


const retrivedLibrary = localStorage.getItem('myLibrary')
if (retrivedLibrary) {
  JSON.parse(retrivedLibrary).forEach((retrivedBook) => {
    displayBooks(retrivedBook)
  })
}


document.onload
let myLibrary = [];
function changeReadingStatus(element) {
  if (element.textContent === 'Read') { element.textContent = `Haven't Read` }
  else if (element.textContent === 'Currently Reading') { element.textContent = `Read` }
  else { element.textContent = `Currently Reading` }

}
function action() {
  function deleteBook() {

    let bookTitle = this.parentNode.parentNode.querySelector('h3');
    let answer = confirm(`Are you sure you want to delete ${bookTitle.textContent}?`);
    if (answer) {
      this.parentNode.parentNode.remove()
      let deleteID = this.parentNode.parentNode.getAttribute('id');
      let storageBooks = window.localStorage.getItem('myLibrary');
      storageBooks = JSON.parse(storageBooks);
      let bookToDeleteIndex = storageBooks.findIndex(book => book.ID === deleteID)
      storageBooks.splice(bookToDeleteIndex, 1);
      window.localStorage.setItem('myLibrary', JSON.stringify(storageBooks))
    };


  }
  const statusUpdateImg = document.querySelectorAll('.read-status-update');
  const deleteBookImg = document.querySelectorAll('.delete-book');

  statusUpdateImg.forEach((img) => {
    img.addEventListener('mouseover', () => {
      img.parentNode.querySelector('.action-description').textContent = 'Update Reading Status';
    })
  })

  statusUpdateImg.forEach((img) => {
    img.addEventListener('mouseout', () => {
      img.parentNode.querySelector('.action-description').textContent = '';
    })

  })
  statusUpdateImg.forEach((img) => {
    img.addEventListener('click', () => {
      changeReadingStatus(img.parentNode.parentNode.querySelector('span'));
    })
  })

  deleteBookImg.forEach((img) => {
    img.addEventListener('mouseover', () => {
      img.parentNode.querySelector('.action-description').textContent = 'Delete this Book';
    })
  })

  deleteBookImg.forEach((img) => {
    if (img.getAttribute('listener') !== 'true') {
      img.addEventListener('click', deleteBook);
      img.setAttribute('listener', 'true');

    }
  })


  deleteBookImg.forEach((img) => {
    img.addEventListener('mouseout', () => {
      img.parentNode.querySelector('.action-description').textContent = '';
    })
  })

}


function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.ID = Math.random().toString(16).slice(2)
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  displayBooks(myLibrary[myLibrary.length - 1])
  action()
  let localBooks = window.localStorage.getItem('myLibrary');
  if (localBooks === null) {
    localBooks = [{
      "title": "Your Books will look like this",
      "author": "The Author's name",
      "pages": "Page amount",
      "read": "Haven't Read"
    }]
    localBooks = JSON.stringify(localBooks)
  }

  let parsedLocalBooks = JSON.parse(localBooks);
  parsedLocalBooks.push(book)
  window.localStorage.setItem('myLibrary', JSON.stringify(parsedLocalBooks))
}

function displayBooks(book) {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', book.ID)
  let actionsNode = document.createElement('div');
  actionsNode.classList.add('book-actions-container');
  actionsNode.innerHTML = `<img class="read-status-update" src="img/reading-book.png" alt="change reading status icon">
  <p class="action-description"></p>
  <img class="delete-book" src="img/delete.png" alt="delete book icon">`
  newDiv.appendChild(actionsNode)

  let title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;
  if (book.author) {
    var author = document.createElement('p');
    author.innerHTML = '<strong>Author: </strong>';
    let authorTextNode = document.createTextNode(book.author);
    author.appendChild(authorTextNode);
  }
  else {
    author = ''
  }
  if (book.pages) {
    var pages = document.createElement('p');
    pages.innerHTML = '<strong>Pages: </strong>'
    let pageTextNode = document.createTextNode(book.pages);
    pages.appendChild(pageTextNode);
  }
  else pages = ''
  if (book.read) {
    var readingStatus = document.createElement('p');
    readingStatus.classList.add('read-para')
    readingStatus.innerHTML = '<strong>Reading Status: </strong>';
    let span = document.createElement('span');
    span.classList.add('read-status');
    span.textContent = book.read;
    readingStatus.appendChild(span);
  }
  else readingStatus = '';




  newDiv.append(title, author, pages, readingStatus);
  newDiv.classList.add('book')
  bookDiv.appendChild(newDiv);
}

addIcon.addEventListener('click', () => {
  newBookForm.classList.toggle('hidden')
})

addBookSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let author = authorTextBox.value;
  let title = titleTextBox.value;
  if (pagesTextBox.value < 0 || pagesTextBox.value > 9999) {
    errorPara.textContent = 'Number of pages must be higher than 0 and lower than 9999'
    return false
  }
  let pages = pagesTextBox.value;
  let read = document.querySelector('input[name="read"]:checked').value;
  let newBook = new Book(author, title, pages, read);
  addBookToLibrary(newBook)
})
action()
pagesTextBox.addEventListener('change', () => {
  errorPara.textContent = ''
});
resetButton.addEventListener('click', (e) => {
  e.preventDefault()
  form.reset()
})
