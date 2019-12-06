import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { _urlBase } from '../../ConnectionService/ConServico';

/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {

  headersBase = new Headers();
  url = _urlBase + 'Pedidos/';

  constructor(public http: Http) {
    this.headersBase.append('Content-Type', 'application/json');
    this.headersBase.append('Accept', 'application/json');
    this.headersBase.append('Access-Control-Allow-Origin', '*');
    this.headersBase.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD');
    this.headersBase.append('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Request-With, Content-Type, Accept');
    this.headersBase.append('Access-Control-Max-Age', '1728000');
  }

  Incluir(json) {
    let jsonObj = JSON.stringify(json);

    return this.http.post(this.url, jsonObj, { headers: this.headersBase }).toPromise();
  }

  Excluir(id) {
    return this.http.delete(this.url + id, { headers: this.headersBase }).toPromise();
  }


}
