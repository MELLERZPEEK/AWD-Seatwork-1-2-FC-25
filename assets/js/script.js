let cars = JSON.parse(localStorage.getItem("cars")) || [
    { id: 1, name: "Toyota Corolla", image: "assets/img/toyota.jpg", price: "₱3,000/day", status: "Available" },
    { id: 2, name: "Honda Civic", image: "assets/img/honda.jpg", price: "₱3,500/day", status: "Available" },
    { id: 3, name: "Ford Focus", image: "assets/img/ford.jpg", price: "₱2,800/day", status: "Available" },
    { id: 4, name: "Tesla Model 3", image: "assets/img/tesla.jpg", price: "₱6,000/day", status: "Available" },
    { id: 5, name: "Nissan Altima", image: "assets/img/nissan.jpg", price: "₱3,200/day", status: "Available" },
    { id: 6, name: "BMW 3 Series", image: "assets/img/bmw.jpg", price: "₱5,500/day", status: "Available" },
    { id: 7, name: "Mercedes-Benz C-Class", image: "assets/img/mercedes.jpg", price: "₱6,500/day", status: "Available" },
    { id: 8, name: "Hyundai Elantra", image: "assets/img/hundai.jpg", price: "₱2,900/day", status: "Available" },
    { id: 9, name: "Chevrolet Malibu", image: "assets/img/chevrolet.jpg", price: "₱3,300/day", status: "Available" },
    { id: 10, name: "Audi A4", image: "assets/img/audi.jpg", price: "₱7,000/day", status: "Available" }
];

];

let rentals = JSON.parse(localStorage.getItem("rentals")) || {};

function saveToLocalStorage() {
    localStorage.setItem("cars", JSON.stringify(cars));
    localStorage.setItem("rentals", JSON.stringify(rentals));
}

function updateCarAvailability() {
    const now = new Date();

    cars.forEach(car => {
        if (car.status === "Rented" && rentals[car.id]) {
            const returnDate = new Date(rentals[car.id].returnDate);

            if (now >= returnDate) {
                car.status = "Available";
                delete rentals[car.id];
            }
        }
    });

    saveToLocalStorage();
}

function displayCars() {
    updateCarAvailability();

    const carList = document.getElementById("car-list");
    carList.innerHTML = "";

    cars.forEach(car => {
        const carDiv = document.createElement("div");
        carDiv.classList.add("car");
        carDiv.innerHTML = `
            <img src="${car.image}" alt="${car.name}" onclick="openCarModal(${car.id})">
            <h3>${car.name}</h3>
            <p>Status: <strong>${car.status}</strong></p>
            <p class="price">${car.price}</p>
        `;
        carList.appendChild(carDiv);
    });
}

function openCarModal(carId) {
    const car = cars.find(car => car.id === carId);
    if (!car) return;

    document.getElementById("car-modal-image").src = car.image;
    document.getElementById("car-name").textContent = car.name;
    document.getElementById("car-status").textContent = `Status: ${car.status}`;
    document.getElementById("car-price").textContent = `Price: ${car.price}`;

    const rentButton = document.getElementById("rent-button");
    const rentalForm = document.getElementById("rental-form");
    const rentedMessage = document.getElementById("rented-message");

    if (car.status === "Rented") {
        rentButton.style.display = "none";
        rentalForm.style.display = "none";
        rentedMessage.style.display = "block";
        document.getElementById("rental-details").textContent = `Rented until: ${rentals[car.id].returnDate}`;
    } else {
        rentButton.style.display = "inline-block";
        rentalForm.style.display = "none";
        rentedMessage.style.display = "none";
    }

    rentButton.onclick = function () {
        rentalForm.style.display = "block";
        rentButton.style.display = "none";
    };

    document.getElementById("car-modal").style.display = "flex";

    document.getElementById("rental-form").onsubmit = function (event) {
        event.preventDefault();
        rentCar(carId);
    };
}

function closeCarModal() {
    document.getElementById("car-modal").style.display = "none";
    displayCars();
}

function rentCar(carId) {
    const car = cars.find(car => car.id === carId);
    if (!car || car.status === "Rented") return;

    const fullName = document.getElementById("full-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const pickupDate = document.getElementById("pickup-datetime").value;
    const returnDate = document.getElementById("return-datetime").value;
    const pickupLocation = document.getElementById("pickup-location").value;
    const returnLocation = document.getElementById("return-location").value;

    if (!fullName || !contactNumber || !pickupDate || !returnDate || !pickupLocation || !returnLocation) {
        alert("Please fill out all fields.");
        return;
    }

    car.status = "Rented";
    rentals[car.id] = {
        fullName,
        contactNumber,
        pickupDate,
        returnDate,
        pickupLocation,
        returnLocation
    };

    saveToLocalStorage();

    document.getElementById("rental-form").style.display = "none";
    document.getElementById("rented-message").style.display = "block";
    document.getElementById("rental-details").textContent = `Rented until: ${returnDate}`;

    displayCars();
}

updateCarAvailability();
displayCars();
