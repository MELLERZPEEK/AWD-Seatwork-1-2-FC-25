document.addEventListener("DOMContentLoaded", function () {
    let cars = localStorage.getItem("cars");
    cars = cars ? JSON.parse(cars) : [
        { id: 1, name: "Toyota Corolla", image: "assets/images/toyota.jpg", price: "₱3,000/day", status: "Available" },
        { id: 2, name: "Honda Civic", image: "assets/images/honda.jpg", price: "₱3,500/day", status: "Available" },
        { id: 3, name: "Ford Focus", image: "assets/images/ford.jpg", price: "₱2,800/day", status: "Available" },
        { id: 4, name: "Tesla Model 3", image: "assets/images/tesla.jpg", price: "₱6,000/day", status: "Available" },
        { id: 5, name: "Nissan Altima", image: "assets/images/nissan.jpg", price: "₱3,200/day", status: "Available" },
        { id: 6, name: "BMW 3 Series", image: "assets/images/bmw.jpg", price: "₱5,500/day", status: "Available" },
        { id: 7, name: "Mercedes-Benz C-Class", image: "assets/images/mercedes.jpg", price: "₱6,500/day", status: "Available" },
        { id: 8, name: "Hyundai Elantra", image: "assets/images/hundai.jpg", price: "₱2,900/day", status: "Available" }, 
        { id: 9, name: "Chevrolet Malibu", image: "assets/images/chevrolet.jpg", price: "₱3,300/day", status: "Available" },
        { id: 10, name: "Audi A4", image: "assets/images/audi.jpg", price: "₱7,000/day", status: "Available" }
    ];

    let rentals = localStorage.getItem("rentals");
    rentals = rentals ? JSON.parse(rentals) : {};

    function saveToLocalStorage() {
        localStorage.setItem("cars", JSON.stringify(cars));
        localStorage.setItem("rentals", JSON.stringify(rentals));
    }

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

    window.openCarModal = function (carId) {
        const car = cars.find(car => car.id === carId);
        if (!car) return;

        document.getElementById("car-modal-image").src = car.image;
        document.getElementById("car-name").textContent = car.name;
        document.getElementById("car-price").textContent = `Price: ${car.price}`;
        document.getElementById("car-status").innerHTML = `Status: ${car.status}`;

        document.getElementById("rent-button").style.display = car.status === "Available" ? "inline-block" : "none";
        document.getElementById("rental-form").style.display = "none";
        document.getElementById("rented-message").style.display = "none";
        document.getElementById("car-modal").style.display = "flex";

        document.getElementById("rent-button").onclick = function () {
            document.getElementById("rental-form").style.display = "block";
        };
    };

    window.closeCarModal = function () {
        document.getElementById("car-modal").style.display = "none";
        displayCars();
    };

    document.getElementById("rental-form").onsubmit = function (event) {
        event.preventDefault();

        const carId = cars.find(car => car.name === document.getElementById("car-name").textContent).id;
        const fullName = document.getElementById("full-name").value;
        const contactNumber = document.getElementById("contact-number").value;
        const pickupDate = document.getElementById("pickup-datetime").value;
        const returnDate = document.getElementById("return-datetime").value;

        cars.find(car => car.id === carId).status = "Rented";
        rentals[carId] = { fullName, contactNumber, pickupDate, returnDate };

        saveToLocalStorage();

        document.getElementById("rental-form").style.display = "none";
        document.getElementById("rented-message").style.display = "block";
        document.getElementById("rental-details").innerHTML = `Thank you, ${fullName}! You have rented the ${cars.find(car => car.id === carId).name}.`;

        setTimeout(() => {
            closeCarModal();
        }, 2000);
    };

    displayCars();
});
