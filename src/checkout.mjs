import { emptyCart } from "./cart.mjs";

const orderForm = document.querySelector('#order-form');
const orderBtn = document.querySelector('#orderBtn');
const cardSection = document.querySelector('#card-payment');
const invoiceSection = document.querySelector('#invoice-payment');
const paymentRadioBtns = document.querySelectorAll('input[name="payment-method"]');

const regexes = {
    'first-name': /^[a-zA-ZåäöÅÄÖ]{2,}(?:-[a-zA-ZåäöÅÄÖ]+)?$/,
    'last-name': /^[a-zA-ZåäöÅÄÖ]{2,}(?:[ \-][a-zA-ZåäöÅÄÖ]+)*$/,
    'address1': /^[a-zA-ZåäöÅÄÖ\s-]+ \d+[a-zA-Z]?$/,
    'address2': /^[a-zA-ZåäöÅÄÖ0-9\s,.\/-]*$/,
    'zip-code': /^(?:\d{5}|\d{3}\s\d{2})$/,
    'city': /^[a-zA-ZåäöÅÄÖ\s-]{2,}$/,
    'phone-number': /^\+46\d{7,10}$/,
    'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'cardName': /^[a-zA-ZåäöÅÄÖ\s-]{2,30}$/,
    'cardNumber': /^(?:\d{4}[-\s]?){3}\d{4}$/,
    'MM-YY': /^(0[1-9]|1[0-2])\/?([2-9][0-9])$/,
    'CVC': /^\d{3,4}$/,
    'pnr': /^(?:\d{2}){1,2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[-+]?\d{4}$/
};

function toggleError(field, isValid) {
    const errorSpan = field.parentElement.querySelector('.error') || field.nextElementSibling;
    if (errorSpan) {
        if (isValid) {
            errorSpan.classList.add('hidden');
        } else {
            errorSpan.classList.remove('hidden');
        }
    }
}

function validateField(fieldName, showError = false) {
    const field = orderForm.elements[fieldName];
    if (!field) {
        return false;
    }
    const value = field.value.trim();

    if (value.length === 0 && fieldName === 'address2') {
        if (showError) toggleError(field, true);
        return true;
    }

    if (value.length === 0) {
        if (showError) toggleError(field, false);
        return false;
    }

    const isValid = regexes[fieldName].test(value);
    if (showError) toggleError(field, isValid);
    return isValid;
}

function validateGdpr(showError = false) {
    const field = orderForm.elements['gdpr'];
    const isValid = field.checked;


    if (showError) {
        const errorSpan = field.parentElement.querySelector('.error');

        if (errorSpan) {
            errorSpan.classList.toggle('hidden', isValid);
        }
    }

        return isValid;
}

    function togglePaymentSections() {
        const selectedMethod = orderForm.elements['payment-method'].value;

        if (selectedMethod === 'card') {
            cardSection.classList.remove('hidden');
            invoiceSection.classList.add('hidden');
        } else {
            cardSection.classList.add('hidden');
            invoiceSection.classList.remove('hidden');
        }
    }

    export function checkFormFieldsValidity() {
        orderBtn.disabled = true;

        const isCustomerInfoValid =
            validateField('first-name') &&
            validateField('last-name') &&
            validateField('address1') &&
            validateField('zip-code') &&
            validateField('city') &&
            validateField('email') &&
            validateField('phone-number');

        if (!isCustomerInfoValid) {
            return;
        }

        const selectedPaymentMethod = orderForm.elements['payment-method'].value;
        let isPaymentValid = false;

        if (selectedPaymentMethod === 'card') {
            isPaymentValid =
                validateField('cardName') &&
                validateField('cardNumber') &&
                validateField('MM-YY') &&
                validateField('CVC');

        } else if (selectedPaymentMethod === 'invoice') {
            isPaymentValid = validateField('pnr');
        }

        if (!isPaymentValid || !validateGdpr()) {
            return;
        }

        orderBtn.disabled = false;
    }

    function cleanEntireOrder() {
        const userConfirmed = confirm('Är du säker på att du vill rensa hela din beställning?');

        if (userConfirmed === false) {
            return;
        }

        emptyCart();
        orderForm.reset();
        orderForm.elements['phone-number'].value = '+46';

        checkFormFieldsValidity();
        togglePaymentSections();
    }

    export function initForm() {

        orderForm.addEventListener('blur', (e) => {
            const fieldName = e.target.name;

            if (regexes[fieldName]) {
                validateField(fieldName, true);
                checkFormFieldsValidity();
            }
        }, true);

        paymentRadioBtns.forEach(radio => {
            radio.addEventListener('change', () => {
                togglePaymentSections();
                checkFormFieldsValidity();
            });
        });

        orderForm.elements['gdpr'].addEventListener('change', () => {
            validateGdpr(true);
            checkFormFieldsValidity();
        });

        const clearOrderBtn = document.querySelector('#clearOrderBtn');
        if (clearOrderBtn) {
            clearOrderBtn.addEventListener('click', cleanEntireOrder);
        }

        togglePaymentSections();
        checkFormFieldsValidity();
    }