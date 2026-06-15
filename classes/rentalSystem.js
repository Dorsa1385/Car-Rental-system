class RentalSystem {
    constructor() {
        this.cars = [];
        this.users = [];
    }

    addCar(car) {
        this.cars.push(car);
    }

    getAvailableCars() {
        return this.cars.filter(car => car.isAvailable);
    }
}