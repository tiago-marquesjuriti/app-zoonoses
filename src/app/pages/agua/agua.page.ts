import { Component, OnInit } from '@angular/core';
import { Dbagua } from 'src/app/interfaces/dbagua';
import { LoadingController, ToastController, NavController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { DbaguaService } from 'src/app/services/dbagua.service';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-agua',
  templateUrl: './agua.page.html',
  styleUrls: ['./agua.page.scss'],
})
export class AguaPage implements OnInit {
  public uploadPercent : Observable<number>;
  public downloadUrl : Observable<string>;
  private dbagua: Dbagua = {};
  private loading: any;
  private dbaguaid: string = null;
  constructor(
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private dbaguaService: DbaguaService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private afStorage: AngularFireStorage,
    private file: File,
    private platform: Platform

  ) {
    this.dbaguaid = this.activeRouter.snapshot.params['id'];

    if (this.dbaguaid) this.loadDbagua();

  }

  ngOnInit() {
  }

  loadDbagua() {


  }


  async openCamera() {
    const options: CameraOptions = {
      quality: 50,
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
      this.uploadPicture(blob);
    } catch (error) {
      console.error(error);
    }

  }

  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref('ionic.jpg');
    const task = ref.put(blob);


    this.uploadPercent = task.percentageChanges();

    task.percentageChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL()) 
    ).subscribe();

  }
  async dbenviar() {
    await this.presentLoading()

    this.dbagua.userId = this.authService.getAuth().currentUser.uid;

    if (this.dbaguaid) {

    } else {
      this.dbagua.creatAt = new Date().getTime();

      try {
        await this.dbaguaService.addDbagua(this.dbagua);
        await this.loading.dismiss();
        this.presentAlert();
        this.navCtrl.navigateBack('/home');

      } catch (error) {
        this.presentToast('erro ao tentar enviar');
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
