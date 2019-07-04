import { Component, OnInit } from '@angular/core';
import { Dblepto } from 'src/app/interfaces/dblepto';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DbleptoService } from 'src/app/services/dblepto.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-leptospirose',
  templateUrl: './leptospirose.page.html',
  styleUrls: ['./leptospirose.page.scss'],
})
export class LeptospirosePage implements OnInit {

  private dblepto: Dblepto = {};
  private loading: any;
  private dbleptoid: string = null;

  constructor(

    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private dbleptoService: DbleptoService,
    private navCtrl: NavController,
    private afStorage: AngularFireStorage,
    private alertCtrl: AlertController
  ) {
    this.dbleptoid = this.activeRouter.snapshot.params['id'];

    if (this.dbleptoid) this.loadDblepto();

  }

  ngOnInit() {
  }

  loadDblepto() {


  }





  async dbenviar() {
    await this.presentLoading()

    this.dblepto.userId = this.authService.getAuth().currentUser.uid;

    if (this.dbleptoid) {

    } else {
      this.dblepto.creatAt = new Date().getTime();

      try {
        await this.dbleptoService.addDblepto(this.dblepto);
        await this.loading.dismiss();
        this.presentAlert();
        this.navCtrl.navigateBack('/home');

      } catch (error) {
        this.presentToast('erro ao tentar salvar');
        this.loading.dismiss();
      }
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor Aguarde... ',
    });
    return this.loading.present();

  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 8000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: ' Sua denuncia foi enviada com sucesso!',
      message: 'Entraremos em contato no prazo de 48hs úteis. Obrigado!',
      buttons: ['ok']


    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
