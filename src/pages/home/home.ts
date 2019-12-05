import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PedidoCadPage } from '../pedido-cad/pedido-cad';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  NovoPedido() {
    this.navCtrl.push(PedidoCadPage);   
  }  

}
