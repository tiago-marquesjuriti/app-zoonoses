import { Component, OnInit } from '@angular/core';
import { Dbdengue } from 'src/app/interfaces/dbdengue';
import { LoadingController, ToastController, NavController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DbdengueService } from 'src/app/services/dbdengue.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { ok } from 'assert';

@Component({
  selector: 'app-dengue',
  templateUrl: './dengue.page.html',
  styleUrls: ['./dengue.page.scss'],
})
export class DenguePage implements OnInit {
  private dbdengue: Dbdengue = {};
  private loading: any;
  private dbdengueid: string = null;

  constructor(
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private dbdengueService: DbdengueService,
    private navCtrl: NavController,
    private afStorage: AngularFireStorage,
    private alertCtrl: AlertController
  ) {
    this.dbdengueid = this.activeRouter.snapshot.params['id'];

    if (this.dbdengueid) this.loadDbdengue();

  }

  ngOnInit() {
  }

  loadDbdengue() {


  }

  async openGalery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };

    try {
      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });
    } catch (error) {
      console.error(error);
    }

  }

  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref('/ionic.jpg');
    const task = ref.put(blob);


  }


  async dbenviar() {
    await this.presentLoading()

    this.dbdengue.userId = this.authService.getAuth().currentUser.uid;

    if (this.dbdengueid) {

    } else {
      this.dbdengue.creatAt = new Date().getTime();

      try {
        await this.dbdengueService.addDbdengue(this.dbdengue);
        this.presentAlert();
        await this.loading.dismiss();
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
      message, duration: 2000
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