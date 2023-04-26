const btnRemove = document.querySelectorAll(".btn-remove");
const cardList = document.querySelector(".book-list");
const addBookBtn = document.querySelector(".add-book-btn");
const addForm = document.querySelector(".add-form");
const formSubmitBtn = document.querySelector(".form-submit-btn");
const modal = document.querySelector(".modal");
const movieArr = [
  {
    title: "Song of Ice and Fire",
    author: "George R. R. Martin",
    status: "read",
  },
];

const createCardElement = (item, i) => {
  console.log(item);
  const divCard = document.createElement("div");
  const headingTitle = document.createElement("h3");
  const authorParagraph = document.createElement("p");
  const statusParagraph = document.createElement("p");
  const statusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  divCard.classList.add("card");
  headingTitle.classList.add("title");
  authorParagraph.classList.add("author");
  statusParagraph.classList.add("status");
  statusBtn.classList.add("btn-status");
  removeBtn.classList.add("btn-remove");
  divCard.dataset.arrIndex = i;

  headingTitle.textContent = item.title;
  authorParagraph.textContent = item.author;
  statusParagraph.textContent = item.status;
  statusBtn.textContent = item.status;
  removeBtn.textContent = "remove";
  // Add Event Listeners
  // 1. Remove Btn
  removeBtn.addEventListener("click", (e) => {
    const el = e.target.parentNode;
    el.remove();
  });

  // Append Child nodes
  divCard.appendChild(headingTitle);
  divCard.appendChild(authorParagraph);
  divCard.appendChild(statusParagraph);
  divCard.appendChild(statusBtn);
  divCard.appendChild(removeBtn);

  return divCard;
};

movieArr.push({
  title: "Wings of fire",
  author: "APJ Abdul Kalam",
  status: "Unread",
});
btnRemove.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const el = e.target.parentNode;
    el.remove();
  });
});
const insertCard = (obj) => {
  movieArr.push(obj);
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
