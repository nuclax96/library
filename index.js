const btnRemove = document.querySelectorAll(".btn-remove");
const cardList = document.querySelector(".book-list");
const addBookBtn = document.querySelector(".add-book-btn");
const addForm = document.querySelector(".add-form");
const formSubmitBtn = document.querySelector(".form-submit-btn");
const modal = document.querySelector(".modal");
const statusBtn = document.querySelector(".btn-status");
const movieArr = [
  {
    title: "Song of Ice and Fire",
    author: "George R. R. Martin",
    status: true,
  },
];

const getLocalStorageArr = () => {
  const arrTemp = localStorage.getItem("movieArr");
  let parsedArr = JSON.parse(arrTemp);
  //   console.log(parsedArr);
  return parsedArr ? parsedArr : [];
};

const createCardElement = (item, i) => {
  const divCard = document.createElement("div");
  const headingTitle = document.createElement("h3");
  const authorParagraph = document.createElement("p");
  //   const statusParagraph = document.createElement("p");
  const statusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  divCard.classList.add("card");
  headingTitle.classList.add("title");
  authorParagraph.classList.add("author");
  //   statusParagraph.classList.add("status");
  statusBtn.classList.add("btn-status");
  removeBtn.classList.add("btn-remove");
  divCard.dataset.arrIndex = i;

  headingTitle.textContent = item.title;
  authorParagraph.textContent = item.author;
  //   statusParagraph.textContent = item.status;
  statusBtn.textContent = item.status ? "Read" : "Not Read";
  removeBtn.textContent = "Remove";
  // Add Event Listeners
  // 1. Remove Btn
  removeBtn.addEventListener("click", (e) => {
    const el = e.target.parentNode;
    // console.log(getLocalStorageArr(), el);
    // const elIndex = e.target.parentNode;
    const arr = getLocalStorageArr();

    updateLocalStorage(arr, el.dataset.arrIndex);
    el.remove();
  });

  // 2. Status Btn

  statusBtn.addEventListener("click", (e) => {
    updateCard(e.target, "statusBtn");
  });

  // Append Child nodes
  divCard.appendChild(headingTitle);
  divCard.appendChild(authorParagraph);
  //   divCard.appendChild(statusParagraph);
  divCard.appendChild(statusBtn);
  divCard.appendChild(removeBtn);

  return divCard;
};

// btnRemove.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const el = e.target.parentNode;
//     const arr = getLocalStorageArr();

//     updateLocalStorage(arr, el.target.dataset("arrIndex"));
//     el.remove();
//   });
// });
const insertCard = (obj) => {
  //   movieArr.push(obj);
  pushIntoLocalStorage(obj);
  const arrLength = getLocalStorageArr().length - 1;
  const createdElement = createCardElement(obj, arrLength);
  cardList.appendChild(createdElement);
};

const createBookCard = (item, i) => {
  const div = createCardElement(item, i);
  cardList.appendChild(div);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(addForm);
  const tempObj = {};
  for (const [name, value] of data) {
    tempObj[name] = value;
  }
  tempObj.status = tempObj.status === "true" ? true : false;
  insertCard(tempObj);
  modal.classList.toggle("hidden");
};

addForm.addEventListener("submit", handleFormSubmit);

addBookBtn.addEventListener("click", (e) => {
  modal.classList.toggle("hidden");
});

getLocalStorageArr().forEach((item, i) => {
  createBookCard(item, i);
});

modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    modal.classList.toggle("hidden");
  }
});

const updateCard = (item, updateEl) => {
  if (updateEl === "statusBtn") {
    const card = item.parentNode;

    item.textContent = item.textContent === "Read" ? "Not Read" : "Read";
    card.childNodes.forEach((item) => {
      if (item.classList.contains("btn-status")) {
        if (item.textContent === "Read") {
          item.classList.add("read");
          item.classList.remove("unread");
        }
        if (item.textContent === "Not Read") {
          item.classList.toggle("unread");
          item.classList.remove("read");
        }
      }
    });
    console.log(movieArr);
    movieArr[card.dataset.arrIndex].status =
      item.textContent === "Read" ? true : false;
  }
};

// Local Storage implementaion testing

const pushIntoLocalStorage = (obj) => {
  let parsedArr = getLocalStorageArr();
  console.log(parsedArr);
  parsedArr.push(obj);
  localStorage.removeItem("movieArr");
  window.localStorage.setItem("movieArr", JSON.stringify(parsedArr));
  //   console.log(localStorage.getItem("movieArr"));
};

const updateLocalStorage = (arr, index) => {
  const tempArr = getLocalStorageArr();
  tempArr.splice(index, 1);
  console.log(arr, index, tempArr);
  // push into local storage
  localStorage.removeItem("movieArr");
  localStorage.setItem("movieArr", JSON.stringify(tempArr));
};

// To Kill a Mockingbird, by Harper Lee To kill a mockingbird ...
// 1984, by George Orwell 1984 ...
// Harry Potter and the Philosopher’s Stone, by J.K. ...
// The Lord of the Rings, by J.R.R. Tolkien ...
// The Great Gatsby, by F. Scott Fitzgerald .
// pushIntoLocalStorage({
//   title: "The Great Gatsby",
//   author: "F. Scott Fitzgerald",
//   status: true,
// });
