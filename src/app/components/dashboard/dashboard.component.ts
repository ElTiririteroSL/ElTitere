import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: User | undefined;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    // Espera a que se emita el valor de authState antes de obtener el ID del usuario
    this.authService.getAuthState().subscribe((userState) => {
      const userId = userState ? userState.uid : null;

      if (userId) {
        // Llama al servicio de usuario para obtener los datos del usuario
        this.userService.getUserById(userId).subscribe((user) => {
          this.userData = user;
        });
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
