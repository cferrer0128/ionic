import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { LocationServices } from '../../app/services/location.services'
import { TaskServices } from '../../app/services/task.services';

import { Platform } from 'ionic-angular';

import { concat } from 'rxjs/observable/concat';

declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public startTracking:any;
  public whereTo:any='';
  public PlatForm:any;
  constructor(public navCtrl: NavController,
  public network:Network, 
  private toast:ToastController,
  public locationservices:LocationServices,
  public service:TaskServices,
  platform: Platform) {

    this.MyLocation ={lat:0,lng:0}
    
    this.PlatForm =  platform;

  }

  map:any;
  MyLocation={lat:0,lng:0};
  //startEventlat
  startEvent(){
    console.log('start event ', this.startTracking);
    if(this.startTracking) this.start();
    else this.stop();
    this.calculateGeo(false);
    
    setInterval(()=>{
     

      if(this.MyLocation.lat.toFixed(3) != this.locationservices.lat.toFixed(3) &&
      this.MyLocation.lng.toFixed(3) != this.locationservices.lng.toFixed(3)){
        let directionsDisplay = new google.maps.DirectionsRenderer;
        let directionsService = new google.maps.DirectionsService;
        let pos = {
          lat:this.locationservices.lat,
          lng:this.locationservices.lng
        } 
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat:pos.lat, lng: pos.lng}
        });
        var marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
        this.whereTo = pos;
        this.calculateGeo(true);
        let locationObject ={
          Title:this.PlatForm._default,
          lat:pos.lat,
          lng:pos.lng
        }
        //this.map.setCenter(pos);
        this.service.addLocation(locationObject)
        .then(data =>{
          console.log('Location saved ', data);
          this.toast.create({
            message:`Geolocation has changed my location ${this.MyLocation} Destination ${this.whereTo}`,
            duration:5000
          }).present();

        }, err => {
          console.log('Error saving location!' , err)
          this.toast.create({
            message:`Error saving location ${this.MyLocation} Destination ${this.whereTo}`,
            duration:5000
          }).present();
        })
        this.MyLocation = pos;
        this.whereTo ="";


      }
    },2000)
          
  }
  

  calculateGeo(isnewlocation:boolean){
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat:this.locationservices.lat, lng: this.locationservices.lat}
    });
    directionsDisplay.setMap(this.map);
    let pos = {
      lat:this.locationservices.lat,
      lng:this.locationservices.lng
    } 

    if(!isnewlocation)
      this.MyLocation = pos;

    this.map.setCenter(pos);
    
    directionsService.route({
      origin: this.MyLocation,
      destination: this.whereTo,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        this.toast.create({
          message:`Geolocation has changed my location ${this.MyLocation} Destination ${this.whereTo}`,
          duration:5000
        }).present()
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }
  start(){
    this.locationservices.startTracking();
  }
  stop(){
    this.locationservices.stopTracking();
  }

  //ionViewDidEnter
  ionViewDidEnter(){

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat:this.locationservices.lat, lng: this.locationservices.lng}
    });

    this.network.onConnect()
    .subscribe(netData => {
      console.log(netData);
      this.displayNetwork(netData.type)
    }, err => {console.log(err)})

    this.network.onDisconnect()
    .subscribe(netData =>{
      console.log(netData);
      this.displayNetwork(netData.type);


    }, err => {console.log(err)})

  }

  //displayNetwork

  displayNetwork(connState:string){

    let networkType = this.network.type;

    this.toast.create({
      message:`you are now ${connState} via ${networkType}`,
      duration:5000
    }).present()


  }



}
