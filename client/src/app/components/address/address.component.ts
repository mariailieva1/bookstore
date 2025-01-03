import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAddress } from '@common/interfaces/address.interface';

@Component({
  selector: 'app-address',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Input({ alias: 'addresses', required: true }) addresses: IAddress[] = [];
  @Output('onSubmit') submitAddress: EventEmitter<IAddress> =
    new EventEmitter<IAddress>();
  @Output('onDelete') onDeleteAddress: EventEmitter<number> =
    new EventEmitter<number>();

  @Input({ alias: 'selectable', required: false }) selectable: boolean = true;

  @Output('selectedAddressId') addressIdChange: EventEmitter<number> =
    new EventEmitter<number>();

  addressForm?: FormGroup;
  addNewAddress: boolean = false;
  selectedAddressId?: number;
  editMode: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      // name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      addressLine: ['', Validators.required],
      additionalAddressLine: [''],
      postCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmitAddress() {
    if (!this.addressForm || this.addressForm.invalid) return;

    const formData = this.addressForm.getRawValue() as IAddress;

    this.submitAddress.emit(formData);
    this.addNewAddress = false;
    this.editMode = false;
    this.selectedAddressId = undefined;
  }

  selectAddress(address: IAddress) {
    this.selectedAddressId = address.id;
    this.addressIdChange.emit(this.selectedAddressId);
  }

  editAddress(address: IAddress) {
    this.selectAddress(address);
    this.editMode = true;

    this.addressForm?.setValue({
      country: address.country,
      city: address.city,
      addressLine: address.addressLine,
      additionalAddressLine: address.additionalAddressLine,
      postCode: address.postCode,
      phoneNumber: address.phoneNumber,
    });
  }

  deleteAddress(id: number) {
    this.onDeleteAddress.emit(id);
  }
}
