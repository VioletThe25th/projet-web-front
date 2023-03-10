import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { Rooms } from '../room.interface'
import { ModalDeviceComponent } from './modalDevice.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  @Input() room: Rooms | undefined; 


  createRoom() {
    const modalRef = this.modalService.open(NgbModalContent, { centered: true });
  }

  createDevice(roomId: string | undefined) {
    const modalRef = this.modalService.open(ModalDeviceComponent, { centered: true });
    modalRef.componentInstance.roomId = roomId;
  }

  constructor(private modalService: NgbModal, private store: AngularFirestore) {}
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
  constructor(public activeModal: NgbActiveModal, private store: AngularFirestore) {}

  isRoom: boolean = false;

  roomForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(Date.now()),
  });

  onSave(roomForm: FormGroup) {

    (this.store.collection('rooms').add(this.roomForm.value)).then((results) => {
      this.activeModal.close(roomForm.value.name)
    });
    console.log(roomForm.value);
  }
}
