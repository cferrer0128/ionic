import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TaskServices } from './services/task.services'

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements  OnInit {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen , private service:TaskServices) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.service.getTasks()
    .subscribe(data =>{
      console.log('data-->', data)
    })
  }
}
