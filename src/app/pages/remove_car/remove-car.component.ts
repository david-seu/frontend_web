import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GenericService } from '../../service/generic.service'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-delete_car',
  templateUrl: './remove-car.component.html',
  styleUrls: ['./remove-car.component.css'],
})
export class RemoveCarComponent implements OnInit {
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
  }

  onYes(): void {
    console.log(this.route.snapshot.queryParams['id'])
    this.service.deleteCar(this.route.snapshot.queryParams['id'])
    this.router.navigate(['showCars'])
  }

  onNo(): void {
    this.router.navigate(['showCars'])
  }
}
