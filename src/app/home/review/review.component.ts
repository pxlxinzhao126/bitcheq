import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from 'src/app/serivce/send.service';

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

  sending = false;
  sendingSuccess = false;
  sendingError = false;

  constructor(private router: Router,
    private sendSerivce: SendService,
    ) {
   }

  ngOnInit() {}

  cancel() {
    this.router.navigate(['tabs', 'home']);
    this.dismiss();
  }

  confirm() {
    console.log(`send ${this.amount} to ${this.address}`);
    this.sending = true;

    // setTimeout(() => {
    //   this.sendingSuccess = true;
    //   this.sendSerivce.broadcast('success');
    // }, 2000);

    this.withdraw();
  }

  private withdraw() {
    this.sendSerivce.withdraw(+this.amount, this.address).subscribe(
      (res) => {
        this.sendingSuccess = true;
        this.sendSerivce.broadcast('success');
      },
      (err) => {
        console.log(err);
        this.sendingError = true;
        this.sendSerivce.broadcast('error');
      }
    );
  }
}
