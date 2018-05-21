import { Component,ViewChild } from '@angular/core';
import { TradePage } from '../trade/trade';
import {IonicPage,Tabs,ModalController,Events,App,NavController} from "ionic-angular";
// import { NewsPage } from '../news/news';
import { MyPage } from '../my/my';
import { TrackPage } from '../track/track';
import { LivePage } from '../live/live';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {GlobalData} from "../../providers/GlobalData";
import { modalMock } from "../../animations/fly-in";

@Component({
    selector: 'page-Tabs',
	templateUrl: 'tabs.html',
	animations:[modalMock]
})
export class TabsPage {
	@ViewChild('mainTabs') tabs: Tabs;
	private tab1Root:any= HomePage;
	private tab2Root:any = TradePage;
	private tab3Root:any = TrackPage;
	private tab4Root:any = LivePage;
	private tab5Root:any=MyPage;
	private modal_mock:boolean=false;
	private price:number=56.30;
	private marketPrice:boolean=true;
	private modal:string;
	private priceUp:number=55;
	private priceDown:number=50;
	constructor(
		private globalData: GlobalData,
		private app:App,
		private events: Events,
		private navCtrl: NavController,
		private modalCtrl: ModalController
	) {
		// events.subscribe('user:login', (val)=>{
		// 	this.tab4Root=MyPage;
		// })
		// events.subscribe('user:logout', ()=>{
		// 	this.tab4Root='';
		// 	this.tabs.select(0);
		// })
		events.subscribe('trade', ()=>{
			this.tabs.select(1);
		})
		events.subscribe('modalMock', (val)=>{
			this.modal=val.modal;
			this.modal_mock=true;
		})
		
	}
	blur(){
		this.price=this.price<=0?0:this.price;
		this.priceDown=this.priceDown<=0?0:this.priceDown;
		this.priceUp=this.priceUp<=0?0:this.priceUp;
	}
	//设置是否是市价
	setPriceState(){
		this.marketPrice=!this.marketPrice;
	}
	//设置价格
	setPrice(val){
		switch(val){
			case 'subtract':
				if(this.price==0)return;
				this.price=Number((this.price-0.01).toFixed(2));
				break;
			case 'plus':
				this.price=Number((this.price+0.01).toFixed(2));
				break;
		}
	}
	setPriceUp(val){
		switch(val){
			case 'subtract':
				if(this.priceUp==0)return;
				this.priceUp=Number((this.priceUp-0.01).toFixed(2));
				break;
			case 'plus':
				this.priceUp=Number((this.priceUp+0.01).toFixed(2));
				break;
		}
	}
	setPriceDown(val){
		switch(val){
			case 'subtract':
				if(this.priceDown==0)return;
				this.priceDown=Number((this.priceDown-0.01).toFixed(2));
				break;
			case 'plus':
				this.priceDown=Number((this.priceDown+0.01).toFixed(2));
				break;
		}
	}
	//confirm按钮
	buttonClick(val){
		this.modal_mock=false;
		if(val){
			this.events.publish('setPrice',{
				priceState:this.marketPrice,
				price:this.price,
				priceUp:this.priceUp,
				priceDown:this.priceDown,
			})
		}else{
			this.events.publish('setPrice')
		}
	}
	ionViewDidLoad() {

		
	}
	tabchange(event){
		//如果未登录则弹出登录modal
		// if(event.tabTitle=="我的"&&!this.globalData.account){
		// 	let modal=this.modalCtrl.create(LoginPage);
		// 	modal.present();
		// }
	}
}
