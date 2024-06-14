import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../data/car';

@Injectable({
    providedIn: 'root'
})
export class GenericService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    private backendUrl = 'http://localhost:5194';

    constructor(private http: HttpClient) {
    }

    fetchCars(brand: string): Observable<Car[]> {
        /* body of the method */
        const result = this.http.get<Car[]>(this.backendUrl + `/api/Car?brand=${brand}`)
            .pipe(catchError(this.handleError<Car[]>('fetchCars', []))
            );
        result.subscribe();
        return result;
    }

    deleteCar(carId: number): Observable<any> {
        const reuslt = this.http.delete(this.backendUrl + `/api/Car/${carId}`);
        reuslt.subscribe();
        return reuslt;
    }

    getCarById(carId: number): Observable<Car> {
        const result = this.http.get<Car>(this.backendUrl + `/api/Car/${carId}`)
            .pipe(catchError(this.handleError<Car>('getCarById', undefined))
            );
        result.subscribe();
        return result;
    }

    addCar(brandOf: string,
        modelOf: string,
        yearOf: number,
        mileageOf: number,
        priceOf: number,
        conditionOf: string,
        transmissionOf: string,
        fuel_typeOf: string,
        engine_sizeOf: number,
        fuel_effieciencyOf: number,
        colorOf: string
    ): Observable<any> {

        const result = this.http.post(this.backendUrl + '/api/Car', {
            id: 0,
            brand: brandOf,
            model: modelOf,
            year: yearOf,
            mileage: mileageOf,
            price: priceOf,
            condition: conditionOf,
            transmission: transmissionOf,
            fuelType: fuel_typeOf,
            engineSize: engine_sizeOf,
            fuelEffieciency: fuel_effieciencyOf,
            color: colorOf
        });
        result.subscribe();
        return result;
    }

    updateCar(
        idOf: number,
        brandOf: string,
        modelOf: string,
        yearOf: number,
        mileageOf: number,
        priceOf: number,
        conditionOf: string,
        transmissionOf: string,
        fuel_typeOf: string,
        engine_sizeOf: number,
        fuel_effieciencyOf: number,
        colorOf: string
    ): Observable<any> {
        console.log(idOf, brandOf, modelOf, yearOf, mileageOf, priceOf, conditionOf, transmissionOf, fuel_typeOf, engine_sizeOf, fuel_effieciencyOf, colorOf)
        const result = this.http.put(this.backendUrl + '/api/Car', {
            id: idOf,
            brand: brandOf,
            model: modelOf,
            year: yearOf,
            mileage: mileageOf,
            price: priceOf,
            condition: conditionOf,
            transmission: transmissionOf,
            fuelType: fuel_typeOf,
            engineSize: engine_sizeOf,
            fuelEffieciency: fuel_effieciencyOf,
            color: colorOf
        });
        result.subscribe();
        return result;
    }

    login(username: string, password: string): Observable<any> {
        const result = this.http.post(this.backendUrl + `/api/User/signIn?username=${username}&password=${password}`, {})
        return result
    }

    register(username: string, password: string): Observable<any> {
        const result = this.http.post(this.backendUrl + `/api/User`, {
            id: 0,
            username: username,
            password: password,
        })
        return result
    }

    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}