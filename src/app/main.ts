import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
sessionStorage.dpr=window.devicePixelRatio<=2?2:3;//获取屏幕分辨比
platformBrowserDynamic().bootstrapModule(AppModule);
