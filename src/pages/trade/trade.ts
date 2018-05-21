import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,AlertController,Tabs,Events } from 'ionic-angular';
import { RechargePage } from "../my/recharge/recharge";
import { PositionsPage } from "./order/positions/positions";
import { SettlementPage } from "./order/settlement/settlement";
import { ProductPage } from "./product/product";
import { DelegationPage } from "./order/delegation/delegation";;
@Component({
	selector: 'page-trade',
	templateUrl: 'trade.html',
})
export class TradePage {
	@ViewChild('subTabs') tabs: Tabs;
	private tab1Root:any= ProductPage;
	private tab2Root:any = PositionsPage;
	private tab3Root:any = DelegationPage;
	private tab4Root:any = SettlementPage;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private alertCtrl: AlertController
	) {
	}
	ionViewDidLoad(){
		this.events.subscribe('goNextPage', (val)=>{
			this.navCtrl.push(val.page,{
				buyState:val.buyState,
				type:val.type,
				code:val.code,
				way:val.way,
				contract:val.contract,
				codeName:val.codeName,
				nowPrice:val.nowPrice
			})
		})
	}
	//每次进入页面
	// ionViewWillEnter(){
	// 	this.events.publish('changeStatus',{
	// 		color:'#FFFFFF',
	// 		bool:false
	// 	})
	// }
}