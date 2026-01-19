import './style.scss';

const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav')

menuBtn.addEventListener('click', openMenu);
nav.addEventListener('click', openMenu);

function openMenu(e) {
  if (e.target.nodeName == 'A') {
    return;
  }
  nav.classList.toggle('open');


}
//-------------------------------------
//---------------PRODUCTS--------------
//-------------------------------------

const product = [
  {
    name: 'Dear Scrub Body Scrub Coffee',
    brand: 'Dear Scrub',
    image: '',
    price: 109,
    rating: 5,
    category: 'Body Scrubs'
  },
  {
    name: 'Dear Scrub Body Scrub Sea Salt Rose',
    brand: 'Dear Scrub',
    image: '',
    price: 109,
    rating: 4.5,
    category: 'Body Scrubs'
  },
  {
    name: 'Dear Scrub Body Scrub Sea Salt Lavender',
    brand: 'Dear Scrub',
    image: '',
    price: 109,
    rating: 3.5,
    category: 'Body Scrubs'
  },
  {
    name: 'Luma Capella doftljus',
    brand: 'Luma',
    image: '',
    price: 89,
    rating: 4,
    category: 'Doftljus'
  },
  {
    name: 'Luma Akasha doftljus',
    brand: 'Luma',
    image: '',
    price: 69,
    rating: 3,
    category: 'Doftljus'
  },
  {
    name: 'Candelio Candles Waste a Moment doftljus',
    brand: 'Candelio Candles',
    image: '',
    price: 79,
    rating: 4,
    category: 'Doftljus'
  },
  {
    name: 'Candelio Candles Palo Santo doftljus',
    brand: 'Candelio Candles',
    image: '',
    price: 79,
    rating: 5,
    category: 'Doftljus'
  },
  {
    name: 'Luvia Midnight Swirl',
    brand: 'Luvia',
    image: '',
    price: 129,
    rating: 5,
    category: 'Tvåler'
  },
  {
    name: 'Luvia Lavender Field Bliss',
    brand: 'Luvia',
    image: '',
    price: 129,
    rating: 5,
    category: 'Tvåler'
  },
  {
    name: 'Luvia Wildflower Petals',
    brand: 'Luvia',
    image: '',
    price: 129,
    rating: 2,
    category: 'Tvåler'
  }
];
let filteredProducts = Array.from(product);
const productsList = document.querySelector('#products');

//----------------------------------------
//------------FILTER BUTTONS--------------
//----------------------------------------

const bodyScrubsFilterBtn = document.querySelector('#bodyScrubsFilterBtn');
const scentedCandlesFilterBtn = document.querySelector('#scentedCandlesFilterBtn');
const soapsFilterBtn = document.querySelector('#soapsFilterBtn');
const showAllFilterBtn = document.querySelector('#showAllFilterBtn');

bodyScrubsFilterBtn.addEventListener('click', filterProductsByBodyScrubs);
scentedCandlesFilterBtn.addEventListener('click', filterProductsByScentedCandles);
soapsFilterBtn.addEventListener('click', filterProductsBySoaps);
showAllFilterBtn.addEventListener('click', showAllProducts);

function filterProductsByBodyScrubs() {
  filteredProducts = product.filter((product => product.category === 'Body Scrubs'))
  printProducts();
}
function filterProductsByScentedCandles() {
  filteredProducts = product.filter((product => product.category === 'Doftljus'))
  printProducts();
}
function filterProductsBySoaps() {
  filteredProducts = product.filter((product => product.category === 'Tvåler'))
  printProducts();
}
function showAllProducts() {
  filteredProducts = Array.from(product);
  printProducts();
}

//----------------------------------------
//--------------SORT BUTTONS--------------
//----------------------------------------

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

function sortProductsByNameAsc() {
  filteredProducts = product.sort((product1, product2) => product1.name > product2.name);
  printProducts();
}
function sortProductsByNameDesc() {
  filteredProducts = product.sort((product1, product2) => product1.name < product2.name);
  printProducts();
}
function sortProductsByPriceAsc(){
  filteredProducts = product.sort((product1, product2) => product1.price - product2.price);
  printProducts();
}
function sortProductsByPriceDesc(){
  filteredProducts = product.sort((product1, product2) => product2.price - product1.price);
  printProducts();
}
function sortProductsByRatingAsc(){
  filteredProducts = product.sort((product1, product2) => product1.rating - product2.rating);
  printProducts();
}
function sortProductsByRatingDesc(){
  filteredProducts = product.sort((product1, product2) => product2.rating - product1.rating);
  printProducts();
}

function printProducts() {
  productsList.innerHTML = '';

  filteredProducts.forEach(product => {

    const productCard = `
    <article>
    <h3>${product.name}</h3>
    <p> ${product.brand}</p>
    <span class='price'>Pris: ${product.price} kr</span> <br/>
    <span class='rating'> Betyg: ${product.rating} / 5</span>
    <p>Kategori: ${product.category}</p>
    </article>
    `;

    productsList.innerHTML += productCard;
  })
}

printProducts()
