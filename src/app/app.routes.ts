import { Routes } from '@angular/router';
import { ShowCarsComponent } from './pages/show_cars/show_cars.component';
import { AddCarComponent } from './pages/add_car/add-car.component';
import { UpdateCarComponent } from './pages/update_car/update-car.component';
import { DeleteCarComponent as RemoveCarComponent } from './pages/remove_car/remove-car.component';


export const routes: Routes = [
    { path: '', redirectTo: '/showCars', pathMatch: 'full' },
    { path: 'showCars', component: ShowCarsComponent },
    { path: 'addCar', component: AddCarComponent },
    { path: 'updateCar', component: UpdateCarComponent },
    { path: 'removeCar', component: RemoveCarComponent },
];
