import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { SelfInfoPage } from './self-info';
import { SiBankcardModule } from './si-bankcard/si-bankcard.module';
import { SiDrawpasswordPage } from './si-drawpassword/si-drawpassword';
import { SiIdentifyPage } from './si-identify/si-identify';
import { SiLoginpasswordPage } from './si-loginpassword/si-loginpassword';
import { SiPhonePage } from './si-phone/si-phone';
import { SiSetdpPage } from './si-setdp/si-setdp';

@NgModule({
    imports: [IonicModule,SiBankcardModule],
    declarations: [SelfInfoPage,SiDrawpasswordPage,SiIdentifyPage,SiLoginpasswordPage,SiPhonePage,SiSetdpPage],
    entryComponents: [SelfInfoPage,SiDrawpasswordPage,SiIdentifyPage,SiLoginpasswordPage,SiPhonePage,SiSetdpPage],
    providers: [],
    exports: [IonicModule]
})
export class SelfInfoModule {}
