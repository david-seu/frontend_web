import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GenericService } from '../../service/generic.service'
import { Car } from '../../data/car'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css'],
})
export class UpdateCarComponent implements OnInit {
  car: Car = {
    id: 0,
    brand: '',
    model: '',
    year: 0,
    mileage: 0,
    price: 0,
    condition: '',
    transmission: '',
    fuelType: '',
    engineSize: 0,
    fuelEfficiency: 0,
    color: ''
  }

  constructor(
    private service: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((value) => {
      if (!value) {
        this.router.navigate(['']).then((_) => { })
      }
    })
    const id = this.route.snapshot.queryParams['id']
    this.service.getCarById(id).subscribe((car: any) => {
      this.car = car
    })
  }

  updateCar(
  ): void {
    const id = this.route.snapshot.queryParams['id']
    this.service
      .updateCar(
        id,
        this.car.brand,
        this.car.model,
        this.car.year,
        this.car.mileage,
        this.car.price,
        this.car.condition,
        this.car.transmission,
        this.car.fuelType,
        this.car.engineSize,
        this.car.fuelEfficiency,
        this.car.color,
      )
    this.router.navigate(['showCars']).then((_) => { })

  }

  onCancel(): void {
    this.router.navigate(['showCars']).then((_) => { })
  }
}
