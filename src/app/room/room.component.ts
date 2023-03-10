import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Rooms } from '../room.interface'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  roomName: string = '';

  async newRoom() {
    const modalRef = this.modalService.open(NgbModalContent, { centered: true });
    this.roomName = await modalRef.result;
    console.log(this.roomName);
  }
  constructor(private modalService: NgbModal) {}
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-content">
    <div class="modal-header">
    <p>Room Name</p>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div>
      <form class="inputClass" [formGroup]="roomForm">
        <input class="inputName" type="text" id="name" formControlName="name">
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-secondary" (click)="onSave(roomForm);isRoom = true">Save</button>
    </div>
  </div>
  `, 
  styleUrls: ['./room.component.css']
})

export class NgbModalContent {
  constructor(public activeModal: NgbActiveModal, private store: AngularFirestore) {

  }

  rooms: Rooms[] = [];

  isRoom: boolean = false;

  roomForm = new FormGroup({
    name: new FormControl('')
  });

  onSave(roomForm: FormGroup) {

    (this.store.collection('rooms').add(this.roomForm.value)).then((results) => {
      //this.rooms = results;
      this.activeModal.close(roomForm.value.name)
    });
    console.log(roomForm.value.name);
  }

  appointment?: any;
}
