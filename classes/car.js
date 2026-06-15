class Car {
    constructor(id, brand, model, pricePerDay) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.pricePerDay = pricePerDay;
        this.isAvailable = true;
    }

    rentCar() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return "Car rented successfully";
        }
        return "Car is not available";
    }

    returnCar() {
        this.isAvailable = true;
        return "Car returned successfully";
    }
}