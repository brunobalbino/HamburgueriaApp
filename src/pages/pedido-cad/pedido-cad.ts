import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import swal from 'sweetalert';
import { ProdutosProvider } from '../../providers/produtos/produtos';

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

  arrayProd: any;
  EdtProduto: string;
  produto = { item: 0, id: '', descricao: '', qtde: 0, preco: 0 }
  total: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private produtoProvider: ProdutosProvider,
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
  }  

  atualizaTotal(){
    this.total = 0;
    for (let index = 0; index < this.arrayProd.length; index++) {
      this.total = this.total + (this.arrayProd[index].preco * this.arrayProd[index].qtde);
    }

    this.total = this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });    
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

            this.produto = { item: 0, id: '', descricao: '', qtde: 0, preco: 0 }
            this.produto.item = this.arrayProd.length + 1;
            this.produto.id = data;
            this.produto.descricao = ListaProdutos[i].descricao;
            this.produto.qtde = 1;
            this.produto.preco = ListaProdutos[i].preco;
        
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

  // salvar() {
  //   if (this.modeloOrcamento.nome.trim() == '') {
  //     return swal("Oops!", 'Informe um nome para o modelo', "info");
  //   }

  //   let json = { descricao: '', finalizado: false, produtos: this.arrayProd }
  //   json.descricao = this.modeloOrcamento.nome;

  //   let loader = this.loading.create({
  //     content: 'Salvando orçamento...',
  //     spinner: 'dots'
  //   });

  //   return new Promise((resolve) => {
  //     loader.present();

  //     if (this.modeloOrcamento.codigo > 0) {
  //       this.modeloProvider.Excluir(this.modeloOrcamento.codigo).catch(e => {
  //         swal("Erro!", "Problemas ao atualizar o orçamento", "error");
  //         loader.dismiss();
  //         return;
  //       })
  //     }

  //     this.modeloProvider.Incluir(json).then(() => {
  //       resolve(true);
  //     })
  //   }).then(() => {
  //     loader.dismiss();
  //     swal("Sucesso!", "Orçamento salvo com sucesso.", "success");
  //     this.navCtrl.pop();
  //   })
  // }


}
