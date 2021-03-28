import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { SendSevice } from 'src/app/serivce/send.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input()
  amount: string;
  @Input()
  address: string;
  @Input()
  dismiss = () => {};

  constructor(private router: Router,
    private sendSerivce: SendSevice,
    ) {
   }

  ngOnInit() {}

  cancel() {
    this.router.navigate(['tabs', 'home']);
    this.dismiss();
  }

  confirm() {
    console.log(`send ${this.amount} to ${this.address}`);
  }

  private withdraw(amount: any, address: any) {
    this.sendSerivce.withdraw(+amount, address).subscribe(
      (res) => {
        console.log('send transaction finished');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
