import { App } from 'ionic-angular';  
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ModalController,AlertController,ActionSheetController} from 'ionic-angular';
import { MoneyDetailPage } from './money-detail/money-detail';
import { SiIdentifyPage } from './self-info/si-identify/si-identify';
import { SiPhonePage } from './self-info/si-phone/si-phone';
import { RechargePage } from './recharge/recharge';
import { WithdrawPage } from './withdraw/withdraw';
import { SiBankcardPage } from './self-info/si-bankcard/si-bankcard';
// import { OrderPage } from '../trade/order/order';
import{ MdSpreadrewardComponent } from "./money-detail/md-spreadreward/md-spreadreward"
import { SetPage } from './set/set';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { myService } from "./myService";
import { GlobalData } from "../../providers/GlobalData";
import { ChangePasswordPage } from './change-password/change-password';
import {FileService} from "../../providers/FileService";
import {FileObj} from "../../model/FileObj";
import {UserInfo} from "../../model/UserInfo";
import {NativeService} from '../../providers/NativeService';
declare var AlloyCrop;
/**
 * Generated class for the MyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-my',
	templateUrl: 'my.html',
})
export class MyPage {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private nightState:boolean=false;
	private isChange: boolean = false;//头像是否改变标识
	private avatarPath: string;
	private testRadioOpen = false;//radio选择拍照或图库
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private storage: Storage,
		private myservice: myService,
		private globalData: GlobalData,
		private fileService: FileService,
		private nativeService: NativeService,
		private actionSheetCtrl: ActionSheetController,
		private events: Events,
		private app: App,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController) {
			
		//订阅登录事件
		events.subscribe('user:login', (val)=>{
			if(val){
				//获取账户信息
				this.myservice.getUserInfo(val.userId)
					.subscribe(res => {
						if(res.success=="true"){
							this.globalData.userId=res.data.id;
							this.globalData.nickname =res.data.nickname ;
							this.globalData.funds =res.data.funds ;
							this.globalData.portrait =res.data.portrait;
							this.globalData.authState =res.data.authState ;
							this.globalData.account =res.data.telphone ;
							this.globalData.isMentionPassword =res.data.isMentionPassword ;
							this.globalData.isBankCard  =res.data.isBankCard ;
							this.globalData.childAccountNo=res.data.childAccountNo;
						}
					})
			}
		});	
		// this.navCtrl.push(SelfInfoPage);
		// setTimeout(()=>{
		// 	modal.dismiss();
		// },3000)
	}
	//设置夜间模式
	// setDayState(){
	// 	if(!this.nightState){//夜间模式转换为白天模式
	// 		let tempHref:any=document.getElementById('theme');
	// 		tempHref.href = "assets/skin/theme-sun.css"; 
	// 		this.events.publish('changeStatus','#DF3F43');//更改statusbar
	// 	}else{
	// 		let tempHref:any=document.getElementById('theme');
	// 		tempHref.href = "assets/skin/theme-dark.css"; 
	// 		this.events.publish('changeStatus','#1F2029');//更改statusbar
	// 	}
	// }
	//进入下一页
	goNextPage(val){
		if(!this.globalData.account&&val!='set'){
			this.modalCtrl.create(LoginPage).present();
			return;
		}
		switch(val){
			case 'bill':
				this.navCtrl.push(MoneyDetailPage);  
				break;
			case 'moneyDetail':
				this.navCtrl.push(MdSpreadrewardComponent);  
				break;
			case 'recharge':
				this.navCtrl.push(RechargePage);  
				break;
			case 'withdraw':
				this.navCtrl.push(WithdrawPage);  
				break;
			case 'identify':
				if(this.globalData.authState)return;
				this.navCtrl.push(SiIdentifyPage);  
				break;
			case 'phoneBind':
				this.navCtrl.push(SiPhonePage);  
				break;
			case 'bankCard':
				this.navCtrl.push(SiBankcardPage);  
				break;
			case 'password':
				this.navCtrl.push(ChangePasswordPage);  
				break;
			case 'set':
				this.navCtrl.push(SetPage);  
				break;
		}
		
	}
	ionViewDidLoad() {
		//发布登录事件
		this.globalData.account&&this.events.publish('user:login',this.globalData);
	}
	getPicture(type) {//1拍照,0从图库选择
		let options = {
		  targetWidth: 400,
		  targetHeight: 400,
		  quality: 100
		};
		if (type == 1) {
		  this.nativeService.getPictureByCamera(options).subscribe(imageBase64 => {
			this.getPictureSuccess(imageBase64);
		  });
		} else {
		  this.nativeService.getPictureByPhotoLibrary(options).subscribe(imageBase64 => {
			this.getPictureSuccess(imageBase64);
		  });
		}
	}
	
	getPictureSuccess(imageBase64) {
		new AlloyCrop({//api:https://github.com/AlloyTeam/AlloyCrop
		  image_src: imageBase64,
		  circle: true, // optional parameters , the default value is false
		  width: 256, // crop width
		  height: 256, // crop height
		  output: 1,
		  ok: (base64) => {
			this.isChange = true;
			this.globalData.avatarPath = base64;
		  },
		  cancel: () => {
		  },
		  ok_text: "确定", // optional parameters , the default value is ok
		  cancel_text: "取消" // optional parameters , the default value is cancel
		});
	
	}
	
	// saveAvatar() {
	// 	if (this.isChange) {
	// 	  let fileObj = <FileObj>{'base64': this.globalData.avatarPath};
	// 	  this.fileService.uploadByBase64(fileObj).subscribe(fileObj => {// 上传头像图片到文件服务器
	// 		let avatarId = fileObj.id, avatarPath = fileObj.origPath;
	// 		this.myservice.updateUserAvatarId(avatarId).subscribe(res => {//保存avatar字段到用户表
	// 		  this.globalData.avatarId = avatarId;
	// 		  this.globalData.avatarPath = avatarPath;
	// 		});
	// 	  });
	// 	} else {
	// 	  this.dismiss();
	// 	}
	//   }
	//登录
	login(){
		!this.globalData.account&&this.modalCtrl.create(LoginPage).present();
	}
	chooseType() {
	//登录状态则更改头像  未登录状态则登录
		if(this.globalData.account){
			if(!this.nativeService.isMobile())return//不是真机直接返回
			let actionSheet = this.actionSheetCtrl.create({
				title: '选择图片源',
				buttons: [
					{
						text: '相机',
						handler: () => {
							this.getPicture(1)
						}
					},
					{
						text: '图库',
						handler: () => {
							this.getPicture(0)
						}
					},
					{
						text: '取消',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					}
				]
			}).present();
		}else{
			this.modalCtrl.create(LoginPage).present();
		}
		
	}
}
