import { AppUser } from './../interfaces/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  saveUser(user: firebase.User) {
    //to use Cloud Firestore with AngularFirestore
    /* this.db.collection(`users`).doc(user.uid).set({
      name: user.displayName,
      email: user.email
    }, {merge: true}); */

    //to use Fire Realtime Database with AngularFireDatabase

    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });




  }

  getUser(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
