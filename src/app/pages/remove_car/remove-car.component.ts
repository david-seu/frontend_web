import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GenericService } from '../../generic.service'

@Component({
  selector: 'app-delete_car',
  templateUrl: './remove-car.component.html',
  styleUrls: ['./remove-car.component.css'],
})
export class DeleteCarComponent implements OnInit {
  constructor(
    private service: GenericService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  onYes(): void {
    this.service.deleteCar(this.route.snapshot.queryParams['id'])
    this.router.navigate(['showCars']).then((_) => { })
  }

  onNo(): void {
    this.router.navigate(['showCars']).then((_) => { })
  }
}
