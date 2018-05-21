import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { MyPage } from './my';
import { MoneyDetailModule } from './money-detail/money-detail.module';
import { SelfInfoModule } from './self-info/self-info.module';
import { RechargePage } from './recharge/recharge';
import { WithdrawPage } from './withdraw/withdraw';
import { RiskWarnPage } from './risk-warn/risk-warn';
import { CouponPage } from './coupon/coupon';
import { UseRulesPage } from './coupon//use-rules/use-rules';
import { PromotionPage } from './promotion/promotion';
// import { OrderPage } from '../trade/order/order';
import { MyUsersComponent } from './promotion/my-users/my-users';
import { PromoteDetailsComponent } from './promotion/promote-details/promote-details';
import { myService } from "./myService";
import { SetPage } from './set/set';
import { AboutUsPage } from './set/about-us/about-us';
import { FeedBackPage } from './set/feedBack/feedBack';
import { ChangePasswordPage } from './change-password/change-password';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CustomerServicePage } from '../home/customer-service/customer-service';
import { phoneHide } from '../../pipes/phoneHide';
import {FileService} from "../../providers/FileService";
@NgModule({
    imports: [IonicModule,MoneyDetailModule,SelfInfoModule,IonicImageViewerModule],
    declarations: [MyPage,RechargePage,WithdrawPage,RiskWarnPage,CouponPage,UseRulesPage,SetPage,phoneHide,PromotionPage,MyUsersComponent,PromoteDetailsComponent,AboutUsPage,FeedBackPage,ChangePasswordPage],
    entryComponents: [MyPage,RechargePage,WithdrawPage,RiskWarnPage,CouponPage,UseRulesPage,SetPage,PromotionPage,MyUsersComponent,PromoteDetailsComponent,CustomerServicePage,AboutUsPage,FeedBackPage,ChangePasswordPage],
    providers: [myService,FileService],
    exports: [IonicModule]
})
export class MyModule {
}
