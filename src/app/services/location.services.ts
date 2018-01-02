import { Injectable , NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation , Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationServices {
    public watch:any;
    public lat:any=0;
    public lng:any=0;

    constructor(public zone: NgZone , 
    public backgroundGeo:BackgroundGeolocation,
    public geolocation:Geolocation){
        console.log('Geo Services is up and running!!');

    }

    startTracking(){

        let config = {
            desiredAccuracy:0,
            stationaryRadius:20,
            distanceFilter:10,
            debug:true,
            interval:200
        };
        
        this.backgroundGeo.configure(config)
        .subscribe((location) =>{
            console.log(`backgroundGeo latitude ${location.latitude} longitud ${location.longitude}`);
            //zone
            this.zone.run(() =>{
                this.lat = location.latitude;
                this.lng = location.longitude;
            });

        }, err =>{ console.log(err); })
        
        //start
        this.backgroundGeo.start();
        let options = {
            frequency:3000,
            enableHighAccuracy:true
        };
        //watch..
        this.watch =  this.geolocation.watchPosition(options)
        .filter((p:any) => p.code === undefined)
        .subscribe((position:Geoposition) =>{
            console.log('Position ' , position);
            this.zone.run(() =>{
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

            });

        });
    }
    stopTracking(){
        console.log('stopTracking')
        this.backgroundGeo.finish();
        this.watch.unsubscribe();

    }
}