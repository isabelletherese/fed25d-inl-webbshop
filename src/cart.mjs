import { getDisplayPrice, hasBulkDiscount, getDiscountMessages, isMondayMorning } from './products.mjs';

export const cart = [];
const cartSection = document.querySelector('.cartList');
const cartBadge = document.querySelector('#cartBadge');
const cartMenu = document.querySelector('#cartMenu');
const cartBtn = document.querySelector('#cartBtn');
const closeCartBtn = document.querySelector('#closeCartBtn');

export function addProductToCart(product, inputAmount) {
  const cartItem = cart.find(item => item.id === product.id);

  if (cartItem) {
    cartItem.amount += inputAmount;
  } else {
    cart.push({
      ...product,
      amount: inputAmount
    });
  }
  printCart();
  startCartTimer();
}

export function deleteItemInCart(e) {
  const clickedBtn = e.target.closest('button');
  const itemToDelete = Number(clickedBtn.dataset.id);
  const index = cart.findIndex(item => item.id === itemToDelete);

  cart.splice(index, 1);

  printCart();
  startCartTimer();
}

export function emptyCart() {
  const checkoutSection = document.querySelector('#checkout-section');
  cart.length = 0;

  if (checkoutSection) {
    checkoutSection.classList.add('hidden')

    window.scrollTo(top);
  }

  printCart();
}

const SLOWNESS_TIMER_MINUTES = 15;
let cartTimeOut;

export function startCartTimer() {
  if (cartTimeOut) {
    clearTimeout(cartTimeOut);
  }
  setTimeout(() => {
    if (cart.length > 0) {
      emptyCart();
      alert(`Varukorgen tömdes automatiskt efter ${SLOWNESS_TIMER_MINUTES} min.`);
    }
  }, SLOWNESS_TIMER_MINUTES * 60 * 1000);
}

export function updateCartSummary() {
  let subTotal = 0;
  let bulkDiscount = 0;
  let totalItems = 0;
  let originalSubTotal = 0;

  //---------------- MÄNGDRABATT 10% -----------------

  cart.forEach(item => {
    const displayPrice = Math.round(getDisplayPrice(item.price));
    let finalPrice = displayPrice;

    originalSubTotal += displayPrice * item.amount;

    if (hasBulkDiscount(item.amount)) {
      finalPrice = Math.round(displayPrice * 0.9);
      bulkDiscount += (displayPrice - finalPrice) * item.amount;
    }
    subTotal += finalPrice * item.amount;
    totalItems += item.amount;
  });

  //--------------- MÅNDAGSRABATT 10% ----------------
  const MONDAY = 1;
  const TEST_MONDAY = true
  const isMondayMorning = TEST_MONDAY || (new Date().getDay() === MONDAY && new Date().getHours() < 10);
  let mondayDiscount = 0

  if (isMondayMorning) {
    mondayDiscount = Math.round(subTotal * 0.1);
    subTotal = subTotal - mondayDiscount;
  }

  const totalDiscount = bulkDiscount + mondayDiscount;
  const cartTotal = subTotal;

  //------------------ FRAKTKOSTNAD ------------------

  let shippingCost = 0
  let shippingDisplay = '';

  if (totalItems >= 15) {
    shippingCost = 0;
    shippingDisplay = "<strong>Fri frakt!</strong>";

  } else {
    shippingCost = 25 + (cartTotal * 0.1)
    shippingDisplay = `${Math.round(shippingCost)} kr`;
  }

  //---------- DÖLJ FAKTURA VID KÖP ÖVER 800KR -------

  const invoiceDetails = document.querySelector('#invoice-payment');
  const invoiceRadio = document.querySelector('#invoice-radio-selection');

  if (invoiceRadio && invoiceDetails) {
    if (cartTotal > 800) {
      invoiceRadio.classList.add('hidden');
      invoiceDetails.classList.add('hidden');
    } else {
      invoiceRadio.classList.remove('hidden');
      invoiceDetails.classList.remove('hidden');
    }
  }

  return {
    subTotal: cartTotal,
    originalSubTotal: originalSubTotal,
    totalDiscount: totalDiscount,
    shippingCost: Math.round(shippingCost),
    shippingDisplay: shippingDisplay,
    finalTotal: Math.round(cartTotal + shippingCost),
    totalItems: totalItems
  };
}

export function printCart() {
  cartSection.innerHTML = '';
  let cartItem = '';
  let summaryItem = '';

  if (cart.length === 0) {
    cartSection.innerHTML = '<p class="cart-content">Varukorgen är tom.</p>';
  }

  const MONDAY = 1;
  const TEST_MONDAY = true;
  const isMondayMorning = TEST_MONDAY || (new Date().getDay() === MONDAY && new Date().getHours() < 10);

  cart.forEach(item => {
    const displayPrice = Math.round(getDisplayPrice(item.price));

    let finalPrice = displayPrice;
    let discountTags = '';

    if (hasBulkDiscount(item.amount)) {
      finalPrice = Math.round(finalPrice * 0.9);
      discountTags += ' <small class="discount-badge">(Mängdrabatt 10%)</small>';
    }

    if (isMondayMorning) {
      finalPrice = Math.round(finalPrice * 0.9)
      discountTags += ' <small class="discount-badge">(Måndagsrabatt 10%)</small>';
    }

    const itemTotal = finalPrice * item.amount;
    const displayPriceRounded = Math.round(finalPrice);

    cartItem += `
    <div class="cart-item">
      <div class="cart-item-top">
        <span>${item.name}</span>
        <button type="button" class="cartDelete" data-id="${item.id}" aria-label="Ta bort produkt">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3A5A40"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
      </div>

      <div class="cart-item-middle">
      <span>Pris: ${displayPriceRounded}kr ${discountTags}</span>
      </div>
      
      <div class="cart-item-bottom">
        <button class="cartDecrease" data-id="${item.id}">-</button>
        <input type="number" class="cartInputAmount" data-id="${item.id}" value="${item.amount}">
        <button type="button" class="cartIncrease" data-id="${item.id}">+</button>
        <span class="item-total-price">${itemTotal}kr</span>
      </div>
    </div>
    `;

    summaryItem += `
    <div class="summary-item">
      <div class="summary-item-top">
        <span>${item.name}</span>
      </div>

      <div class="summary-item-middle">
        <span>Pris: ${displayPriceRounded}kr ${discountTags} </span>
      </div>
      
      <div class="summary-item-bottom">
        <span>Antal: <strong>${item.amount}</strong></span>
        <span class="summary-item-total-price">${itemTotal}kr</span>
      </div>
    </div>
    `;
  });

  cartSection.innerHTML = cartItem;
  const orderTotals = updateCartSummary();

  const cartTotalEl = document.querySelector('#cartTotal');
  if (cartTotalEl) {
    cartTotalEl.innerHTML = `<span>Varukorgens totalsumma: <strong>${orderTotals.subTotal} kr</strong></span>`;
  }

  const checkoutBtn = document.querySelector('#checkoutBtn');

  if (checkoutBtn) {
    if (orderTotals.totalItems === 0) {
      checkoutBtn.innerText = 'Varukorgen är tom';
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.5";
      checkoutBtn.style.cursor = "not-allowed";
    } else {
      checkoutBtn.innerText = 'Till kassan';
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = "1";
      checkoutBtn.style.cursor = "pointer";
    }
  }

  const summaryList = document.querySelector('#order-summary-list');
  const summaryFooter = document.querySelector('#order-summary-footer');

  if (summaryList) {
    summaryList.innerHTML = summaryItem;
  }

  if (summaryFooter) {

    let discountHtml = '';
    if (orderTotals.totalDiscount > 0) {
      discountHtml = `
      <div class="summary-line">
        <span>Delsumma:</span>
        <span>${orderTotals.originalSubTotal} kr</span>
      </div>

      <div class="summary-line" style="color: #2D6A4F; font-weight: bold;">
        <span>Total rabatt:</span>
        <span>-${orderTotals.totalDiscount} kr</span>
      </div>`;
    }

    let discountMessagesHtml = '';

    const hasBulk = cart.some(item => hasBulkDiscount(item.amount));

    if (isMondayMorning) {
      discountMessagesHtml += `
    <div class="discount-messages">
      <span>Måndagsrabatt: 10% på hela beställningen.</span>
    </div>`;
    }

    if (hasBulk) {
      discountMessagesHtml += `
    <div class="discount-messages">
      <span>Mängdrabatt: 10% rabatt vid köp av 10 st!</span>
    </div>`;
    }

    summaryFooter.innerHTML = `
        <div class="item-summary">
          <span>Produkter (${orderTotals.totalItems} st):</span>
          <span>${orderTotals.subTotal} kr</span>
        </div>

        <div class="discount-container">
          <label class="discount-label">
            <p>Lägg till rabattkod:</p>
            <input type="text" class="discount-input">
          </label>
        </div>
        
     ${discountMessagesHtml}

        ${discountHtml}
  
        <div class="shipping-summary">
          <span>Frakt:</span>
          <span>${orderTotals.shippingDisplay}</span>
        </div>
        
        <div class="summary-total">
          <span>Totalt:</span>
          <span>${orderTotals.finalTotal} kr</span>
        </div>
      `;
  }

  if (cartBadge) cartBadge.innerText = orderTotals.totalItems;
  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll('.cartDecrease').forEach((btn) => {
    btn.addEventListener('click', decreaseAmountInCart);
  });

  document.querySelectorAll('.cartIncrease').forEach((btn) => {
    btn.addEventListener('click', increaseAmountInCart);
  });

  document.querySelectorAll('.cartDelete').forEach((btn) => {
    btn.addEventListener('click', deleteItemInCart);
  });

  document.querySelectorAll('.cartInputAmount').forEach((input) => {
    input.addEventListener('change', updateAmount);
  });
}

function decreaseAmountInCart(e) {
  const itemToUpdateId = Number(e.target.dataset.id);
  const item = cart.find(item => item.id === itemToUpdateId);

  if (item && item.amount > 1) {
    item.amount -= 1;
  }

  printCart();
  startCartTimer();
}

function increaseAmountInCart(e) {
  const itemToUpdateId = Number(e.target.dataset.id);
  const item = cart.find(item => item.id === itemToUpdateId);

  if (item) {
    item.amount += 1;
  }

  printCart();
  startCartTimer();
}

function updateAmount(e) {
  const itemToUpdateId = Number(e.target.dataset.id);
  const newAmount = Number(e.target.value);
  const item = cart.find(item => item.id === itemToUpdateId);

  if (!item) {
    return;
  }
  if (newAmount <= 0) {
    const index = cart.findIndex(item => item.id === itemToUpdateId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  } else {
    item.amount = newAmount;
  }

  printCart();
  startCartTimer();
}

cartBtn.addEventListener('click', openCartMenu);
closeCartBtn.addEventListener('click', closeCartMenu);

function openCartMenu(e) {
  cartMenu.classList.add('open');

  if (cartMenu.classList.contains('open')) {
    closeCartBtn.focus();
  }
}

function closeCartMenu(e) {
  cartMenu.classList.remove('open');
}

export default cart;