import { Component, OnInit } from '@angular/core';
import { Dbinseto } from 'src/app/interfaces/dbinseto';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform, LoadingController, ToastController, NavController,AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DbinsetoService } from 'src/app/services/dbinseto.service';

@Component({
  selector: 'app-chagas',
  templateUrl: './chagas.page.html',
  styleUrls: ['./chagas.page.scss'],
})
export class ChagasPage implements OnInit {

  private dbinseto: Dbinseto = {};
  private loading: any;
  private dbinsetoid: string = null;

  constructor(
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private dbinsetoService: DbinsetoService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.dbinsetoid = this.activeRouter.snapshot.params['id'];

    if (this.dbinsetoid) this.loadDbraiva();

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

  ngOnInit() {
  }

  loadDbraiva() {


  }

  async dbenviar() {
    await this.presentLoading()

    this.dbinseto.userId = this.authService.getAuth().currentUser.uid;

    if (this.dbinsetoid) {

    } else {
      this.dbinseto.creatAt = new Date().getTime();

      try {
        await this.dbinsetoService.addDbinseto(this.dbinseto);
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


