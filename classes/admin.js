class Admin extends User {
    constructor(id, name) {
        super(id, name);
    }

    addCar(carList, car) {
        carList.push(car);
    }

    removeCar(carList, carId) {
        return carList.filter(car => car.id !== carId);
    }
}