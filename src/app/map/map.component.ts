import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {loadModules} from 'esri-loader';
import * as lang from 'esri/core/lang';
import * as MapView from 'esri/views/MapView';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public display:boolean=false;
   savedLocations:{}[]=[]
  @ViewChild('mapView', {static: true})mapViewElement!: ElementRef;
  private mapView!:MapView
  title = 'ArcGIS angular map';


  constructor() {}

  ngOnInit(): void {
    this.setMap()

  }

  setMap(){
    loadModules(['esri/config','esri/Map', 'esri/views/MapView',"esri/layers/FeatureLayer","esri/widgets/Popup"])
    .then(([ esriConfig,Map, MapView, FeatureLayer]: any[]) => {
      // set default map properties
      esriConfig.apiKey = "AAPK3f623025fae04c37990e063263c9b1c6C_KPyopaDwcdvmLSzMw5e3dnmWfC5Q6sGqozIDy7zDwDoOIiHzRzSXR1RqBMOH86";

      const mapProperties = {
        basemap: 'arcgis-topographic',
      }

      const map = new Map(mapProperties);

      const mapViewProperties = new MapView ({

        container: this.mapViewElement.nativeElement,
        zoom:9,
        map,
        center: [30.033333, 31.233334],

      })


mapViewProperties.ui.components = (["attribution", "compass", "zoom"]);
this.mapView=mapViewProperties

  //    this.mapView = new MapView(mapViewProperties);

      // Define a pop-up for Trailheads
      const saveThisAction = {
        title: "save",
        id: "save-this",
        image: "/assets/save-instagram.png"
      };
      const popupTrailheads = {
        actions: [saveThisAction]
      }


    const trailheads = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/TrailRuns/FeatureServer/0",
      popupTemplate: popupTrailheads
      });
      map.add(trailheads);





// mapViewProperties.popup.autoOpenEnabled = true;

mapViewProperties.on("click", (event:any) => {
  mapViewProperties.popup.open({
    "title": "Location",
    "content": "<b>City:</b> {CITY_JUR}<br>",
    actions: [saveThisAction]

  });



  mapViewProperties.popup.on("trigger-action", (popEvent:any) => {
console.log(2222);

     // Execute the saveThis() function if the measure-this action is clicked

     if (popEvent.action.id === "save-this") {

       this.saveLocation(event.mapPoint);
      //  window.alert('location is saved!')
     }

   });
});
    });



  }

  saveLocation(mapPoint: any) {
    this.savedLocations.push({lat:mapPoint.latitude,lng:mapPoint.longitude});
console.log(this.savedLocations);


  }

  center(location:any)
{

  // console.log(location);
this.mapView.center.latitude=location.lat;
this.mapView.center.longitude=location.lng;


}



}



