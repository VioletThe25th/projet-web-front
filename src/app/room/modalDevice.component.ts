import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { Devices, Rooms } from '../room.interface'

@Component({
    selector: 'modalDevice',
    template: `
    <div class="modal-content">
        <div class="modal-header">
            <p>Device</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        
        <div>
            <form class="inputClass" [formGroup]="deviceForm">
            <label for="inputName">Device Name :</label>
                <input class="inputName" type="text" id="name" formControlName="name" style="margin-bottom: 20px;">
                <div>
                <label for="inputName">Device type : </label>
                    <select formControlName="type" style="display: flex;">
                        <option hidden='hidden' selected='selected' value="default">Select Option</option>
                        <option class="inputName" value="Bulb" id="type">Bulb</option>
                    </select>
                </div>
                <!-- <input class="inputName" type="text" id="type" formControlName="type"> -->
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
        this.store.doc<Rooms>(`rooms/${this.roomId}`).get().subscribe((room) => {
            const roomData: Devices[] = room.data()?.devices??[];
            const devices = (roomData).concat(this.roomForm.value.devices as Devices[]);         
            (this.store.doc(`rooms/${this.roomId}`).update({devices})).then(() => {
                this.activeModal.close(this.deviceForm.value)
            });
        })
        
    }
}