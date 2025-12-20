import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

type SegmentType = 'tomar' | 'guardadas';

interface FotoGuardada {
  webPath: string;   // url para mostrar en web
  savedAt: string;   // fecha simple
}

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CamaraPage {
  segment: SegmentType = 'tomar';

  fotosGuardadas: FotoGuardada[] = [];
  selectedPhoto: FotoGuardada | null = null;
  modalOpen = false;

  private storageKey = 'skeletonapp_fotos_guardadas_v1';

  constructor(private toastCtrl: ToastController) {
    this.cargarFotos();
  }

  // ✅ Evita el error "SegmentValue | undefined"
  setSegment(value: any) {
    if (value === 'tomar' || value === 'guardadas') {
      this.segment = value;
    } else {
      this.segment = 'tomar';
    }
  }

  async tomarOSeleccionarFoto() {
    const platform = Capacitor.getPlatform();

    // ✅ En web (Chrome) mejor usar file picker porque el plugin puede comportarse distinto
    if (platform === 'web') {
      this.abrirFilePickerWeb();
      return;
    }

    // ✅ Android/iOS: plugin Camera
    try {
      const photo = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // cámara o galería
      });

      if (!photo?.webPath) {
        await this.toast('No se pudo obtener la foto.');
        return;
      }

      this.agregarFoto(photo.webPath);
      this.segment = 'guardadas';
      await this.toast('Foto guardada ✅');
    } catch (err) {
      console.error(err);
      await this.toast('No se pudo abrir la cámara/galería.');
    }
  }

  // ✅ Web picker (sin plugin)
  private abrirFilePickerWeb() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // input.capture = 'environment'; // si quieres forzar cámara en móviles web (a veces funciona)

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      this.agregarFoto(url);
      this.segment = 'guardadas';
      this.toast('Foto agregada ✅ (Web)');
    };

    input.click();
  }

  private agregarFoto(webPath: string) {
    const nueva: FotoGuardada = {
      webPath,
      savedAt: new Date().toLocaleString(),
    };

    this.fotosGuardadas = [nueva, ...this.fotosGuardadas];
    this.guardarFotos();
  }

  abrirModal(foto: FotoGuardada) {
    this.selectedPhoto = foto;
    this.modalOpen = true;
  }

  cerrarModal() {
    this.modalOpen = false;
    this.selectedPhoto = null;
  }

  eliminarFoto(index: number) {
    this.fotosGuardadas.splice(index, 1);
    this.fotosGuardadas = [...this.fotosGuardadas];
    this.guardarFotos();
    this.toast('Foto eliminada 🗑️');
  }

  private guardarFotos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.fotosGuardadas));
  }

  private cargarFotos() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      this.fotosGuardadas = raw ? JSON.parse(raw) : [];
    } catch {
      this.fotosGuardadas = [];
    }
  }

  private async toast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    await t.present();
  }
}
