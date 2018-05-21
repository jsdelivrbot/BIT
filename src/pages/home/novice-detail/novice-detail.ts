import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HomeService } from '../homeService';
@Component({
	selector: 'page-novice-detail',
	templateUrl: 'novice-detail.html',
})
export class NoviceDetailPage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private title:string;
	private id:number;
	private data:any=[];
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private homeService: HomeService,
	) {
		this.id=this.navParams.get('id');
		this.title=this.navParams.get('title');
	}
	//todo:将静态页面与动态获取划分好
	ionViewDidLoad() {
		this.homeService.getText(this.id)
		.subscribe(res => {
			if(res.success=='true'){
				this.data=res.data
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
