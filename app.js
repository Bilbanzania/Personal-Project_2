// Use strict globally
'use strict';

// Account sign up validation (cost calculator)
var accounts = document.querySelectorAll('.account');
var totalElement = document.querySelector('#totalPrice');
var checkoutButton = document.querySelector('#checkout');
var selectedAccount = null;

// Regex patterns for validation
var nameRegex = /^[a-zA-Z ]{2,30}$/; // Full name regex
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password regex

accounts.forEach(function (account) {
    account.querySelector('button').addEventListener('click', function () {
        if (selectedAccount) {
            selectedAccount.classList.remove('selected');
        }
        account.classList.add('selected');
        selectedAccount = account;
        updateTotal();
    });
});

checkoutButton.addEventListener('click', function () {
    var fullName = document.querySelector('#fullName');
    var email = document.querySelector('#email');
    var password = document.querySelector('#password');

    if (!selectedAccount || !fullName.value || !email.value || !password.value) {
        alert('Please fill out all fields and select an account type before checking out ^_^.');
        return;
    } else if (!nameRegex.test(fullName.value)) {
        alert('Please enter a valid full name.');
        return;
    } else if (!emailRegex.test(email.value)) {
        alert('Please enter a valid email address.');
        return;
    } else if (!passwordRegex.test(password.value)) {
        alert('Password must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter.');
        return;
    }

    alert('Thank you for your order, ' + fullName.value + '! Your total is $' + totalElement.textContent + '.\nYou will receive an email shortly at ' + email.value + ' confirming your order. :3');
    selectedAccount.classList.remove('selected');
    selectedAccount = null;
    updateTotal();

    // Clear input
    fullName.value = '';
    email.value = '';
    password.value = '';
});

function updateTotal() {
    var price = selectedAccount ? selectedAccount.dataset.price : 0;
    totalElement.textContent = price;
}

// Back to the top
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

// Light dark mode switch
var themeSwitch = document.querySelector('#themeSwitch');

themeSwitch.addEventListener('change', function (event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// Contact form validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var fullName = document.getElementById('fullNameTwo');
    var phone = document.getElementById('phone');
    var email = document.getElementById('emailTwo');
    var comments = document.getElementById('comments');
    var contactPhone = document.getElementById('contactPhone');
    var contactEmail = document.getElementById('contactEmail');

    var fullNameError = document.getElementById('fullNameError');
    var phoneError = document.getElementById('phoneError');
    var emailError = document.getElementById('emailError');
    var commentsError = document.getElementById('commentsError');
    var contactPreferenceError = document.getElementById('contactPreferenceError');

    var phoneRegex = /^[0-9]{10}$/; // 10 digit phone number
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email

    var errors = false;

    // full name
    if (!fullName.value) {
        fullNameError.textContent = 'Full name is required.';
        errors = true;
    } else {
        fullNameError.textContent = '';
    }

    // phone
    if (contactPhone.checked && !phoneRegex.test(phone.value)) {
        phoneError.textContent = 'Please enter a valid 10 digit phone number.';
        errors = true;
    } else {
        phoneError.textContent = '';
    }

    // email
    if (contactEmail.checked && !emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        errors = true;
    } else {
        emailError.textContent = '';
    }

    // comments
    if (!comments.value) {
        commentsError.textContent = 'Comments are required so we know how to respond.';
        errors = true;
    } else {
        commentsError.textContent = '';
    }
    // contact preference
    if (!contactPhone.checked && !contactEmail.checked) {
        contactPreferenceError.textContent = 'Please select a contact preference.';
        errors = true;
    } else {
        contactPreferenceError.textContent = '';
    }

    if (!errors) {
        var customer = {
            fullName: fullName.value,
            phone: phone.value,
            email: email.value,
            comments: comments.value,
            contactPreference: contactPhone.checked ? 'phone' : 'email'
        };

        document.getElementById('thankYouMessage').textContent = 'Thank you for your submission, ' + customer.fullName + '! We will contact you via ' + customer.contactPreference + ' soon :3';

        // Clear input
        fullName.value = '';
        phone.value = '';
        email.value = '';
        comments.value = '';
        contactPhone.checked = false;
        contactEmail.checked = false;
    }
});