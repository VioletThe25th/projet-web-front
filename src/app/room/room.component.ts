import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { Devices, Rooms } from '../room.interface'
import { ModalDeviceComponent } from './modalDevice.component';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  isAdmin = this.AuthService.isAdmin;

  roomId: string | undefined;

  @Input() room: Rooms | undefined; 

  createRoom() {
    const modalRef = this.modalService.open(NgbModalContent, { centered: true });
  }

  createDevice(roomId: string | undefined) {
    const modalRef = this.modalService.open(ModalDeviceComponent, { centered: true });
    modalRef.componentInstance.roomId = roomId;
  }

  modifyDevice(roomId: string | undefined) {
    const modalRef = this.modalService.open(ModalDeviceComponent, { centered: true });
    modalRef.componentInstance.roomId = roomId;
  }

  constructor(private modalService: NgbModal, private store: AngularFirestore, public AuthService: AuthService ) {

  }

  onDeviceClick(event: Event, device: Devices): void {
    if (this.room && device.type === 'Bulb') {
      const target = event.currentTarget as HTMLElement;
      device.isOn = !device.isOn;
      if (device.isOn) {
        target.style.backgroundColor = 'yellow';
        this.store.doc(`rooms/${this.roomId}`).update({ isOn: device.isOn });
      } else {
        target.style.backgroundColor = 'white';
        this.store.doc(`rooms/${this.roomId}`).update({ isOn: device.isOn });
      }
      console.log("is it On ?", device.isOn);
    }
    if (device.type === 'Alarm' && this.isAdmin) {
      const target = event.currentTarget as HTMLElement;
      if (target.style.backgroundColor === 'blue') {
        target.style.backgroundColor = "white";
      } else {
        target.style.backgroundColor = 'blue';
      }
    }
    if (device.type === 'Surveillance camera' && this.isAdmin) {
      const target = event.currentTarget as HTMLElement;
      if (target.style.backgroundColor === 'red') {
        target.style.backgroundColor = "white";
      } else {
        target.style.backgroundColor = 'red';
      }
    }
    if (device.type === 'Shutter' && this.isAdmin) {
      console.log("the device is a shutter");
      const target = event.currentTarget as HTMLElement;
      if (target.style.backgroundColor === 'orange') {
        target.style.backgroundColor = "white";
      } else {
        target.style.backgroundColor = 'orange';
      }
    }
  }
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

  auth = getAuth();

  isRoom: boolean = false;

  roomForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(Date.now()),
    owner: new FormControl(this.auth.currentUser?.uid)
  });

  onSave(roomForm: FormGroup) {

    (this.store.collection('rooms').add(this.roomForm.value)).then((results) => {
      this.activeModal.close(roomForm.value.name)
    });
    console.log(roomForm.value);
  }

}

