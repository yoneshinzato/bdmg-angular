import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address.model';
import { AppService } from '../services/app.service';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit {
  address: Address;

  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.getAdd();
  }

  getAdd(): void {
    this.service.getAddress().subscribe((res: Address) => {
      this.address = res;
      console.log(res);
    });
  }
}
