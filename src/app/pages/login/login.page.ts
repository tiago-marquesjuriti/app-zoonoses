import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from "src/app/interfaces/user";
import { AuthService } from 'src/app/services/auth.service';
import { error, stringify } from '@angular/compiler/src/util';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
@ViewChild(IonSlides) slides: IonSlides;
public userLogin: User = {};
public userRegister: User = {};
public LoadingController: any;
private loading: any;


  


  constructor(  
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() { 
    
  }
segmentChanged(event: any){
if (event.detail.value === "login"){
    this.slides.slidePrev();

}else{

this.slides.slideNext();

}
}

async login(){

  await this.presentLoading();

  try{
   
    await this.authService.login(this.userLogin)
   
  }catch(error){
     let message: string;
 
     switch(error.code){
         case 'auth/email-already-in-use':
         message = 'E-mail sendo usado';
         break;
 
         case 'auth/invalide-email':
         message = 'E-mail invalido';
         break;
     
     
       }
 
     this.presentToast(error.Message);
     
   }finally{
   this.loading.dismiss();
   }
 
 }



async register(){
  await this.presentLoading();

  try{
   
   await this.authService.register(this.userRegister)
  
 }catch(error){
    let message: string;

    switch(error.code){
        case 'auth/email-already-in-use':
        message = 'E-mail sendo usado';
        break;

        case 'auth/invalid-email':
        message = 'E-mail invalido';
        break;
    
    
      }

    this.presentToast(error.Message);
    
  }finally{
  this.loading.dismiss();
  }

}
async presentLoading() {
  this.loading = await this.loadingCtrl.create({
    message: 'Por Favor Aguarde... ',
  });
  return this.loading.present();

}


async presentToast(message:string) {
  const toast = await this.toastCtrl.create({ message, duration: 8000
  });
  toast.present();
}



}
