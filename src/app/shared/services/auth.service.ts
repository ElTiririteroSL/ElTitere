import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) {
    this.firebaseAuthenticationService.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));

          // Utilizamos el servicio de usuario para obtener el username
          return this.userService.getUserById(user.uid);
        } else {
          localStorage.setItem('user', 'null');
          return of(null);
        }
      })
    ).subscribe((user) => {
      if (user) {
        // Si hay información del usuario en la base de datos, actualizamos el userData
        this.userData = { ...this.userData, ...user };
      }
    });
  }

  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  signUpWithEmailAndPassword(email: string, password: string, username: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        if (user && user.uid) {
          const additionalUserData: Partial<User> = {
            id: user.uid,
            email: user.email || null,
            username: username || '', // Asigna un valor predeterminado si username es undefined
            active: true,
            subscribed: false,
            sub_start: null,
            sub_end: null,
            admin: false
          };
  
          this.userData = user;
          this.userData.username = username || '';
  
          await this.userService.createUser(additionalUserData);
  
          this.observeUserState();
        } else {
          alert('User registration failed.');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']));
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  getAuthState() {
    return this.firebaseAuthenticationService.authState;
  }

  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  getCurrentUserId(): string | null {
    return this.userData?.uid || null;
  }

  getCurrentUsername(): Observable<string> {
    return of(this.userData?.username || 'Usuario Anónimo');
  }
}
