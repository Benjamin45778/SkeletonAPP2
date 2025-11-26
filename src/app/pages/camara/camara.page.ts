import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {

  photoPreview: string | null = null;

  async takePhoto() {
    const img = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 70
    });
    this.photoPreview = img.dataUrl || null;
  }
}
