import { Headers, Http } from '@angular/http';
import { Injectable, ɵConsole } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { _urlBase } from '../../ConnectionService/ConServico';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {

  headersBase = new Headers();
  url = _urlBase + 'Produtos/';

  constructor(public http: Http) {
    this.headersBase.append('Content-Type', 'application/json');
    this.headersBase.append('Accept', 'application/json');
    this.headersBase.append('Access-Control-Allow-Origin', '*');
    this.headersBase.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD');
    this.headersBase.append('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Request-With, Content-Type, Accept');
    this.headersBase.append('Access-Control-Max-Age', '1728000');
  }

  BuscarTodos(produtoPesquisar) {
    let param = '';
        
    this.headersBase.delete('Descricao')    

    if (produtoPesquisar !== null) {
      this.headersBase.append('Descricao', produtoPesquisar);
    }
     

    return this.http.get(this.url, { headers: this.headersBase }).toPromise();
  }


}
