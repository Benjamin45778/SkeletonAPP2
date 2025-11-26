import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MapaPage implements OnInit, OnDestroy {

  lat: number = 0;
  lng: number = 0;
  accuracy: number = 0;

  private map: GoogleMap | null = null;
  private watchId: string | null = null;

  
  private readonly apiKey = 'TU_API_KEY_AQUI';

  async ngOnInit() {
    await this.loadMap();
    await this.startWatchPosition();
  }

  ngOnDestroy() {
    this.stopWatchPosition();
    if (this.map) {
      this.map.destroy();
      this.map = null;
    }
  }

  private async loadMap() {
    // posición inicial (para que no parta en 0,0)
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    this.accuracy = pos.coords.accuracy;

    const mapRef = document.getElementById('map');
    if (!mapRef) return;

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: mapRef,
      apiKey: this.apiKey,
      config: {
        center: { lat: this.lat, lng: this.lng },
        zoom: 15
      }
    });

    await this.map.addMarker({
      coordinate: { lat: this.lat, lng: this.lng },
      title: 'Estoy aquí'
    });
  }

  private async startWatchPosition() {
    this.watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000 },
      async (pos, err) => {
        if (err || !pos) return;

        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.accuracy = pos.coords.accuracy;

        if (this.map) {
          await this.map.setCamera({
            coordinate: { lat: this.lat, lng: this.lng },
            zoom: 15
          });
        }
      }
    );
  }

  private async stopWatchPosition() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
  }
}
