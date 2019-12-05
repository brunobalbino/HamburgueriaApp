import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoCadPage } from './pedido-cad';

@NgModule({
  declarations: [
    PedidoCadPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoCadPage),
  ],
})
export class PedidoCadPageModule {}
