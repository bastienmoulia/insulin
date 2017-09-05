import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from "../home/home";

@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})

export class InitPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ngAfterViewInit() {
    console.log("Slides", this.slides)
    this.slides.lockSwipeToNext(true);
  }

  next() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }

  goToHome(){
    this.storage.set('introShown', true);
    this.navCtrl.setRoot(HomePage);
  }
}
