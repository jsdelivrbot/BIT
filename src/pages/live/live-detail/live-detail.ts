import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,Content,Keyboard  } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
declare let screen;
declare let hivideo;
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-live-detail',
    templateUrl: 'live-detail.html',
})
export class LiveDetailPage {
    private name:string="名字名字名字名字名字名字";
    private touchState:boolean=false;
    private dpr:string=sessionStorage.dpr;
    @ViewChild('comment')
    commentDiv: ElementRef;
    @ViewChild('foot')
    footDiv: ElementRef;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events,
        private keyboard: Keyboard,
        private nativeService: NativeService,
    ) {
        // console.log(navParams.get('type'))
    }
    //首次加载页面
    ionViewDidLoad() {
        //设置滚动框高度
        this.commentDiv.nativeElement.style.height=screen.availHeight-this.commentDiv.nativeElement.offsetTop-this.footDiv.nativeElement.offsetHeight+'px';
        setTimeout(()=>{
            this.commentDiv.nativeElement.scrollTo(0,this.commentDiv.nativeElement.scrollHeight,0)
        },3000)
        window.addEventListener('native.keyboardshow',(e:any) =>{
            document.getElementById('set_input').style.bottom=e.keyboardHeight+this.footDiv.nativeElement.offsetHeight+'px';
    　  });
        window.addEventListener('native.keyboardhide',(e:any) =>{
            document.getElementById('set_input').style.bottom=0+'px';
    　  });
        hivideo(document.getElementById('video1'));
    }
     //即将离开页面
	ionViewWillLeave(){
		this.nativeService.statusBarStyleDefault(false);
	}
	//每次进入页面
	ionViewWillEnter(){
		this.nativeService.statusBarStyleDefault(true);
	}
    touchS(){
        this.touchState=true;
    }
    touchE(){
        setTimeout(()=>{
            this.touchState=false;
        },3000)
    }
    //发送消息
    send(){
        this.keyboard.close();
    }
    //返回
    goBack(){
        this.navCtrl.pop();
    }
}
