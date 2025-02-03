// Car data with image URLs and rental prices
const cars = [
    { id: 1, name: "Toyota Corolla", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/toyota.jpg", price: "₱3,000/day", status: "Available" }
    { id: 2, name: "Honda Civic", image: "img/honda.jpg", price: "₱3,500/day", status: "Available" },
    { id: 3, name: "Ford Focus", image: "img/ford.jpg", price: "₱2,800/day", status: "Available" },
    { id: 4, name: "Tesla Model 3", image: "img/tesla.jpg", price: "₱6,000/day", status: "Available" },
    { id: 5, name: "Nissan Altima", image: "img/nissan.jpg", price: "₱3,200/day", status: "Available" },
    { id: 6, name: "BMW 3 Series", image: "img/bmw.jpg", price: "₱5,500/day", status: "Available" },
    { id: 7, name: "Mercedes-Benz C-Class", image: "img/mercedes.jpg", price: "₱6,500/day", status: "Available" },
    { id: 8, name: "Hyundai Elantra", image: "img/hundai.jpg", price: "₱2,900/day", status: "Available" },
    { id: 9, name: "Chevrolet Malibu", image: "img/chevrolet.jpg", price: "₱3,300/day", status: "Available" },
    { id: 10, name: "Audi A4", image: "img/audi.jpg", price: "₱7,000/day", status: "Available" }
];

// Display Cars
function displayCars() {
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

// Open Car Details Modal
function openCarModal(carId) {
    const car = cars.find(car => car.id === carId);
    if (car) {
        document.getElementById("car-modal-image").src = car.image;
        document.getElementById("car-name").textContent = car.name;
        document.getElementById("car-status").textContent = `Status: ${car.status}`;
        document.getElementById("car-price").textContent = `Price: ${car.price}`;

        // Show rent button only if available
        if (car.status === "Available") {
            document.getElementById("rent-button").style.display = "inline-block";
            document.getElementById("rental-form").style.display = "none";
            document.getElementById("rented-message").style.display = "none";
        } else {
            document.getElementById("rent-button").style.display = "none";
        }

        document.getElementById("car-modal").style.display = "flex";
        document.getElementById("rent-button").onclick = function () {
            openRentalForm(carId);
        };
    }
}

// Close Car Details Modal
function closeCarModal() {
    document.getElementById("car-modal").style.display = "none";
    displayCars(); // Refresh the car list to update status
}

// Show the rental form
function openRentalForm(carId) {
    document.getElementById("rent-button").style.display = "none";
    document.getElementById("rental-form").style.display = "block";
    document.getElementById("rental-form").onsubmit = function (event) {
        submitRentalForm(event, carId);
    };
}

// Submit Rental Form
function submitRentalForm(event, carId) {
    event.preventDefault();

    const car = cars.find(car => car.id === carId);
    if (!car) return;

    const fullName = document.getElementById("full-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const pickupDate = document.getElementById("pickup-datetime").value;
    const returnDate = document.getElementById("return-datetime").value;
    const pickupLocation = document.getElementById("pickup-location").value;
    const returnLocation = document.getElementById("return-location").value;

    // Update car status
    car.status = "Rented";

    // Hide rental form, show confirmation message
    document.getElementById("rental-form").style.display = "none";
    document.getElementById("rented-message").style.display = "block";
    document.getElementById("rental-details").textContent = `
        Thank you, ${fullName}! You have successfully rented the ${car.name}.
        Pickup: ${pickupLocation} on ${pickupDate}.
        Return: ${returnLocation} on ${returnDate}.
        Contact: ${contactNumber}
    `;

    // Refresh the displayed status in modal
    document.getElementById("car-status").textContent = `Status: ${car.status}`;

    // Update the main car list when modal is closed
    setTimeout(closeCarModal, 2000); // Close modal after 2 seconds
}

// Initialize page
displayCars();
