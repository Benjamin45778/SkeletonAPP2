import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';

import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
