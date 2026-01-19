import './style.scss';
import products from './products.mjs';

let filteredProducts = Array.from(products);
const productsList = document.querySelector('#products');

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

bodyScrubsFilterBtn.addEventListener('click', () => filterProductsByCategory ('Body Scrubs'));
scentedCandlesFilterBtn.addEventListener('click', () => filterProductsByCategory ('Doftljus'));
soapsFilterBtn.addEventListener('click', () => filterProductsByCategory ('Tvåler'));
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
//--------------SORT BUTTONS--------------
//----------------------------------------

// ARBETA OM TILL EN DROPDOWN LIST & MINDRE UPPREPAD KOD OM MÖJLIGT!

const sortByNameAscBtn = document.querySelector('#sortByNameAscBtn');
const sortByNameDescBtn = document.querySelector('#sortByNameDescBtn');
const sortByPriceAscBtn = document.querySelector('#sortByPriceAscBtn');
const sortByPriceDescBtn = document.querySelector('#sortByPriceDescBtn');
const sortByRatingAscBtn = document.querySelector('#sortByRatingAscBtn');
const sortByRatingDescBtn = document.querySelector('#sortByRatingDescBtn');

sortByNameAscBtn.addEventListener('click', sortProductsByNameAsc);
sortByNameDescBtn.addEventListener('click', sortProductsByNameDesc);
sortByPriceAscBtn.addEventListener('click', sortProductsByPriceAsc);
sortByPriceDescBtn.addEventListener('click', sortProductsByPriceDesc);
sortByRatingAscBtn.addEventListener('click', sortProductsByRatingAsc);
sortByRatingDescBtn.addEventListener('click', sortProductsByRatingDesc);

function sortProductsByNameAsc(){
  filteredProducts = products.sort((product1, product2) => product1.name > product2.name);
  printProducts();
}
function sortProductsByNameDesc(){
  filteredProducts = products.sort((product1, product2) => product1.name < product2.name);
  printProducts();
}
function sortProductsByPriceAsc(){
  filteredProducts = products.sort((product1, product2) => product1.price - product2.price);
  printProducts();
}
function sortProductsByPriceDesc(){
  filteredProducts = products.sort((product1, product2) => product2.price - product1.price);
  printProducts();
}
function sortProductsByRatingAsc(){
  filteredProducts = products.sort((product1, product2) => product1.rating - product2.rating);
  printProducts();
}
function sortProductsByRatingDesc(){
  filteredProducts = products.sort((product1, product2) => product2.rating - product1.rating);
  printProducts();
}

function printProducts() {
  productsList.innerHTML = '';

  filteredProducts.forEach(products => {

    const productCard = `
    <article>
    <h3>${products.name}</h3>
    <p> ${products.brand}</p>
    <span class='price'>Pris: ${products.price} kr</span>
    <span class='rating'> Betyg: ${products.rating} / 5</span>
    <p>Kategori: ${products.category}</p>
    </article>
    `;

    productsList.innerHTML += productCard;
  })
}

printProducts()
