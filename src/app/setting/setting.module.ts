import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingPageRoutingModule } from './setting-routing.module';
import { SettingPage } from './setting.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SettingPageRoutingModule],
  declarations: [SettingPage],
})
export class SettingPageModule {}
