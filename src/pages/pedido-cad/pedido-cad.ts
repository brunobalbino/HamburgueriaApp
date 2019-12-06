import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import swal from 'sweetalert';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PedidoCadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-cad',
  templateUrl: 'pedido-cad.html',
})
export class PedidoCadPage {

  loading = this.loadingCtrl;
  arrayProd: any;
  EdtProduto: string;
  produto = { item: 0, id: '', descricao: '', qtde: 0, precounitario: 0, valortotal: 0 }
  total: any;
  totalTela: any;
  pedido = { id: 0, status: 0, idcliente: 0, nomeCliente: '', valortotal: 0 };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private produtoProvider: ProdutosProvider,
              private pedidoProvider: PedidosProvider,
              private userProvider: UserProvider,
              private loadingCtrl: LoadingController,
              private atrCtrl: AlertController) {
    this.carregarDadosTela();
  }

  adicionarQtde(index) {
    this.arrayProd[index - 1].qtde = this.arrayProd[index - 1].qtde + 1;
    this.atualizaTotal();
  }  

  removerQtde(index) {
    if (this.arrayProd[index - 1].qtde > 1) {
      this.arrayProd[index - 1].qtde = this.arrayProd[index - 1].qtde - 1;
    }    

    this.atualizaTotal();
  }    

  edtQtde(produto: any) {
    swal("Quanto comprar de " + produto.descricao + '?',
      {
        icon: '../../assets/icon/question.png',
        content: {
          element: "input",
          attributes: {
            placeholder: "",
            type: "number"
          },
        }
      })
      .then(data => {
        try {
          if (parseFloat(data) >= 0) {
            produto.qtde = parseFloat(data);
            this.atualizaTotal();
          } else {
            if (parseFloat(data) < 0) {
              swal("Ooops!", "Não é permitido quantidade negativa", "warning");
            }
          }
        } catch (error) {
          produto.qtde = 0;
          swal("Ooops!", "Quantidade não permitida", "warning");
        }
      });
  } 
  
  excluirProduto(index) {
    swal({
      title: "Excluir Produto",
      text: 'Deseja realmente apagar o item ' + this.arrayProd[index - 1].descricao + '?',
      icon: '../../assets/icon/question.png',
      buttons: ["Não", "Sim"],
      dangerMode: true,
    }).then(okay => {
      if (okay) {
        this.arrayProd.splice(index - 1, 1);   
        this.atualizaTotal();    
      }
    }).catch(() => {
      swal("Erro!", "Problemas ao excluir o produto", "error");
    })
  }  

  carregarDadosTela() {
    this.arrayProd = [];
    this.total = 0;
    this.pedido = { id: 0, status: 0, idcliente: 0, nomeCliente: '', valortotal: 0 };
    this.pedido.idcliente = this.userProvider.user.id;
    this.pedido.nomeCliente = this.userProvider.user.nome;
    console.log(this.pedido.idcliente)
  }  

  atualizaTotal(){
    this.total = 0;  
    this.totalTela = 0;  
    for (let index = 0; index < this.arrayProd.length; index++) {
      this.arrayProd[index].valortotal = (this.arrayProd[index].precounitario * this.arrayProd[index].qtde);
      this.total = this.total + this.arrayProd[index].valortotal;      
    }

    this.totalTela = this.total;
    this.totalTela = this.totalTela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });    
    
  }

  abrirComboProdutos() {
    if ((!this.EdtProduto) || (this.EdtProduto.trim() == '')) {
      return swal('Atenção', 'Informe uma descrição do produto!', 'warning')
    }

    this.produtoProvider.BuscarTodos(this.EdtProduto).then(data => {
      if (data.json().length == 0) {
        return swal('Oops', 'Nenhum produto encontrado!', 'info')
      }

      let ListaProdutos: any;
      ListaProdutos = data.json();

      let prodMenu = this.atrCtrl.create();
      prodMenu.setTitle('Produtos');

      ListaProdutos.forEach(p => {
        prodMenu.addInput({
          type: 'radio',
          label: p.descricao,
          value: p.id
        });
      });

      prodMenu.addButton('Cancelar');
      prodMenu.addButton({
        text: 'Ok',
        handler: data => {
          if (!data) {
            return;
          }

          let x = this.arrayProd.findIndex(x => x.id === data);
          let i = ListaProdutos.findIndex(i => i.id === data);

          if (x < 0) {

            this.produto = { item: 0, id: '', descricao: '', qtde: 0, precounitario: 0, valortotal: 0 }
            this.produto.item = this.arrayProd.length + 1;
            this.produto.id = data;
            this.produto.descricao = ListaProdutos[i].descricao;
            this.produto.qtde = 1;
            this.produto.precounitario = ListaProdutos[i].preco;            
        
            this.arrayProd.push(this.produto);
            this.EdtProduto = '';

            this.atualizaTotal();
          } else {
            swal("Oops!", '"' + ListaProdutos[i].descricao + '" já foi adicionado anteriormente', "error");
          }
        }
      });

      prodMenu.present();
    })
  }

  salvar() {
    if (this.arrayProd == []) {
      return swal("Oops!", 'Informe pelo menos 1 item', "info");
    }

    let json = { idcliente: this.pedido.idcliente, valortotal: this.total, qtdeitens: this.arrayProd.length, itens: this.arrayProd }
   
    let loader = this.loading.create({
      content: 'Salvando pedido...',
      spinner: 'dots'
    });

    return new Promise((resolve) => {
      loader.present();

      if (this.pedido.id > 0) {
        this.pedidoProvider.Excluir(this.pedido.id).catch(e => {
          swal("Erro!", "Problemas ao atualizar o pedido", "error");
          loader.dismiss();
          return;
        })
      }

      this.pedidoProvider.Incluir(json).then(() => {        
        resolve(true);
      })
    }).then(() => {
      loader.dismiss();
      swal("Sucesso!", "Pedido salvo com sucesso.", "success");
      this.navCtrl.pop();
    })
  }


}
