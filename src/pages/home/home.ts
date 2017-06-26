import {Component} from '@angular/core';
import {IonicPage, ToastController} from 'ionic-angular';

import {SpeechRecognition} from "@ionic-native/speech-recognition";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private isListening: boolean = false;
  private transformedText: string;

  constructor( private speech: SpeechRecognition, private toast: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  async isSpeechSupported(): Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    this.showToast('' + isAvailable);
    return isAvailable;
  }

  async getPermission(): Promise<void> {
    try {
      const permission = await this.speech.requestPermission();
      console.log(permission);
      this.showToast('' + permission);
      return permission;
    }
    catch (e) {
      this.showTryCatchError(e);
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      const hasPermission = await this.speech.hasPermission();
      console.log(hasPermission);
      this.showToast('' + hasPermission);
      return hasPermission;
    }
    catch (e) {
      this.showTryCatchError(e);
    }
  }

  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      this.showToast(JSON.stringify(languages));
      return languages;
    }
    catch (e) {
      this.showTryCatchError(e);
    }
  }

  startListening(): void {

    this.isListening = true;

    this.speech.startListening().subscribe(
      data => {
        this.transformedText += data[0];
      },
      e => {
        this.isListening = false;
        this.showTryCatchError(e);
      }
    );
  }

  stopListening(): void {

    this.speech.stopListening().then(
      () => {
        this.isListening = false;
      },
      e => {
        this.showTryCatchError(e);
      }
    );
  }

  clearText(): void {
    this.transformedText = '';
  }

  showToast(msg) {
    let toast = this.toast.create({
      message: msg,
      position: 'top',
      duration: 1000,
    });
    toast.present();

  }

  showTryCatchError(e) {

    console.log(e);

    this.showToast('出错鸟(try catch, etc)');
  }

}
