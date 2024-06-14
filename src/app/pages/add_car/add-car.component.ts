import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GenericService } from '../../service/generic.service'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-add-car',
  standalone: true,
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  constructor(
    private service: GenericService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((value) => {
      if (!value) {
        this.router.navigate(['']).then((_) => { })
      }
    })
  }

  addCar(
    brand: string,
    model: string,
    year: number,
    mileage: number,
    price: number,
    condition: string,
    transmission: string,
    fuel_type: string,
    engine_size: number,
    fuel_effieciency: number,
    color: string,
  ): void {
    this.service
      .addCar(
        brand,
        model,
        year,
        mileage,
        price,
        condition,
        transmission,
        fuel_type,
        engine_size,
        fuel_effieciency,
        color,
      )
    this.router.navigate(['showCars'])

  }

  onCancel(): void {
    this.router.navigate(['showCars']).then((_) => { })
  }
}
