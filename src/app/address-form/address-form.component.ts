import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/address.model';
import { AppService } from '../services/app.service';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  address: Address;

  form: FormGroup;

  constructor(public service: AppService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAdd();

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  getAdd(): void {
    this.service.getAddress().subscribe((res: Address) => {
      this.address = res;
      console.log(res);
    });
  }

  onSubmit(): void {
    localStorage.setItem('formData', JSON.stringify(this.form.value));
    this.form.reset();
  }
}
