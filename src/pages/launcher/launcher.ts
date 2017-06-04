import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-launcher',
  templateUrl: 'launcher.html'
})
export class launcherPage {
  public myFrame:HTMLIFrameElement;

  constructor(public navCtrl: NavController
              ,private barcodeScanner: BarcodeScanner
            ) {
              if (window.addEventListener) {
                   window.addEventListener("message", this.receiveMessage.bind(this), false);
                 } else {
                    (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
                 }
  }
  receiveMessage(event){
    this.getPicture(event);
    return;
  }
  getPicture(event){

      this.barcodeScanner.scan().then((barcodeData) => {
          var iframe=document.getElementById('myIframe');
          this.myFrame=(<HTMLIFrameElement>iframe);
          this.myFrame.contentWindow.postMessage(barcodeData, '*');
          console.log(barcodeData);
        },
        (err) => {
          console.log(err);
        });
  }
}
