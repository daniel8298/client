window.data;
const HOME_PAGE = document.getElementById("product");
const PRODUCT_PAGE = document.getElementById("product_page");
const EDIT_PAGE = document.getElementById("edit_page");
const ADD_PAGE = document.getElementById("add_page");

const AllPRODUCTS = document.getElementById("all-products");
const MAN = document.getElementById("man");
const WOMEN = document.getElementById("women");
const JEWELERY = document.getElementById("jewelery");
const ELECTRONICS = document.getElementById("electronics");
const TEXT_SEARCH = document.getElementById("text-search");
const BUTTON_SEARCH = document.getElementById("button-search");
const BUTTON_HOME = document.getElementsByClassName("button-home");
const ARR_BUTTON_HOME = Array.from(BUTTON_HOME);
const BUTTON_EDIT = document.getElementById("button_edit");
const BUTTON_PLUS = document.getElementById("button-plus");

const getRandomInRange = () => {
  let result = Math.random() * 100;
  return Math.floor(result);
};

const createNewElement = (type, anchorElement, node = "") => {
  const ELEMENT = document.createElement(type);
  ELEMENT.innerText = node;
  anchorElement.appendChild(ELEMENT);
  return ELEMENT;
};

let active;
///////////////// PAGES /////////////////////

const router = (active) => {
  PRODUCT_PAGE.className = "d_none";
  EDIT_PAGE.className = "d_none";
  ADD_PAGE.className = "d_none";
  HOME_PAGE.className = "d_none";

  if (active === "home") return (HOME_PAGE.className = "d_block");

  if (active === "details_product") return (PRODUCT_PAGE.className = "d_block");

  if (active === "edit") return (EDIT_PAGE.className = "d_block");

  if (active == "add_page") return (ADD_PAGE.className = "d_block");
};

const PAGE = document.getElementById("page");

const createProduct = (product) => {
  let number = getRandomInRange();
  const PRODUCT = createNewElement("div", PAGE);
  PRODUCT.classList.add("product");
  const IMG = createNewElement("img", PRODUCT);
  IMG.src = product.image;
  IMG.classList.add("img");
  const DETAILS = createNewElement("div", PRODUCT);
  DETAILS.classList.add("details");
  const IN_DETAILS = createNewElement("div", DETAILS);
  IN_DETAILS.classList.add("in_title");
  const TITLE = createNewElement("p", IN_DETAILS, product.title);
  TITLE.classList.add("title");
  const LINE = createNewElement("hr", IN_DETAILS);
  const DIV_COUNT = createNewElement("div", IN_DETAILS);
  DIV_COUNT.classList.add("div_count");
  const PLUS_COUNT = createNewElement("span", DIV_COUNT, "+1");
  PLUS_COUNT.classList.add("button_count");
  const COUNT = createNewElement("span", DIV_COUNT, number);
  COUNT.id = "count";
  const MINUS_COUNT = createNewElement("span", DIV_COUNT, "-1");
  MINUS_COUNT.classList.add("button_count");
  PLUS_COUNT.addEventListener("click", () => {
    COUNT.innerText = number += 1;
    event.stopPropagation();
  });
  MINUS_COUNT.addEventListener("click", () => {
    if (COUNT.innerText > 0) {
      COUNT.innerText = number -= 1;
    }
    event.stopPropagation();
  });
  const REMOVE_CREATE = createNewElement("div", IN_DETAILS);
  REMOVE_CREATE.classList.add("remove_create");
  const ICONS_DELETE = createNewElement("span", REMOVE_CREATE, "delete");
  ICONS_DELETE.classList.add("material-icons");
  ICONS_DELETE.id = "button_delete";
  ICONS_DELETE.addEventListener("click", () => {
    const index = data.indexOf(product);
    console.log(index);
    if (index !== -1) {
      data.splice(index, 1);
      PRODUCT.remove();
      deleteProduct(product);
      event.stopPropagation();
    }
  });

  PRODUCT.addEventListener("click", () => {
    active = "details_product";
    router(active);
    product_page(product, number);
    event.stopPropagation();
  });

  const ICONS_CREATE = createNewElement("span", REMOVE_CREATE, "create");
  ICONS_CREATE.classList.add("material-icons");
  ICONS_CREATE.id = "button_create";

  ICONS_CREATE.addEventListener("click", () => {
    active = "edit";
    router(active);
    edit_page(product, number);
    event.stopPropagation();

    BUTTON_EDIT.addEventListener("click", () => {
      edit(product);
      event.stopPropagation();
    });
  });
};

const createAllCards = (data) => {
  data.forEach((product) => {
    createProduct(product);
  });
};

const showOneCategory = (category) => {
  data.forEach((product) => {
    if (product.category === category) createProduct(product);
  });
};

const searchCard = (value) => {
  data.forEach((product) => {
    if (product.title.toLowerCase().includes(value.toLowerCase()))
      createProduct(product);
  });
};

const product_page = (product, number) => {
  const D_IMG = document.getElementById("details_img");
  const D_TITLE = document.getElementById("details_title");
  const D_DESCRIPTION = document.getElementById("details_description");
  const D_CATEGORY = document.getElementById("details_category");
  const D_PRICE = document.getElementById("details_price");
  const D_QUANTITY = document.getElementById("details_quantity");
  D_IMG.src = product.image;
  D_TITLE.innerText = product.title;
  D_DESCRIPTION.innerText = product.description;
  D_CATEGORY.innerText = product.category;
  D_PRICE.innerText = product.price;
  D_QUANTITY.innerText = number;
};
const edit_page = (product, number) => {
  const IMG = document.getElementById("edit_img");
  const TITLE = document.getElementById("edit_title");
  const DESCRIPTION = document.getElementById("edit_description");
  const CATEGORY = document.getElementById("edit_category");
  const PRICE = document.getElementById("edit_price");
  const QUANTITY = document.getElementById("edit_quantity");
  IMG.value = product.image;
  TITLE.value = product.title;
  DESCRIPTION.value = product.description;
  CATEGORY.value = product.category;
  PRICE.value = product.price;
  QUANTITY.value = number;
};

const edit = (product) => {
  event.preventDefault();
  const IMG = document.getElementById("edit_img");
  const TITLE = document.getElementById("edit_title");
  const DESCRIPTION = document.getElementById("edit_description");
  const CATEGORY = document.getElementById("edit_category");
  const PRICE = document.getElementById("edit_price");
  const QUANTITY = document.getElementById("edit_quantity");
  product.image = IMG.value;
  product.title = TITLE.value;
  product.description = DESCRIPTION.value;
  product.category = CATEGORY.value;
  product.price = PRICE.value;
  number = QUANTITY.value;
  event.stopPropagation();
  active = "home";
  router(active);
};

AllPRODUCTS.addEventListener("click", () => {
  PAGE.replaceChildren();
  createAllCards(data);
});
MAN.addEventListener("click", () => {
  PAGE.replaceChildren();
  showOneCategory("men's clothing");
});
WOMEN.addEventListener("click", () => {
  PAGE.replaceChildren();
  showOneCategory("women's clothing");
});
JEWELERY.addEventListener("click", () => {
  PAGE.replaceChildren();
  showOneCategory("jewelery");
});
ELECTRONICS.addEventListener("click", () => {
  PAGE.replaceChildren();
  showOneCategory("electronics");
});

BUTTON_SEARCH.addEventListener("click", () => {
  PAGE.replaceChildren();
  searchCard(TEXT_SEARCH.value);
  TEXT_SEARCH.value = "";
});

ARR_BUTTON_HOME.forEach((element) => {
  element.addEventListener("click", () => {
    active = "home";
    router(active);
  });
});

BUTTON_PLUS.addEventListener("click", () => {
  active = "add_page";
  router(active);
});

const dataStorage = async () => {
  const response = await fetch("https://server-ypki.onrender.com/products");
  data = await response.json();
  createAllCards(data);
};

const deleteProduct = async (product) => {
  const reqOptions = {
    method: "DELETE",
    params: { id: product.id },
  };
  const response = await fetch(
    `https://server-ypki.onrender.com/product/${product.id}`,
    reqOptions
  );
  data = await response.json();
};

dataStorage();
