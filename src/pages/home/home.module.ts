import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { HomePage } from './home';
import { HomeService } from './homeService';
import { PromotionPage } from '../my/promotion/promotion';
import { NoviceWelfarePage } from './novice-welfare/novice-welfare';
import { NoviceSchoolPage } from './novice-school/novice-school';
import { NoviceDetailPage } from './novice-detail/novice-detail';
import { CustomerServicePage } from './customer-service/customer-service';
import { ProductPage } from '../trade/product/product';
import { SocketService } from '../../providers/SocketService';
import { ThumbnailModule } from '../../component/thumbnail/thumbnail.moudle';
import { NewsNoticeComponent } from '../news/news-notice/news-notice';
import { NewsGoldComponent } from '../news/news-gold/news-gold';
import { NewsDetailPage } from '../news/news-detail/news-detail';
@NgModule({
	imports: [IonicModule,ThumbnailModule],
	declarations: [HomePage,NoviceWelfarePage,NoviceSchoolPage,NoviceDetailPage,CustomerServicePage],
	entryComponents: [HomePage,PromotionPage,NoviceWelfarePage,NoviceSchoolPage,NoviceDetailPage,CustomerServicePage,ProductPage,NewsNoticeComponent,NewsGoldComponent,NewsDetailPage],
	providers: [HomeService,SocketService],
	exports: [IonicModule]
})
export class HomeModule {
}

