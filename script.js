console.log("Script werkt");

// auto’s maken
let car1 = new Car(1, "Toyota", "Yaris", 50);
let car2 = new Car(2, "BMW", "X5", 120);

// klant maken
let customer1 = new Customer(1, "Dorsa");

// systeem maken
let system = new RentalSystem();

system.addCar(car1);
system.addCar(car2);

// testen huren
customer1.rent(car1);

console.log(system.getAvailableCars());

// tonen op pagina
document.body.innerHTML += `
    <h2>Car Rental System</h2>
    <p>${car1.brand} ${car1.model} - €${car1.pricePerDay}</p>
    <p>${car2.brand} ${car2.model} - €${car2.pricePerDay}</p>
`;