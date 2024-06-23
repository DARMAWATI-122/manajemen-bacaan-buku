let books = [];

document.addEventListener('DOMContentLoaded', function () {
  loadBooksFromStorage();
  renderBooks();
});

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isComplete = document.getElementById('isComplete').checked;
  
  const book = {
    id: +new Date(),
    title: title,
    author: author,
    year: parseInt(year),
    isComplete: isComplete
  };
  
  books.push(book);
  saveBooksToStorage();
  renderBooks();
}

function renderBooks(filteredBooks = books) {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');
  
  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';
  
  for (const book of filteredBooks) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Year: ${book.year}</p>
      <button onclick="removeBook(${book.id})">Remove</button>
      <button onclick="toggleBook(${book.id})">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
    `;
    
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookItem);
    } else {
      incompleteBookshelfList.appendChild(bookItem);
    }
  }
}

function removeBook(bookId) {
  books = books.filter(book => book.id !== bookId);
  saveBooksToStorage();
  renderBooks();
}

function toggleBook(bookId) {
  const book = books.find(book => book.id === bookId);
  book.isComplete = !book.isComplete;
  saveBooksToStorage();
  renderBooks();
}

function saveBooksToStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}

function searchBooks() {
  const searchText = document.getElementById('search').value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchText));
  renderBooks(filteredBooks);
}
