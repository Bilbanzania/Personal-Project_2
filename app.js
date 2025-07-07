'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Collapsible Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    navToggle.addEventListener('click', () => {
        const isVisible = primaryNav.getAttribute('data-visible');
        if (isVisible === 'false' || !isVisible) {
            primaryNav.setAttribute('data-visible', true);
            navToggle.setAttribute('aria-expanded', true);
        } else {
            primaryNav.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
        }
    });

    // Theme Switcher Logic
    const themeSwitch = document.querySelector('#themeSwitch');
    const themeLabel = document.querySelector('.theme-label');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeSwitch.checked = true;
            themeLabel.textContent = 'Dark Mode';
        } else {
            themeSwitch.checked = false;
            themeLabel.textContent = 'Light Mode';
        }
    };

    themeSwitch.addEventListener('change', (event) => {
        setTheme(event.target.checked ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Account Sign-Up Form
    const accounts = document.querySelectorAll('.account');
    const totalElement = document.querySelector('#totalPrice');
    const checkoutButton = document.querySelector('#checkout');
    let selectedAccount = null;

    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    accounts.forEach((account) => {
        account.querySelector('button').addEventListener('click', () => {
            if (selectedAccount) {
                selectedAccount.classList.remove('selected');
            }
            account.classList.add('selected');
            selectedAccount = account;
            updateTotal();
        });
    });

    checkoutButton.addEventListener('click', () => {
        const fullName = document.querySelector('#fullName');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');

        if (!selectedAccount || !fullName.value || !email.value || !password.value) {
            alert('Please fill out all fields and select an account type.');
            return;
        }
        if (!nameRegex.test(fullName.value)) {
            alert('Please enter a valid full name.');
            return;
        }
        if (!emailRegex.test(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordRegex.test(password.value)) {
            alert('Password must be at least 8 characters long and include at least one number, one lowercase and one uppercase letter.');
            return;
        }

        alert(`Thank you for your order, ${fullName.value}! Your total is $${totalElement.textContent}.`);

        if (selectedAccount) {
            selectedAccount.classList.remove('selected');
        }
        selectedAccount = null;
        updateTotal();

        fullName.value = '';
        email.value = '';
        password.value = '';
    });

    function updateTotal() {
        const price = selectedAccount ? selectedAccount.dataset.price : 0;
        totalElement.textContent = price;
    }

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = document.getElementById('fullNameTwo');
        const phone = document.getElementById('phone');
        const email = document.getElementById('emailTwo');
        const comments = document.getElementById('comments');
        const contactPhone = document.getElementById('contactPhone');
        const contactEmail = document.getElementById('contactEmail');

        const fullNameError = document.getElementById('fullNameError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const commentsError = document.getElementById('commentsError');
        const contactPreferenceError = document.getElementById('contactPreferenceError');

        const phoneRegex = /^[0-9]{10}$/;
        let errors = false;

        fullNameError.textContent = !fullName.value ? 'Full name is required.' : '';
        if (!fullName.value) errors = true;

        phoneError.textContent = (contactPhone.checked && !phoneRegex.test(phone.value)) ? 'Please enter a valid 10 digit phone number.' : '';
        if (contactPhone.checked && !phoneRegex.test(phone.value)) errors = true;

        emailError.textContent = (contactEmail.checked && !emailRegex.test(email.value)) ? 'Please enter a valid email address.' : '';
        if (contactEmail.checked && !emailRegex.test(email.value)) errors = true;

        commentsError.textContent = !comments.value ? 'Comments are required.' : '';
        if (!comments.value) errors = true;

        contactPreferenceError.textContent = (!contactPhone.checked && !contactEmail.checked) ? 'Please select a contact preference.' : '';
        if (!contactPhone.checked && !contactEmail.checked) errors = true;

        if (!errors) {
            const customer = {
                fullName: fullName.value,
                contactPreference: contactPhone.checked ? 'phone' : 'email'
            };

            document.getElementById('thankYouMessage').textContent = `Thank you for your submission, ${customer.fullName}! We will contact you via ${customer.contactPreference} soon.`;

            document.getElementById('contactForm').reset();
        }
    });

    // Back to Top Button
    window.onscroll = () => {
        const backToTopButton = document.getElementById("back-to-top");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
});