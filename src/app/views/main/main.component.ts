import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Aquí puedes realizar lógica específica para el componente 'main' después de que se haya iniciado.
    // Por ejemplo, cargar datos, realizar alguna lógica específica del usuario autenticado, etc.

    if (this.authService.isLoggedIn) {
      console.log('El usuario está autenticado. Puedes realizar acciones adicionales aquí.');
    } else {
      console.log('El usuario no está autenticado. Esto debería ser manejado por el guardia de ruta.');
      // Podrías también redirigir al usuario a la página de inicio de sesión aquí si lo consideras necesario.
    }
  }
}