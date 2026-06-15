class Customer extends User {
    constructor(id, name) {
        super(id, name);
        this.rentedCars = [];
    }

    rent(car) {
        if (car.isAvailable) {
            car.rentCar();
            this.rentedCars.push(car);
        }
    }

    returnCar(car) {
        car.returnCar();
        this.rentedCars = this.rentedCars.filter(c => c.id !== car.id);
    }
}