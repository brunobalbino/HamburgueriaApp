import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteCadPage } from './cliente-cad';

@NgModule({
  declarations: [
    ClienteCadPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteCadPage),
  ],
})
export class ClienteCadPageModule {}
