import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,Content,Keyboard  } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
import { LiveService } from '../liveService';
import { IMAGE_IP } from '../../../providers/Constants';
import { GlobalData } from '../../../providers/GlobalData';
declare let screen;
declare let hivideo;
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-record-detail',
    templateUrl: 'record-detail.html',
})
export class RecordDetailPage {
    private name:string="名字名字名字名字名字名字";
    private dpr:string=sessionStorage.dpr;
    private touchState:boolean=false;
    private player:any;
    private id:number;
    private videoData:any=[];
    private messageData:any=[];
    private pageIndex:number=1;//页面初始index
    private pageSize:number=8;//每页数据量
    private showline:boolean=false;
    private imgIp:string=IMAGE_IP;
    
    @ViewChild('comment')
    commentDiv: ElementRef;
    @ViewChild('foot')
    footDiv: ElementRef;
    @ViewChild(Content)
    content: Content;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events,
        private keyboard: Keyboard,
        private nativeService: NativeService,
        private liveService: LiveService,
        private alertCtrl: AlertController,
        private globalData: GlobalData,
    ) {
        this.id=navParams.get('id');
    }
    //首次加载页面
    ionViewDidLoad() {
        this.getVideo();
        //设置滚动框高度
        this.commentDiv.nativeElement.style.height=screen.availHeight-this.commentDiv.nativeElement.offsetTop-this.footDiv.nativeElement.offsetHeight+'px';
        window.addEventListener('native.keyboardshow',(e:any) =>{
            document.getElementById('set_input').style.bottom=e.keyboardHeight+this.footDiv.nativeElement.offsetHeight+'px';
    　  });
        window.addEventListener('native.keyboardhide',(e:any) =>{
            document.getElementById('set_input').style.bottom=0+'px';
    　  });
        hivideo(document.getElementById('video2'));
    }
     //即将离开页面
	ionViewWillLeave(){
        this.nativeService.statusBarStyleDefault(false);
	}
	//每次进入页面
	ionViewWillEnter(){
		this.nativeService.statusBarStyleDefault(true);
	}
    //返回
    goBack(){
        this.navCtrl.pop();
    }
    //发送消息
    send(){
        this.keyboard.close();
    }
    //获取视频详情
    getVideo(){
        this.liveService.getVideo(this.id)
        .subscribe(res => {
			if(res.success=='true'){
				this.videoData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
    //获取留言板
    getMessage(){
        this.liveService.getMessage(this.pageIndex,this.pageSize,this.id)
        .subscribe(res => {
			if(res.success=='true'){
				this.messageData=res.data.data;
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
        this.liveService.getMessage(this.pageIndex,this.pageSize,this.id)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
                }
                //数组合并
				this.messageData=[...this.messageData,...res.data.data];
                  
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

