import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Car } from '../../data/car'
import { GenericService } from '../../service/generic.service'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-show-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-cars.component.html',
  styleUrls: ['./show-cars.component.css'],
})
export class ShowCarsComponent implements OnInit {
  cars: Car[] = []

  constructor(
    private service: GenericService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.refresh('')
    this.authService.isLoggedIn.subscribe((value) => {
      if (!value) {
        this.router.navigate(['']).then((_) => { })
      }
    })

  }

  refresh(brand: string): void {
    const data: Observable<Car[]> = this.service.fetchCars(brand)
    this.cars = []
    data.subscribe((cars: any[]) => {
      cars.forEach((car) => {
        this.cars.push(car)
      })
    })
  }

  navigateToDelete(carId: number): void {
    this.router
      .navigate(['removeCar'], { queryParams: { id: carId } })
      .then((_) => { })
  }

  navigateToAdd(): void {
    this.router.navigate(['addCar']).then((_) => { })
  }

  navigateToUpdate(carId: number): void {
    this.router
      .navigate(['updateCar'], { queryParams: { id: carId } })
      .then((_) => { })
  }

  logout() {
    this.authService.setLoggedIn(false);
    sessionStorage.removeItem("user")
    this.router.navigate([""]).then(_ => { });
  }
}
