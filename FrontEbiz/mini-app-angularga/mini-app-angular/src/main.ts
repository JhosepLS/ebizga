import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';  // <- Cambiar la ruta aquí

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));