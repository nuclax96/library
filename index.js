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
    el.remove();
  });

  // 2. Status Btn

  statusBtn.addEventListener("click", (e) => {
    console.log(e.target.parentNode);
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

// movieArr.push({
//   title: "Wings of fire",
//   author: "APJ Abdul Kalam",
//   status: false,
// });
btnRemove.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const el = e.target.parentNode;
    el.remove();
  });
});
const insertCard = (obj) => {
  movieArr.push(obj);
  console.log(obj);
  const arrLength = movieArr.length - 1;
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
  console.log(tempObj);
  insertCard(tempObj);
};

addForm.addEventListener("submit", handleFormSubmit);

addBookBtn.addEventListener("click", (e) => {
  modal.classList.toggle("hidden");
});
movieArr.forEach((item, i) => {
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
    movieArr[card.dataset.arrIndex].status =
      item.textContent === "Read" ? true : false;
    console.log(movieArr);
  }
};
