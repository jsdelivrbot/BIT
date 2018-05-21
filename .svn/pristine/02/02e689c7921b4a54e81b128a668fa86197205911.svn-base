import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,Events } from 'ionic-angular';
import { HomeService } from './homeService';
import { NativeService } from '../../providers/NativeService';
// import { PromotionPage } from '../my/promotion/promotion';
// import { NoviceWelfarePage } from './novice-welfare/novice-welfare';
import { NoviceSchoolPage } from './novice-school/novice-school';
// import { CustomerServicePage } from './customer-service/customer-service';
import { IMAGE_IP } from '../../providers/Constants';
// import { ProductPage } from '../trade/product/product';
import { SocketService } from '../../providers/SocketService';
import { GlobalData } from "../../providers/GlobalData";
import { LoginPage } from '../login/login';
import {WechatPlugin} from '../../providers/WechatPlugin';
import { ThumbnailComponent } from '../../component/thumbnail/thumbnail';
import { NewsNoticeComponent } from '../news/news-notice/news-notice';
import { NewsGoldComponent } from '../news/news-gold/news-gold';
import { NewsDetailPage } from '../news/news-detail/news-detail';
import { newsService } from "../news/newsService";
declare let Wechat: any;
@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	private hero:object={
		imgUrl:'assets/images/login/login_logo@3x.png',
		title:'标题标题标题标题标题标题标题标题标题标题标题',
		addTime:'2017-10-18'
	}
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	//图片ip
	private imgIp:string=IMAGE_IP;
	//内盘数据
	private innerdata:any=[];
	//外盘数据
	private outerdata:any=[];
	//在线人数
	private online:number;
	//banner数据
	private bannerdata:any=[];
	private noticeData:any=[];
	//资讯列表数据
	private newsdata1:any=[];
	private newsdata2:any=[];
	private firstNews:any=[];
	private firstOpen:boolean=true;
	// private alipayOrder: AlipayOrder;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private homeservice: HomeService,
		private app: App,
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController,
		private nativeService: NativeService,
		private newsService: newsService,
		private ws:SocketService
	) {
	}
	ionViewDidLoad() {	
		this.getBanner();
		this.getNotice();
		console.time('test')
		for(var i=0;i<100000;i++){

		}
		console.timeEnd('test')
	}
	 //即将离开页面
	ionViewWillLeave(){
		this.nativeService.statusBarStyleDefault(false);
	}
	//每次进入页面
	ionViewWillEnter(){
		this.nativeService.statusBarStyleDefault(true);
		document.title='比特币';
	}
	//进入下一页
	goNextPage(val,value){
		switch(val){
			case 'school':
				this.navCtrl.push(NoviceSchoolPage);
				break;
			case 'notice':
				this.navCtrl.push(NewsNoticeComponent);
				break;
			case 'info':
				this.navCtrl.push(NewsGoldComponent);
				break;
			case 'detail':
				this.navCtrl.push(NewsDetailPage,{
					id:value
				});
				break;
			
		}
	}
	//获取首页轮播图
	getBanner(){
		this.homeservice.getBanner()
		.subscribe(res => {
			if(res.success=='true'){
				this.bannerdata=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取首页资讯
	getNews(){
		this.homeservice.getNews()
		.subscribe(res => {
			if(res.success=='true'){
				res.data.data.forEach((value,index,arr)=>{
					if(index<3){
						this.newsdata1=value;
						if(index==0){
							this.firstNews=value;
						}
					}else{
						this.newsdata2=value;
					}
				});
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取公告
	getNotice(){
		this.newsService.getNews(1,5,4)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				this.noticeData=res.data.data;
			}else{
                this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
            }
		})		
	}
}
