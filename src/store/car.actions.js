import { carService } from "../services/car.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadCars() {
    return (dispatch) => {
        carService.query()
            .then(cars => {
                console.log('Cars from DB:', cars)
                dispatch({
                    type: 'SET_CARS',
                    cars
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load cars')
                console.log('Cannot load cars', err)
            })

        carService.subscribe((cars) => {
            console.log('Got notified');
            dispatch({
                type: 'SET_CARS',
                cars
            })
        })
    }
}

export function onRemoveCar(carId) {
    return (dispatch, getState) => {
        carService.remove(carId)
            .then(() => {
                console.log('Deleted Succesfully!');
                dispatch({
                    type: 'REMOVE_CAR',
                    carId
                })
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove car')
                console.log('Cannot remove car', err)
            })
    }
}

export function onAddCar() {
    return (dispatch) => {
        const car = carService.getEmptyCar();
        carService.save(car)
            .then(savedCar => {
                console.log('Added Car', savedCar);
                dispatch({
                    type: 'ADD_CAR',
                    car: savedCar
                })
                showSuccessMsg('Car added')
            })
            .catch(err => {
                showErrorMsg('Cannot add car')
                console.log('Cannot add car', err)
            })
    }
}

export function onEditCar(carToSave) {
    return (dispatch) => {
        carService.save(carToSave)
            .then(savedCar => {
                console.log('Updated Car:', savedCar);
                dispatch({
                    type: 'UPDATE_CAR',
                    car: savedCar
                })
                showSuccessMsg('Car updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
                console.log('Cannot save car', err)
            })
    }
}

export function addToCart(car) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            car
        })
    }
}



// Demo for Optimistic Mutation (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveCarOptimistic(carId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_CAR',
            carId
        })
        showSuccessMsg('Car removed')

        carService.remove(carId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove car')
                console.log('Cannot load cars', err)
                dispatch({
                    type: 'UNDO_REMOVE_CAR',
                })
            })
    }
}