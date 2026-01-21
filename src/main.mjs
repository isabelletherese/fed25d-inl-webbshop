import './style.scss';
import products from './products.mjs';

let filteredProducts = Array.from(products);
const productsList = document.querySelector('#products');

const cart = [];
const cartSection = document.querySelector('#cart');

//----------------------------------------
//------------MENU BUTTON-----------------
//----------------------------------------

const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');

menuBtn.addEventListener('click', openMenu);
nav.addEventListener('click', openMenu);

function openMenu(e) {
  if (e.target.nodeName === 'A') {
    return;
  }
  nav.classList.toggle('open');
}

//----------------------------------------
//------------FILTER BUTTONS--------------
//----------------------------------------

const bodyScrubsFilterBtn = document.querySelector('#bodyScrubsFilterBtn');
const scentedCandlesFilterBtn = document.querySelector('#scentedCandlesFilterBtn');
const soapsFilterBtn = document.querySelector('#soapsFilterBtn');
const showAllFilterBtn = document.querySelector('#showAllFilterBtn');

bodyScrubsFilterBtn.addEventListener('click', () => filterProductsByCategory('Body Scrubs'));
scentedCandlesFilterBtn.addEventListener('click', () => filterProductsByCategory('Doftljus'));
soapsFilterBtn.addEventListener('click', () => filterProductsByCategory('Tvåler'));
showAllFilterBtn.addEventListener('click', showAllProducts);

function filterProductsByCategory(category) {
  filteredProducts = products.filter(products => products.category === category);
  printProducts();
}
function showAllProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

//----------------------------------------
//--------------SORT DROPDOWN-------------
//----------------------------------------

const sortByList = document.querySelector('#sortByList');
sortByList.addEventListener('change', sortProducts);

const sortBy = {
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  ratingAsc: (a, b) => a.rating - b.rating,
  ratingDesc: (a, b) => b.rating - a.rating
};

function sortProducts() {
  const selectedSortingValue = sortByList.value;
  filteredProducts.sort(sortBy[selectedSortingValue]);
  printProducts();
}

function printProducts() {
  productsList.innerHTML = '';
  let productCard = '';

  filteredProducts.forEach(product => {

    let creditHtml = '';
    if(product.imageCredit) {
      const creditContent = product.imageCreditUrl ?
      `<a href="${product.imageCreditUrl}" target="_blank" rel="noopener noreferrer">Foto: ${product.imageCredit}</a>`
      : `Foto: ${product.imageCredit}`;
      
      creditHtml = `<figcaption>${creditContent}</figcaption>`;
    }

    const imgHtml = product.img ? `
      <figure class="product-image">
        <img
      src="${product.img.src}"
      width="${product.img.width}"
      height="${product.img.height}"
      alt="${product.img.alt}"
      loading="lazy">
      ${creditHtml}
      </figure>`: '';

    productCard += `
      <article>
          <h3>${product.name}</h3>
          ${imgHtml}
          <span class='price'>Pris: ${product.price} kr</span>
          <span class='rating'> Betyg: ${product.rating} / 5</span>
          <p>Kategori: ${product.category}</p>
          <div class="buyButtons">
          <button type="button" class="decrease" data-id="${product.id}">-</button>
          <label for="amount-${product.id}" class="sr-only">Antal</label>
          <input type="number" id="amount-${product.id}" value="1" disabled>
          <button type="button" class="increase" data-id="${product.id}">+</button>
          <button type="button" class="buy" data-id="${product.id}">Köp</button>
          </div>
      </article>
    `;
  });

  productsList.innerHTML = productCard;

  const buyButtons = document.querySelectorAll('#products button.buy');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductToCart);
  })

  const increaseButtons = document.querySelectorAll('#products button.increase');
  increaseButtons.forEach((btn) => {
    btn.addEventListener('click', increaseCartItemAmount);
  })

  const decreaseButtons = document.querySelectorAll('#products button.decrease');
  decreaseButtons.forEach((btn) => {
    btn.addEventListener('click', decreaseCartItemAmount);
  })
}

function increaseCartItemAmount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) + 1;
}

function decreaseCartItemAmount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) - 1;
}

function addProductToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id);

  const input = document.querySelector(`#amount-${clickedBtnId}`);
  const inputAmount = Number(input.value);

  const product = products.find(product => product.id === clickedBtnId);

  if (product === undefined) {
    return;
  }

  const cartItem = cart.find(item => item.id === clickedBtnId);

  if (cartItem) {
    cartItem.amount += inputAmount;
  } else {
    cart.push({
      ...product,
      amount: inputAmount
    });
  }

  input.value =1;

  printCart();
}

function printCart() {
  cartSection.innerHTML = '';
  let cartItem = '';

  cart.forEach(item => {
    cartItem += `
    <div class="cart-item">
    <span>${item.name}</span>
    <span>Antal: ${item.amount}</span>
    <span>Pris: ${item.price} kr</span>
    </div>
    `;
  });

  cartSection.innerHTML += cartItem;
}

printProducts();

