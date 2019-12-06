import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserProvider } from '../../providers/user/user';
import { ClienteCadPage } from '../cliente-cad/cliente-cad';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  f: any;
  cliente = { id: 0, nome: '' };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private userProvider: UserProvider,
    private app: App, 
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {

    this.carregarDadosTela();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [this.f.email, Validators.required],
      senha: [this.f.senha, Validators.required]
    })
  }  

  carregarDadosTela() {
    this.f = {}

      this.f.email = '';
      this.f.senha = '';
      this.cliente = { id: 0, nome: '' };
  }

login() {

    // this.login_data.cnpj_empresa = '57.154.411/0001-59';
    // this.login_data.usuario = 'vanessa';
    // this.login_data.senha = '123';
    
    // if (!this.login_data.cnpj_empresa){
    //     return this.message.alert('O CNPJ da empresa não foi informado')
    // }

    // if (!this.login_data.usuario) {
    //     return this.message.alert('O usuário não foi informado ou está inválido');
    // }

    // if (!this.login_data.senha) {
    //     return this.message.alert('A senha não foi informada');
    // }

    let loading;
    loading = this.loadingCtrl.create({
        showBackdrop: true,
        content: 'Aguarde...'
    });
    loading.present();
    
    this.userProvider.login(this.form.value).then(res => {
      loading.dismiss();                        
      this.cliente.id = res.json().id;
      this.cliente.nome = res.json().nome;

      this.userProvider.setUserData(this.cliente);

      this.navCtrl.setRoot(HomePage);
     // this.navCtrl.push(HomePage); 
    }).catch(e => {
      loading.dismiss();   
      swal("Erro!", "Login inválido! " + e, "error");
    });     
}

cadastrar(){
  this.navCtrl.push(ClienteCadPage);   
}

}
