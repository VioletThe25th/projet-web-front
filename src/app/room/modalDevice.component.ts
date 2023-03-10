import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { Rooms } from '../room.interface'

@Component({
    selector: 'modalDevice',
    template: `
    <div class="modal-content">
      <div class="modal-header">
      <p>Device Name</p>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div>
        <form class="inputClass" [formGroup]="roomForm">
          
          <input class="inputName" type="text" id="name" formControlName="name">
          <input class="inputName" type="text" id="type" formControlName="type">
        </form>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-secondary" (click)="onSave(roomForm);isRoom = true">Save</button>
      </div>
    </div>
    `, 
    styleUrls: ['./room.component.css']
  })
  
  export class ModalDeviceComponent {
    constructor(public activeModal: NgbActiveModal, private store: AngularFirestore) {
    }

    roomId: string | undefined;
  
    isRoom: boolean = false;
  
    deviceForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl('')
    });
  
    roomForm = new FormGroup({
      name: new FormControl(''),
      date: new FormControl(new Date()),
      devices: new FormArray([this.deviceForm])
    });
  
    onSave(roomForm: FormGroup) {
        console.log(this.roomId);
      (this.store.collection('rooms.id').add(this.roomForm.value)).then((results) => {
        //this.rooms = results;
        this.activeModal.close(this.deviceForm.value.name)
      });
      console.log(roomForm.value);
    }
  
    appointment?: any;
  }
  