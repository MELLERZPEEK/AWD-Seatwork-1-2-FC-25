let cars = JSON.parse(localStorage.getItem("cars")) || [
    { id: 1, name: "Toyota Corolla", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/toyota.jpg", price: "₱3,000/day", status: "Available" },
    { id: 2, name: "Honda Civic", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/honda.jpg", price: "₱3,500/day", status: "Available" },
    { id: 3, name: "Ford Focus", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/ford.jpg", price: "₱2,800/day", status: "Available" },
    { id: 4, name: "Tesla Model 3", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/tesla.jpg", price: "₱6,000/day", status: "Available" },
    { id: 5, name: "Nissan Altima", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/nissan.jpg", price: "₱3,200/day", status: "Available" },
    { id: 6, name: "BMW 3 Series", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/bmw.jpg", price: "₱5,500/day", status: "Available" },
    { id: 7, name: "Mercedes-Benz C-Class", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/mercedes.jpg", price: "₱6,500/day", status: "Available" },
    { id: 8, name: "Hyundai Elantra", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/hyundai.jpg", price: "₱2,900/day", status: "Available" },
    { id: 9, name: "Chevrolet Malibu", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/chevrolet.jpg", price: "₱3,300/day", status: "Available" },
    { id: 10, name: "Audi A4", image: "https://mellerzpeek.github.io/AWD-Seatwork-1-2-FC-25/assets/img/audi.jpg", price: "₱7,000/day", status: "Available" }
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
    if (!carList) return;
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
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    
    document.getElementById("car-modal-image").src = car.image;
    document.getElementById("car-name").textContent = car.name;
    document.getElementById("car-price").textContent = `Price: ${car.price}`;
    document.getElementById("car-status").innerHTML = `Status: <strong>${car.status}</strong>`;
    
    if (car.status === "Rented" && rentals[carId]) {
        document.getElementById("car-status").innerHTML += `<br>Return Date: <strong>${rentals[carId].returnDate}</strong>`;
        document.getElementById("rent-button").style.display = "none";
    } else {
        document.getElementById("rent-button").style.display = "block";
        document.getElementById("rent-button").onclick = () => openRentalForm(carId);
    }
    
    document.getElementById("rental-form").style.display = "none";
    document.getElementById("rented-message").style.display = "none";
    document.getElementById("car-modal").style.display = "flex";
}

function closeCarModal() {
    document.getElementById("car-modal").style.display = "none";
    displayCars();
}

function openRentalForm(carId) {
    document.getElementById("rent-button").style.display = "none";
    document.getElementById("rental-form").style.display = "block";
    document.getElementById("rental-form").onsubmit = (event) => submitRentalForm(event, carId);
}

function submitRentalForm(event, carId) {
    event.preventDefault();
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const fullName = document.getElementById("full-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const pickupDate = document.getElementById("pickup-datetime").value;
    const returnDate = document.getElementById("return-datetime").value;
    const pickupLocation = document.getElementById("pickup-location").value;
    const returnLocation = document.getElementById("return-location").value;
    
    car.status = "Rented";
    rentals[carId] = { fullName, contactNumber, pickupDate, returnDate, pickupLocation, returnLocation };
    saveToLocalStorage();
    
    document.getElementById("rental-form").style.display = "none";
    document.getElementById("rented-message").style.display = "block";
    document.getElementById("rental-details").innerHTML = `
        Thank you, ${fullName}! You have successfully rented the ${car.name}.
        Pickup: ${pickupLocation} on ${pickupDate}.
        Return: ${returnLocation} on ${returnDate}.
        Contact: ${contactNumber}`;
    
    closeCarModal();
}


updateCarAvailability();
displayCars();
