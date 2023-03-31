import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { orderBy } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Rooms } from '../room.interface';

export interface Users {
  email: string,
  password: string,
  id: string,
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  users: Users[] = [];

  rooms: Observable<Rooms[]>;
  constructor (private store: AngularFirestore) {

    (this.store.collection('users').valueChanges({ idField: 'id' }) as Observable<Users[]>).subscribe((results) => {
      this.users = results;
    });
    this.rooms = this.store.collection('rooms', ref => ref.orderBy('date')).valueChanges({ idField: 'id' }) as Observable<Rooms[]>;
    console.log(this.rooms);
  }
}
