import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Platform,ToastController,Events } from 'ionic-angular';
import echarts from 'echarts';
import drawconfig from '../../../providers/DrawConfig';
import { RechargePage } from "../../my/recharge/recharge";
// import { OrderPage } from "../order/order";
import { PurchasePage } from "../purchase/purchase";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeService } from "../../../providers/NativeService";
import { TradeService } from "../tradeService";
import { SocketService } from '../../../providers/SocketService';
import { Utils } from '../../../providers/Utils';
import { NoviceDetailPage } from "../../home/novice-detail/novice-detail";
import { GlobalData } from "../../../providers/GlobalData";

declare var screen:any;  
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {
	////////////////////////////////////////////todo:低端机数字是否闪动////////////////////////////////////////////////////
	private tab:string='k1';//选项卡
	private dpr:string=sessionStorage.dpr;//屏幕分辨比
	private myChart:any;//画图canvas ID
	private myChart_land:any;//画图canvas ID
	private recharge:any=RechargePage;//充值页面
	private clickCount:number=0;//用于双击的点击次数临时统计
	private rotated:boolean=false;//转屏状态
	private codeName:string;//期货名字
	private code:string;//期货代码 
	private contract:string;//期货合约
	private isMobile:boolean;//是否真机
	private data:any=[];//画图数据
	private start:number=40;//1-起始百分比 
	private end:number=100;//结束百分比
	private quote;//涨跌
	private quoteRate;//涨跌幅
	private socketdata:any=[];//socket数据
	private httpState:boolean=false;//http数据状态初始化
	private type:number;//内外盘标识
	private way:number;//保单通道
	private isTradeTime:boolean;//是否是交易时间
	private hideTab:any=[];//是否是交易时间

	constructor(
		private navCtrl: NavController,
		private platform: Platform, 
		private toastCtrl: ToastController, 
		private ws: SocketService, 
		private globalData: GlobalData, 
		private events: Events, 
		private navParams: NavParams,
		private nativeService: NativeService,
		private tradeService: TradeService,
		private screenOrientation: ScreenOrientation,
		private alertCtrl: AlertController
	) {
		this.codeName=navParams.get('codeName');
		this.type=navParams.get('type');
		this.way=navParams.get('way');
		this.code=navParams.get('code');
		this.contract=navParams.get('contract');
		this.isTradeTime=navParams.get('isTradeTime');
	}
	//首页进入页面获取数据
	ionViewDidLoad(){
		this.hideTab=document.querySelectorAll('.tabbar');//获取tabbar元素
		
		this.ws.socket='ws://www.shangjin666.cn:4649/Chat';
		this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+this.code+this.contract+'"}');
		// console.log(333333,Utils.dateFormat(new Date('2017-02-28 13:24:00'),'mm'))
		//交易socket
		this.isMobile=this.nativeService.isMobile();
		//绘图操作
		this.myChart=echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
		//初始化获取分时线数据
		this.getCandle('',0);
		this.ws.socket.onMessage(
			(msg: MessageEvent)=> {
				if(JSON.parse(msg.data).code=='01'){
					this.socketdata=JSON.parse(JSON.parse(msg.data).data);
					this.quote=Number(this.socketdata.nowPrice)-Number(this.socketdata.preClosePrice);
					this.quoteRate=this.quote/Number(this.socketdata.preClosePrice);
					this.events.publish('nowPrice',this.socketdata);//推送现价
					if(!this.httpState)return;//如果没有获取到http数据则先不绘图
					switch(this.tab){
						//分时线
						case 'k1':
							if(this.data.length==0){
								this.data.push(this.socketdata);
							}else if(Utils.dateFormat(new Date(this.socketdata.updateTime),'mm')==Utils.dateFormat(new Date(this.data[this.data.length-1].updateTime),'mm')){
								this.data[this.data.length-1].updateTime=this.socketdata.updateTime;
							}else{
								this.data.push(this.socketdata);
							}
							this.myChart.setOption(drawconfig._timeSharing(this.data));
							break;
						//分k线
						case 'k2':
							if(this.data.length==0){
								this.data.push(this.socketdata);
							}else if(Utils.dateFormat(new Date(this.socketdata.updateTime),'mm')==Utils.dateFormat(new Date(this.data[this.data.length-1].updateTime),'mm')){
								this.data[this.data.length-1].updateTime=this.socketdata.updateTime;
							}else{
								let _before=this.data.length;
								this.data.push(this.socketdata);
								let _after=this.data.length;
								if(_before==0){//如果开始数据为空
									this.start=(1-40/_after)*100;
								}else{
									this.start=(1-40/_after)*100;
								}
								this.start=(1-_before/_after)*100;
								this.end=((this.end-100)*_before+100*_after)/_after
							}
							break;
						//5分钟
						case 'k3':
							if(this.data.length==0){
								this.data.push(this.socketdata);
							}else if(Math.floor(Number(Utils.dateFormat(new Date(this.socketdata.updateTime),'mm'))/5)==Math.floor(Number(Utils.dateFormat(new Date(this.data[this.data.length-1].updateTime),'mm'))/5)){
								this.data[this.data.length-1].updateTime=this.socketdata.updateTime;
							}else{
								let _before=this.data.length;
								this.data.push(this.socketdata);
								let _after=this.data.length;
								if(_before==0){//如果开始数据为空
									this.start=(1-40/_after)*100;
								}else{
									this.start=(1-40/_after)*100;
								}
								this.start=(1-_before/_after)*100;
								this.end=((this.end-100)*_before+100*_after)/_after
							}
							break;
						//15分钟
						case 'k4':
							if(this.data.length==0){
								this.data.push(this.socketdata);
							}else if(Math.floor(Number(Utils.dateFormat(new Date(this.socketdata.updateTime),'mm'))/15)==Math.floor(Number(Utils.dateFormat(new Date(this.data[this.data.length-1].updateTime),'mm'))/15)){
								this.data[this.data.length-1].updateTime=this.socketdata.updateTime;
							}else{
								let _before=this.data.length;
								this.data.push(this.socketdata);
								let _after=this.data.length;
								if(_before==0){//如果开始数据为空
									this.start=(1-40/_after)*100;
								}else{
									this.start=(1-40/_after)*100;
								}
								this.start=(1-_before/_after)*100;
								this.end=((this.end-100)*_before+100*_after)/_after
							}
							break;
						//1小时
						case 'k5':
							if(this.data.length==0){
								this.data.push(this.socketdata);
							}else if(Utils.dateFormat(new Date(this.socketdata.updateTime),'HH')==Utils.dateFormat(new Date(this.data[this.data.length-1].updateTime),'HH')){
								this.data[this.data.length-1].updateTime=this.socketdata.updateTime;
							}else{
								let _before=this.data.length;
								this.data.push(this.socketdata);
								let _after=this.data.length;
								if(_before==0){//如果开始数据为空
									this.start=(1-40/_after)*100;
								}else{
									this.start=(1-40/_after)*100;
								}
								this.start=(1-_before/_after)*100;
								this.end=((this.end-100)*_before+100*_after)/_after
							}
							break;
					}
					if(this.tab!='k1'){
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							this.myChart.on('dataZoom', this.changePosition)
							this.myChart.setOption(drawconfig._candle(this.data,this.start,this.end));
						}
					}
				}
				
			}
		);
	}
	//页面销毁
    ionViewWillUnload(){
		this.ws.socket.send('{"Type":"Minute_Time","Sub":"0","FuturesCode":"'+this.code+this.contract+'"}');//todo:测试code
	}
	//获取历史行情数据
	getCandle(endTime,minute){
		this.tradeService.getCandle(this.code+this.contract,endTime,minute,this.way)
		.subscribe(res => {
			if(res.success=="true"){
				console.log('历史行情',res)
				this.httpState=true;//已经读取到数据
				if(res.data==null){
					this.toastCtrl.create({
						message: '暂无历史数据',
						duration: 1500,
						position: 'top'
					  }).present();
					res.data=[];  
				}else if(res.data.length==0){
					this.toastCtrl.create({
						message: '没有更多数据',
						duration: 1500,
						position: 'top'
					  }).present();
				}
				if(this.tab!='k1'){//非分时线
					let _before=this.data.length;
					this.data=[...this.data,...res.data];
					if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
						let copyData=[...this.data];//复制数组
						while(copyData.length<40)
						{
							copyData.push('')
						}
						this.myChart.on('dataZoom', this.changePosition)
						this.start=0;
						this.end=100;
						this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
					}else{
						let _after=this.data.length;
						if(_before==0){//如果开始数据为空
							this.start=(1-40/_after)*100;
						}else{
							this.start=(1-40/_after)*100;
						}
						console.log('开始结束',_before,_after)
						this.end=((this.end-100)*_before+100*_after)/_after;
						this.myChart.on('dataZoom', this.changePosition);
						this.myChart.setOption(drawconfig._candle(this.data,this.start,this.end));
					}
				}else{//分时线
					this.data=res.data;
					this.myChart.setOption(drawconfig._timeSharing(this.data));
				}
				
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
			}
		})
	}
	//活动开始结束位置改变
	changePosition(params){
		this.start=params.batch[0].start;
		this.end=params.batch[0].end;
	}
	//选项卡切换
	segmentChanged(val){
		if(this.tab==val.__value)return;
		//数据初始化
		this.data=[];
		this.start=40;
		this.end=100;
		this.httpState=false;
		switch(val._value){
			case 'k1':
				this.tab='k1';
				this.getCandle('',0);
				break;
			case 'k2':
				this.tab='k2';
				this.getCandle('',1);
				break;
			case 'k3':
				this.tab='k3';
				this.getCandle('',5);
				break;
			case 'k4':
				this.tab='k4';
				this.getCandle('',15);
				break;
			case 'k5':
				this.tab='k5';
				this.getCandle('',60);
				break;
		}
	}
	//双击转屏
	rotate(){
		if(!this.isMobile)return;
		this.clickCount++;
		setTimeout(()=>{
			this.clickCount=0;
		},500)
		if(this.clickCount>1){
			this.rotate_ctro();
		}
		
	}
	//icon控制转屏/转屏具体操作
	rotate_ctro(){
		this.platform.ready().then(() => {
			if(!this.rotated){
				this.screenOrientation.lock('landscape-primary');
				this.rotated=true;
				setTimeout(()=>{
					this.hideTab.forEach((value,index,arr) => {
						value.style.display='none';
					});
					this.myChart_land=echarts.init(<HTMLCanvasElement>document.getElementById('myChart_land'));
					if(this.tab=='k1'){
						this.myChart_land.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart_land.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart_land.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							this.myChart_land.on('dataZoom', this.changePosition)
							this.myChart_land.setOption(drawconfig._candle(this.data,this.start,this.end));
						}
					}
				},200)
				// this.myChart_k1.setOption(drawconfig._timeSharing(this.data));
			}else{
				this.screenOrientation.lock('portrait-primary');
				this.rotated=false;
				setTimeout(()=>{
					this.hideTab.forEach((value,index,arr) => {
						value.style.display='flex';
					});
					if(this.tab=='k1'){
						this.myChart.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							this.myChart.on('dataZoom', this.changePosition)
							this.myChart.setOption(drawconfig._candle(this.data,this.start,this.end));
						}
					}
				},200)
			}
			
		})
	}
	//离开页面前调整为竖屏
	ionViewCanLeave(){
		if(this.rotated){
			this.platform.ready().then(() => {
				this.screenOrientation.lock('portrait-primary');
				this.rotated=false;
				setTimeout(()=>{
					this.hideTab.forEach((value,index,arr) => {
						value.style.display='flex';
					});
					if(this.tab=='k1'){
						this.myChart.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							this.myChart.on('dataZoom', this.changePosition)
							this.myChart.setOption(drawconfig._candle(this.data,this.start,this.end));
						}
					}	
				},200)
			})
			return false;
		}else{
			return true;
		}
	}
	//滑动
	swipeEvent(){
		if(this.start==0){
			this.globalData.showLoading=false;
			switch(this.tab){
				case 'k2':
					this.getCandle(this.data[0].tradeDate,1);
					break;
				case 'k3':
					this.getCandle(this.data[0].tradeDate,5);
					break;
				case 'k4':
					this.getCandle(this.data[0].tradeDate,15);
					break;
				case 'k5':
					this.getCandle(this.data[0].tradeDate,60);
					break;
			}
		}
	}
	//进入下一页
	goNextPage(val){
		switch(val){
			case '持仓':
				// this.navCtrl.push(OrderPage);
				break;
			case '买涨':
				this.events.publish('goNextPage',{
					page:PurchasePage,
					buyState:'buyup',
					type:this.type,
					code:this.code,
					way:this.way,
					contract:this.contract,
					codeName:this.codeName,
					nowPrice:this.socketdata.nowPrice

				})
				// this.navCtrl.push(PurchasePage,{
				// 	buyState:'buyup',
				// 	type:this.type,
				// 	code:this.code,
				// 	way:this.way,
				// 	contract:this.contract,
				// 	codeName:this.codeName,
				// 	nowPrice:this.socketdata.nowPrice
				// });
				break;
			case '买跌':
				this.events.publish('goNextPage',{
					page:PurchasePage,
					buyState:'buydown',
					type:this.type,
					code:this.code,
					way:this.way,
					contract:this.contract,
					codeName:this.codeName,
					nowPrice:this.socketdata.nowPrice
				})
				// this.navCtrl.push(PurchasePage,{
				// 	buyState:'buydown',
				// 	type:this.type,
				// 	code:this.code,
				// 	way:this.way,
				// 	contract:this.contract,
				// 	codeName:this.codeName,
				// 	nowPrice:this.socketdata.nowPrice
				// });
				break;
			case '攻略':
				this.navCtrl.push(NoviceDetailPage,{
					title:'攻略'
				})
				break;
		}
	}
}