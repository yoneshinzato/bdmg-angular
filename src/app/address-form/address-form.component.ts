import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/address.model';
import { AppService } from '../services/app.service';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  address: Address;
  addressForm: FormGroup;
  formattedCep: string;
  

  constructor(
    private fb: FormBuilder,
    private addressService: AppService,

  ) {}

  ngOnInit(): void {
    this.addressService.getAddress().subscribe((response) => {

      this.address = response;

      this.createForm();

      const addressData = localStorage.getItem('formData')

      if(addressData) {
        const updateAddressData = JSON.parse(addressData)
        this.addressForm.patchValue(updateAddressData)
      }

    });
  }


  createForm() {
    this.addressForm = new FormGroup({
      cep: new FormControl(this.address.cep),
      logradouro: new FormControl(this.address.logradouro),
      complemento: new FormControl(this.address.complemento),
      bairro: new FormControl(this.address.bairro),
      localidade: new FormControl(this.address.localidade),
      uf: new FormControl(this.address.uf),
      ibge: new FormControl({value: this.address.ibge, disabled: true}),
      gia: new FormControl(this.address.gia),
      ddd: new FormControl(this.address.ddd),
      siafi: new FormControl({value: this.address.siafi, disabled: true}),
    })
  }

  saveAddress() {
    localStorage.setItem('formData', JSON.stringify(this.addressForm.value));
  }
}
