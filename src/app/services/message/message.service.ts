import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(public toastController: ToastController) {
  }

  add(message: string) {
    if(message && message !== '') {
      //this.presentToast(message);
      this.messages.push(message);
    }
  }

  clear() {
    this.messages = [];
  }

  async presentToast(messageText: string) {
    const toast = await this.toastController.create({
      message: messageText,
      duration: 1000,
      color: 'primary',
      showCloseButton: true,
      closeButtonText: 'X'
    });
    toast.present();
  }
}