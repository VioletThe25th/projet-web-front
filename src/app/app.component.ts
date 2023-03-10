import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Users {
  email: string,
  password: string,
  id: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  users: Users[] = [];

  constructor (private store: AngularFirestore) {

    (this.store.collection('users').valueChanges({ idField: 'id' }) as Observable<Users[]>).subscribe((results) => {
      this.users = results;
    });
    this.store.collection('rooms').valueChanges({ idField: 'id' });
    
  }
}
