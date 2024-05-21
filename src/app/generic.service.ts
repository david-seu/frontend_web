import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from './data/car';

@Injectable({
    providedIn: 'root'
})
export class GenericService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    private backendUrl = 'http://localhost/web_lab/backend/';

    constructor(private http: HttpClient) {
    }

    fetchCars(): Observable<Car[]> {
        /* body of the method */
        return this.http.get<Car[]>(this.backendUrl + `showCars.php`)
            .pipe(catchError(this.handleError<Car[]>('fetchStudents', []))
            );
    }

    deleteCar(carId: number): Observable<any> {
        return this.http.post(this.backendUrl + `removeCar.php`, { id: carId });
    }

    getCarById(carId: number): Observable<Car> {
        return this.http.get<Car>(this.backendUrl + `getCarById.php?id=${carId}`)
            .pipe(catchError(this.handleError<Car>('getCarById', undefined))
            );
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

        const formData = new FormData();
        formData.append('brand', brandOf);
        formData.append('model', modelOf);
        formData.append('year', yearOf.toString());
        formData.append('mileage', mileageOf.toString());
        formData.append('price', priceOf.toString());
        formData.append('condition', conditionOf);
        formData.append('transmission', transmissionOf);
        formData.append('fuel_type', fuel_typeOf);
        formData.append('engine_size', engine_sizeOf.toString());
        formData.append('fuel_effieciency', fuel_effieciencyOf.toString());
        formData.append('color', colorOf);

        return this.http.post(this.backendUrl + `addCar.php`, formData);
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
        return this.http.post(this.backendUrl + `updateCar.php`, {
            id: idOf,
            brand: brandOf,
            model: modelOf,
            year: yearOf,
            mileage: mileageOf,
            price: priceOf,
            condition: conditionOf,
            transmission: transmissionOf,
            fuel_type: fuel_typeOf,
            engine_size: engine_sizeOf,
            fuel_effieciency: fuel_effieciencyOf,
            color: colorOf
        });
    }

    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}