import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AppUser } from '../interfaces/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  createUserWithEmailPassword(user) {
    return this.afAuth.createUserWithEmailAndPassword(user.inputEmail, user.inputPassword)
      .then(userCredential => {

        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });
        this.afAuth.signOut();
        localStorage.removeItem('returnUrl');
        this.router.navigate(['/login']);

      })
      .catch(error => {
        throw error;
      });
  }

  loginWithEmailPassword(user) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.afAuth.signInWithEmailAndPassword(user.inputEmail, user.inputPassword)
      .catch(error => {
        throw error;
      });
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .catch(error => {
        throw error;
      });
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('returnUrl');
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid).snapshotChanges().pipe(
            map(actions => {
              const currentUser = actions.payload.val();
              currentUser['$key'] = actions.key;
              return currentUser;
            })
          );
        }
        return of(null);
      }));
  }
}
