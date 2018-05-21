import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { TradePage } from './trade';
import { TradeService } from './tradeService';
import { ProductPage } from './product/product';
import { PurchasePage } from './purchase/purchase';
import { CouponModalComponent } from './purchase/coupon-modal/coupon-modal';
import { RechargePage } from "../my/recharge/recharge";
import { PositionsPage } from "./order/positions/positions";
import { DelegationPage } from "./order/delegation/delegation";
import { SettlementPage } from "./order/settlement/settlement";
import { CouponPage } from "../my/coupon/coupon";
import { NoviceDetailPage } from "../home/novice-detail/novice-detail";

@NgModule({
    imports: [IonicModule],
    declarations: [TradePage,ProductPage,PurchasePage,PositionsPage,SettlementPage,CouponModalComponent,DelegationPage],
    entryComponents: [TradePage,ProductPage,RechargePage,PurchasePage,PositionsPage,SettlementPage,CouponPage,DelegationPage,CouponModalComponent,NoviceDetailPage],
    providers: [TradeService],
    exports: [IonicModule]
})
export class TradeModule {}
