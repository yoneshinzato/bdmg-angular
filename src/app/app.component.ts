import { Component, OnInit, VERSION } from '@angular/core';
import { Address } from './model/address.model';
import { AppService } from './services/app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  address: Address;

  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.getAdd();
  }

  getAdd(): void {
    this.service.getAddress().subscribe((res: Address) => {
      this.address = res;
      console.log(res)
    })
  }
}
