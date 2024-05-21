import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GenericService } from '../../generic.service'

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  constructor(
    private service: GenericService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

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
      .subscribe(() => {
        this.router.navigate(['showCars']).then((_) => { })
      })
  }

  onCancel(): void {
    this.router.navigate(['showCars']).then((_) => { })
  }
}
