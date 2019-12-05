import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ClientesProvider } from '../../providers/clientes/clientes';

/**
 * Generated class for the ClienteCadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente-cad',
  templateUrl: 'cliente-cad.html',
})
export class ClienteCadPage {

  title: string;
  form: FormGroup;
  f: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private clienteProvider: ClientesProvider) {
    this.carregarDadosTela();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.f.id],
      nome: [this.f.nome, Validators.required],
      cpf: [this.f.cpf, Validators.required],
      endereco: [this.f.endereco, Validators.required],
      numero: [this.f.numero, Validators.required],
      cep: [this.f.cep, Validators.required],
      bairro: [this.f.bairro, Validators.required],
      cidade: [this.f.cidade, Validators.required],
      uf: [this.f.uf, Validators.required],
      complemento: [this.f.complemento],
      ativo: [this.f.ativo],
      email: [this.f.email, Validators.required],
      senha: [this.f.senha, Validators.required]            
    })
  }

  carregarDadosTela() {
    this.f = {}

      this.f.id = 0;
      this.f.nome = '';
      this.f.cpf = '';
      this.f.endereco = '';
      this.f.numero = '';
      this.f.cep = '';
      this.f.bairro = '';
      this.f.cidade = '';
      this.f.uf = '';
      this.f.complemento = '';
      this.f.ativo = true;
      this.f.email = '';
      this.f.senha = '';
  }  

  salvar() {

    this.clienteProvider.Incluir(this.form.value).then(() => {
      swal("Salvo!", "Cadastro realizado com sucesso", "success");
      this.navCtrl.pop();
    }).catch(e => {
      swal("Erro!", "Problemas ao salvar o registro " + e, "error");
    });
}  

}
