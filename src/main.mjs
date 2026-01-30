//-------------1. IMPORTER----------------

import './style.scss';
import products, { getDisplayPrice } from './products.mjs';
import { addProductToCart, updateCartSummary } from './cart.mjs'
import { initForm, checkFormFieldsValidity } from './checkout.mjs';

//---------2. GLOBALA VARIABLER-----------

let filteredProducts = [...products];
const productsList = document.querySelector('#products');
const cartMenu = document.querySelector('#cartMenu');

//----3. NAVIGERING & MENY (Header/Nav)---

const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const closeBtn = document.querySelector('#closeBtn');
const navLinks = document.querySelectorAll('#nav a')

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function openMenu(e) {
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    closeBtn.focus();
  }
}

function closeMenu(e) {
  nav.classList.remove('open');
}

//-------4. FILTRERING & SORTERING--------

const sortByList = document.querySelector('#sortByList');
sortByList.addEventListener('change', sortProducts);

function filterProductsByCategory(category) {
  filteredProducts = products.filter(product => product.category === category);
  sortProducts();
}

function showAllProducts() {
  filteredProducts = [...products];
  sortProducts();
}
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

const bodyScrubsFilterBtn = document.querySelector('#bodyScrubsFilterBtn');
const scentedCandlesFilterBtn = document.querySelector('#scentedCandlesFilterBtn');
const soapsFilterBtn = document.querySelector('#soapsFilterBtn');
const showAllFilterBtn = document.querySelector('#showAllFilterBtn');

bodyScrubsFilterBtn.addEventListener('click', () => filterProductsByCategory('Body Scrubs'));
scentedCandlesFilterBtn.addEventListener('click', () => filterProductsByCategory('Doftljus'));
soapsFilterBtn.addEventListener('click', () => filterProductsByCategory('Tvåler'));
showAllFilterBtn.addEventListener('click', showAllProducts);

//---------5. PRODUKTVISNING -------------

function printProducts() {
  productsList.innerHTML = '';
  let productCards = '';

  filteredProducts.forEach(product => {
    const displayPrice = getDisplayPrice(product.price);

    let creditHtml = '';
    if (product.imageCredit) {
      const creditContent = product.imageCreditUrl ?
        `<a href="${product.imageCreditUrl}" target="_blank" rel="noopener noreferrer">Foto: ${product.imageCredit}</a>`
        : `Foto: ${product.imageCredit}`;

      creditHtml = `<figcaption>${creditContent}</figcaption>`;
    }

    const imgHtml = product.img ? `
      <figure class="productImage">
        <img
      src="${product.img.src}"
      width="${product.img.width}"
      height="${product.img.height}"
      alt="${product.img.alt}"
      loading="lazy">
      ${creditHtml}
      </figure>`: '';

    productCards += `
      <article>
          <h3>${product.name}</h3>
          ${imgHtml}
          <span class='price'>Pris: ${displayPrice} kr</span>
          <span class='rating'> Betyg: ${product.rating} / 5</span>
          <p>Kategori: ${product.category}</p>
          <div class="decreaseIncreaseBtns">
            <button type="button" class="decrease" data-id="${product.id}">-</button>
            <label for="amount-${product.id}" class="sr-only">Antal</label>
            <input type="number" class="amountInput" id="amount-${product.id}" min-value="1" value="1" disabled>
            <button type="button" class="increase" data-id="${product.id}">+</button>
          </div>
          <button type="button" class="buyBtn" data-id="${product.id}">Köp</button>
    
      </article>
    `;
  });

  productsList.innerHTML = productCards;

  const buyButtons = document.querySelectorAll('#products button.buyBtn');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', clickedBuyBtn);
  })

  const increaseButtons = document.querySelectorAll('#products button.increase');
  increaseButtons.forEach((btn) => {
    btn.addEventListener('click', increaseItemAmount);
  })

  const decreaseButtons = document.querySelectorAll('#products button.decrease');
  decreaseButtons.forEach((btn) => {
    btn.addEventListener('click', decreaseItemAmount);
  });
}

function increaseItemAmount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  input.value = Number(input.value) + 1;
}

function decreaseItemAmount(e) {
  const clickedBtnId = e.target.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  let newAmount = Number(input.value) -1;

  if (newAmount < 1) {
    newAmount = 1; 
  }

  input.value = newAmount;
}

//--------6. KÖPKNAPP & POP UP -----------

function clickedBuyBtn(e) {
  const clickedBtn = e.target;
  const clickedBtnId = Number(clickedBtn.dataset.id);
  const product = products.find(product => product.id === clickedBtnId);
  const input = document.querySelector(`#amount-${clickedBtnId}`);
  const inputAmount = Number(input.value);

  if (product) {
    addProductToCart(product, inputAmount);
  }

  const orderTotals = updateCartSummary();

  if (orderTotals) {
    showPopup(product.name, orderTotals.subTotal);
  }

  input.value = 1;

  const originalText = clickedBtn.innerText;
  clickedBtn.innerText = "Tillagd! ✓"
  clickedBtn.disabled = true;

  setTimeout(() => {
    clickedBtn.innerText = originalText;
    clickedBtn.disabled = false;
  }, (1000 * 2));

}
function showPopup(productName, totalSum) {
  const container = document.querySelector('#popupContainer');

  const popup = document.createElement('div');
  popup.classList.add('popup-card');
  popup.innerHTML = `
  <strong>${productName}</strong> har lagts till i varukorgen!<br>
  <br><span class="flash-sum"> Varukorgens totalsumma: <strong> ${totalSum} kr</strong></span>
  `;

  container.prepend(popup);

  setTimeout(() => {
    popup.remove();
  }, (1000 * 2));
}

//--------7. CHECKOUT / KASSA ------------

const checkoutSection = document.querySelector('#checkout-section');
const goToCheckoutBtn = document.querySelector('#checkoutBtn');

function showCheckout() {
  checkoutSection.classList.remove('hidden');
  cartMenu.classList.remove('open');
  checkoutSection.scrollIntoView({ behavior: 'smooth' });
  checkFormFieldsValidity();
}

if (goToCheckoutBtn) {
  goToCheckoutBtn.addEventListener('click', showCheckout);
}

printProducts();
initForm();

