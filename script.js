const newBookButton = document.querySelector('#new-book-button');
const newBookForm = document.querySelector('#new-book-form');
const bookDiv = document.querySelector('#books');
const addBookSubmitButton = document.querySelector('#add-book-submit');
const authorTextBox = document.querySelector('#auth');
const titleTextBox = document.querySelector('#title');
const pagesTextBox = document.querySelector('#pages');
const form = document.querySelector('form');
const addIcon = document.querySelector('#add-icon')

let myLibrary = [];
function changeReadingStatus(element) {
  if (element.textContent === 'Read') {element.textContent = `Haven't Read`}
  else if (element.textContent === 'Currently Reading') {element.textContent = `Read`}
  else  {element.textContent = `Currently Reading`}

}
function action() {
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
    let bookTitle = img.parentNode.parentNode.querySelector('h3');
    img.addEventListener('click', () => {
    let answer = confirm(`Are you sure you want to delete ${bookTitle.textContent}?`)
    console.log(answer);
    if (answer) {img.parentNode.parentNode.remove()}
  })
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
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  displayBooks(myLibrary[myLibrary.length - 1])
 action()
}

function displayBooks(book) {
  let newDiv = document.createElement('div');
  let actionsNode = document.createElement('div');
  actionsNode.classList.add('book-actions-container');
  actionsNode.innerHTML = `<img class="read-status-update" src="img/reading-book.png" alt="change reading status icon">
  <p class="action-description"></p>
  <img class="delete-book" src="img/delete.png" alt="delete book icon">`
  newDiv.appendChild(actionsNode)

  let title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;

  let author = document.createElement('p');
  author.innerHTML = '<strong>Author: </strong>';
  let authorTextNode = document.createTextNode(book.author);
  author.appendChild(authorTextNode);


  let pages = document.createElement('p');
  pages.innerHTML = '<strong>Pages: </strong>'
  let pageTextNode = document.createTextNode(book.pages);
  pages.appendChild(pageTextNode);

  let readingStatus = document.createElement('p');
  readingStatus.classList.add('read-para')
  readingStatus.innerHTML = '<strong>Reading Status: </strong>';
  let span = document.createElement('span');
  span.classList.add('read-status');
  span.textContent = book.read;
  readingStatus.appendChild(span);
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
  let pages = pagesTextBox.value;
  let read = document.querySelector('input[name="read"]:checked').value;
  let newBook = new Book(author, title, pages, read);
  console.log(newBook);
  addBookToLibrary(newBook)
})
action()