import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,ModalController } from 'ionic-angular';
import {TrackMinePage} from './track-mine/track-mine';
import {TrackDetailPage} from './track-detail/track-detail';
import {TrackService} from './trackService';
import {IMAGE_IP} from '../../providers/Constants';
import { GlobalData } from "../../providers/GlobalData";
import { LoginPage } from '../login/login';
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-track',
    templateUrl: 'track.html',
})
export class TrackPage {
    private dpr:string=sessionStorage.dpr;
    private data:any=[];
    private imgIp:string=IMAGE_IP;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private trackService: TrackService,
        private alertCtrl: AlertController,
        private globalData: GlobalData,
        private modalCtrl: ModalController,
    ) {
    }
    //首次加载页面
    ionViewDidLoad() {
        this.getTracks();
    }
    //获取跟单列表
    getTracks(){
        this.trackService.getTracks()
        .subscribe(res => {
            console.log('res',res)
			if(res.success=='true'){
				this.data=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
    
    //进入子页面
    goNextPage(val,value){
        if(!this.globalData.account)this.modalCtrl.create(LoginPage).present();
        switch(val){
            case 'mine':
                this.navCtrl.push(TrackMinePage);
                break;
            case 'detail':
                this.navCtrl.push(TrackDetailPage,{
                    id:value
                });
                break;
        }
    }
}
