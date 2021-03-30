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

  estimation = 0;
  estimationStatus = 'unknown';

  constructor(private router: Router, private sendSerivce: SendService) {}

  ngOnInit() {
    this.estimate();
  }

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

  private estimate() {
    this.sendSerivce.estimate(+this.amount, this.address).subscribe(
      (res) => {
        console.log(res);
        if (res['status'] === 'success') {
          this.estimation = res['data'].estimated_network_fee;
          this.estimationStatus = res['status'];
          console.log('this.estimation', this.estimation);
          console.log('this.estimationStatus', this.estimationStatus);
        } else {
          this.estimation = res['data'].data.estimated_network_fee;
          this.estimationStatus = res['data'].status;
          console.log('this.estimation', this.estimation);
          console.log('this.estimationStatus', this.estimationStatus);
        }
      },
      (err) => {
        console.log(err);
      },
    );
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
      },
    );
  }

  private getPriceImpact() {
    return Math.round((this.estimation / +this.amount) * 100 * 100) / 100 + '%';
  }
}
