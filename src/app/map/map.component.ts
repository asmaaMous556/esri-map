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
    loadModules(['esri/config','esri/Map', 'esri/views/MapView',
    "esri/layers/FeatureLayer","esri/widgets/Popup",
    "esri/widgets/Bookmarks","esri/widgets/Expand"])
    .then(([ esriConfig,Map, MapView, FeatureLayer,Bookmarks,Expand]: any[]) => {
      // set default map properties
      esriConfig.apiKey = "AAPK3f623025fae04c37990e063263c9b1c6C_KPyopaDwcdvmLSzMw5e3dnmWfC5Q6sGqozIDy7zDwDoOIiHzRzSXR1RqBMOH86";

      const mapProperties = {
        basemap: 'arcgis-topographic',
      }

      const map = new Map(mapProperties);

      const mapViewProperties = new MapView ({

        container: this.mapViewElement.nativeElement,
        zoom:14,
        map,
        center: [31.233334,30.033333],

      })


mapViewProperties.ui.components = (["attribution", "compass", "zoom"]);
// this.mapView=mapViewProperties

  //    this.mapView = new MapView(mapViewProperties);

      // Define a pop-up for Trailheads
      const saveThisAction = {
        title: "save",
        id: "save-this",
        image: "/assets/save-instagram.png"
      };
      const template = {
        title: "{NAME} in {COUNTY}",
        actions: [saveThisAction]
      }


      const featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2",
        popupTemplate:template
      });
      map.add(featureLayer);

      // add bookmarks
      const bookmarks = new Bookmarks({
        view:mapViewProperties,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true,
        visibleElements: {
          time: false // don't show the time (h:m:s) next to the date
        }
      });

      const bkExpand = new Expand({
        view: mapViewProperties,
        content: bookmarks,
        expanded: true
      })

      // Add the widget to the top-right corner of the view
      mapViewProperties.ui.add(bkExpand, "top-right");


 mapViewProperties.on("click", (event:any) => {

console.log( mapViewProperties.popup)
  mapViewProperties.popup.open({
    "title": "feature",
    "content": "<b>City:</b> {CITY_JUR}<br>",


    actions: [saveThisAction]

  });


});

    });



  }

  saveLocation(mapPoint: any) {
    this.savedLocations.push({lat:mapPoint.latitude,lng:mapPoint.longitude});

  }

  center(location:any)
{


  // console.log(location);
this.mapView.center.latitude=location.lat;
this.mapView.center.longitude=location.lng;


}



}



