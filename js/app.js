"use strict";

// Variables
const cart = document.querySelector('#cart');
const cartContainer = document.querySelector('#cart-list tbody');
const emptyCartBtn = document.querySelector('#empty-cart');
const listCourses = document.querySelector('#course-list');
let cartItems = [];

loadEventListeners();

function loadEventListeners() {
    // When you add a course by clicking "Add to Cart"
    listCourses.addEventListener('click', addCourse);

    // Remove courses from the cart
    cart.addEventListener('click', deleteCourse);

    // Empty the cart
    emptyCartBtn.addEventListener('click', () => {
        cartItems = []; // Reset the array

        cleanHTML(); // Remove all HTML
    });
}

// Functions
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        const selectedCourse = e.target.parentElement.parentElement;
        readCourseData(selectedCourse);
    }
}

// Removes a course from the cart
function deleteCourse(e) {
    if (e.target.classList.contains('remove-course')) {
        const courseId = e.target.getAttribute('data-id');

        // Remove from the cartItems array by data-id
        cartItems = cartItems.filter(course => course.id !== courseId);

        updateCartHTML(); // Loop through the cart and update the HTML
    }
}

// Reads the content of the clicked HTML and extracts course information
function readCourseData(course) {
    // console.log(course);

    // Create an object with the current course content
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        quantity: 1,
    };

    // Check if the item already exists in the cart
    const exists = cartItems.some(course => course.id === courseInfo.id);
    if (exists) {
        // Update the quantity
        const updatedCourses = cartItems.map(course => {
            if (course.id === courseInfo.id) {
                course.quantity++;
                return course; // Return the updated object
            } else {
                return course; // Return the objects that are not duplicates
            }
        });
        cartItems = [...updatedCourses];
    } else {
        // Add items to the cart array
        cartItems = [...cartItems, courseInfo];
    }
    updateCartHTML();
}

// Displays the shopping cart in the HTML
function updateCartHTML() {
    // Clean the HTML
    cleanHTML();

    // Loop through the cart and generate the HTML
    cartItems.forEach(course => {
        const {image, title, price, quantity, id} = course;

        const row = document.createElement('tr');
        console.log(course);
        row.innerHTML = `
            <td>
                <img src="${image}" alt="${title}" width="100">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" class="remove-course" data-id="${id}"> X </a>
            </td>
        `;

        // Add the HTML of the cart to the tbody
        cartContainer.appendChild(row);
    });
}

// Removes all courses from the tbody
function cleanHTML() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
}
