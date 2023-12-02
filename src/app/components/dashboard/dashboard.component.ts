import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Timestamp } from 'firebase/firestore'; // Asegúrate de importar Timestamp desde el paquete correcto

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
          if (user) {
            // Asegúrate de manejar las fechas almacenadas como Timestamp
            this.userData = {
              ...user,
              sub_start: this.convertToDate(user.sub_start),
              sub_end: this.convertToDate(user.sub_end)
            };
          }
        });
      }
    });
  }

  convertToDate(value: Date | Timestamp | null | undefined): Date | null {
    if (value instanceof Date) {
      return value;
    } else if (value instanceof Timestamp) {
      return value.toDate();
    } else {
      return null;
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
