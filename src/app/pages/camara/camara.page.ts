import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-camara',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  mode = 'capture';
  photoPreview: string | null = null;
  photos: string[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    const saved = await this.storage.get('photos');
    this.photos = saved || [];
  }

  changeMode(event: any) {
    this.mode = event.detail.value;
  }

  async takePhoto() {
    const img = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 70,
    });

    if (img.dataUrl) {
      this.photoPreview = img.dataUrl;
      this.photos.unshift(img.dataUrl);
      await this.storage.set('photos', this.photos);
    }
  }
}
