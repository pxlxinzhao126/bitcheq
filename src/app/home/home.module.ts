import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { TransactionModule } from '../transaction/transaction.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { TestnetComponent } from './testnet/testnet.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    QRCodeModule,
    TransactionModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, TooltipComponent, TestnetComponent],
  providers: [
    BarcodeScanner,
  ]
})
export class HomeModule {}
