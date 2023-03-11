import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/Base/AppModule';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
