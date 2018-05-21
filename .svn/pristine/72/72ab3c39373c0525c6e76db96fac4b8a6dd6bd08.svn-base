import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events } from 'ionic-angular';
import {LiveDetailPage} from './live-detail/live-detail';
import {RecordDetailPage} from './record-detail/record-detail';
import { NativeService } from '../../providers/NativeService';
import { GlobalData } from '../../providers/GlobalData';
import { LiveService } from './liveService';
import { IMAGE_IP } from '../../providers/Constants';

//declare let zymedia
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-live',
    templateUrl: 'live.html',
})
export class LivePage {
    private dpr:string=sessionStorage.dpr;
    private btn:any;
    private liveData:any=[];
    private pageIndex:number=1;//页面初始index
    private pageSize:number=8;//每页数据量
    private showline:boolean=false;
    private imgIp:string=IMAGE_IP;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private nativeService: NativeService,
        private liveService: LiveService,
        private alertCtrl: AlertController,
        private globalData: GlobalData,
    ) {
    }
    //首次加载页面
    ionViewDidLoad() {
        this.getVideoList();
    }
    //进入下页面
    goNextPage(val,value){
        switch(val){
            case 'live':
                this.navCtrl.push(LiveDetailPage,{
                    type:val,
                    id:value
                })
                break;
            case 'record':
                this.navCtrl.push(RecordDetailPage,{
                    type:val,
                    id:value
                })
                break;
        }
        
    }
    //获取视频列表
    getVideoList(){
        this.liveService.getVideoList(this.pageIndex,this.pageSize)
        .subscribe(res => {
			if(res.success=='true'){
				this.liveData=res.data.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});

    }
     //上拉加载
     doInfinite(infiniteScroll){
		this.globalData.showLoading=false;
		this.pageIndex++;
        this.liveService.getVideoList(this.pageIndex,this.pageSize)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
                }
                //数组合并
				this.liveData=[...this.liveData,...res.data.data];
                  
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
