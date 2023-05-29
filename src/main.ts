import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponentsModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppComponentsModule)
  .catch((err) => console.error(err));
