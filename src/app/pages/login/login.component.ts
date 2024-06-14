
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GenericService } from '../../service/generic.service';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(private service: GenericService, private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
    }

    login(username: string, password: string) {
        this.service.login(username, password).subscribe((thing: null) => {
            if (thing != null) {
                this.authService.setLoggedIn(true);
                this.router.navigate(['showCars']).then(_ => { });
            } else alert("Invalid credentials!")
        });
    }

    register(username: string, password: string) {
        this.service.register(username, password).subscribe((thing: null) => {
            if (thing != null) {
                this.authService.setLoggedIn(true);
                sessionStorage.setItem("user", "true")
                this.router.navigate(['showCars']).then(_ => { });
            } else alert("Username already exists!")
        });
    }

}
