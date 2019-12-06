import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListaPedidoPage } from '../pages/lista-pedido/lista-pedido';
import { PedidoCadPage } from '../pages/pedido-cad/pedido-cad';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { ProdutosProvider } from '../providers/produtos/produtos';
import { UserProvider } from '../providers/user/user';
import { ClienteCadPage } from '../pages/cliente-cad/cliente-cad';
import { ClientesProvider } from '../providers/clientes/clientes';
import { PedidosProvider } from '../providers/pedidos/pedidos';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListaPedidoPage,
    PedidoCadPage,
    ClienteCadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListaPedidoPage,
    PedidoCadPage,
    ClienteCadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutosProvider,
    UserProvider,
    ClientesProvider,
    PedidosProvider
  ]
})
export class AppModule {}
