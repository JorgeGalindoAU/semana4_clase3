import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './components/app/app';
import { appConfig } from './config/app.config';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
