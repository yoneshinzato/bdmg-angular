import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  constructor(private fb: FormBuilder, private addressService: AppService) {}

  ngOnInit(): void {
    this.addressService.getAddress().subscribe((response) => {
      this.address = response;

      this.createForm();

      const addressData = localStorage.getItem('formData');

      if (addressData) {
        const updateAddressData = JSON.parse(addressData);
        this.addressForm.patchValue(updateAddressData);
      }
    });
  }

  createForm() {
    this.addressForm = new FormGroup({
      cep: new FormControl(
        this.address.cep,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(8),
        ])
      ),
      logradouro: new FormControl(this.address.logradouro, Validators.required),
      complemento: new FormControl(
        this.address.complemento,
        Validators.required
      ),
      bairro: new FormControl(this.address.bairro, Validators.required),
      localidade: new FormControl(this.address.localidade),
      uf: new FormControl(this.address.uf, Validators.required),
      ibge: new FormControl({ value: this.address.ibge, disabled: true }),
      gia: new FormControl(this.address.gia, Validators.required),
      ddd: new FormControl(this.address.ddd, Validators.required),
      siafi: new FormControl({ value: this.address.siafi, disabled: true }),
    });
  }

  saveAddress() {
    if (this.addressForm.valid) {
      localStorage.setItem('formData', JSON.stringify(this.addressForm.value));
    }
  }

  displayCepErrorMsg() {
    if (this.addressForm.controls.cep.hasError('required')) {
      return 'CEP é obrigatório!';
    }

    if (this.addressForm.controls.cep.hasError('pattern')) {
      return 'O CEP só pode ter númeross';
    }

    if (this.addressForm.controls.cep.hasError('minlength')) {
      return 'O CEP precisa ter exatamente 8 números';
    }

    if (this.addressForm.controls.cep.hasError('maxlength')) {
      return 'O CEP precisa ter exatamente 8 números';
    }

    return '';
  }
}
